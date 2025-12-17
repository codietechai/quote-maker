"use client";
import {
  fvAnnualRESP,
  fvMonthlyRESP,
} from "@/lib/calculators-formulas/resp-formulas";
import { useMemo, useState } from "react";
import { PageHeader } from "../../../page-header";
import { Calculator } from "lucide-react";
import FormulaSelector from "../../../calculator-layouts/formula-selector";
import InputCard from "../../../input/input-card";
import AgeSlider from "../../../input/age-slider";
import NumberInput from "../../../input/number-input";
import FrequencySelector from "../../../input/frequency-selector";
import RESPLineChart from "../resp-line-chart";
import OutputCard from "../../../calculator-layouts/output-card";
import BreakdownList from "../../../calculator-layouts/breakdown-list";

export default function RESPCalculator() {
  const [mode, setMode] = useState<"annual" | "monthly">("monthly");
  const [currentAge, setCurrentAge] = useState(0);
  const [targetAge, setTargetAge] = useState(18);
  const [annualRate, setAnnualRate] = useState(0.05);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [annualContribution, setAnnualContribution] = useState(2400);

  const [frequency, setFrequency] = useState<
    "annually" | "monthly" | "weekly" | "biweekly"
  >("monthly");

  const years = Math.max(0, targetAge - currentAge);
  const months = years * 12;

  const projection = useMemo(() => {
    if (mode === "annual") {
      const res = fvAnnualRESP({
        currentBalance,
        annualContribution,
        annualRate,
        years,
      });

      return {
        projected: res.projected,
        projectedSeries: res.projectedSeries,
        contributionsSeries: res.contributionsSeries,
        cesgSeries: res.cesgSeries,
        totalContributed: res.totalContributed,
        totalCesg: res.totalCesg,
        pointLabel: "Years",
      };
    } else {
      const res = fvMonthlyRESP({
        currentBalance,
        monthlyContribution,
        annualRate,
        months,
      });

      return {
        projected: res.projected,
        projectedSeries: res.projectedSeries,
        contributionsSeries: res.contributionsSeries,
        cesgSeries: res.cesgSeries,
        totalContributed: res.totalContributed,
        totalCesg: res.totalCesg,
        pointLabel: "Months",
      };
    }
  }, [
    mode,
    currentBalance,
    monthlyContribution,
    annualContribution,
    annualRate,
    years,
    months,
  ]);

  return (
    <div className="bg-gray-100">
      <div className="py-10 px-6 max-w-6xl mx-auto">
        <PageHeader
          Icon={Calculator}
          heading="RESP Calculator"
          description="Estimate how much education savings (including CESG grants) you can accumulate."
        />

        <div className="flex items-center justify-center mt-6">
          <FormulaSelector value={mode} onChange={setMode} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-4">
            <InputCard title="Timeline">
              <AgeSlider
                label="Child's Current Age"
                value={currentAge}
                onChange={setCurrentAge}
                min={0}
                max={17}
              />
              <AgeSlider
                label="Target Education Age"
                value={targetAge}
                onChange={setTargetAge}
                min={currentAge}
                max={40}
              />
            </InputCard>

            <InputCard title="Investment Parameters">
              <label className="text-sm font-medium">Annual Return Rate</label>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="range"
                  min={0}
                  max={0.15}
                  step={0.005}
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="w-20 text-right text-sm">
                  {Math.round(annualRate * 100)}%
                </div>
              </div>
            </InputCard>

            <InputCard title="Contributions">
              {mode === "annual" ? (
                <NumberInput
                  label="Annual Contribution"
                  value={annualContribution}
                  onChange={setAnnualContribution}
                />
              ) : (
                <NumberInput
                  label="Monthly Contribution"
                  value={monthlyContribution}
                  onChange={setMonthlyContribution}
                />
              )}

              <FrequencySelector value={frequency} onChange={setFrequency} />

              <NumberInput
                label="Current RESP Balance"
                value={currentBalance}
                onChange={setCurrentBalance}
              />
            </InputCard>
          </div>

          {/* Right column - outputs */}
          <div className="lg:col-span-1 space-y-4">
            <OutputCard title="Projected RESP Value">
              <RESPLineChart
                projectedSeries={projection.projectedSeries}
                contributionsSeries={projection.contributionsSeries}
                cesgSeries={projection.cesgSeries}
                pointCountLabel={projection.pointLabel}
              />

              <BreakdownList
                items={[
                  {
                    label: "Your Contributions",
                    value: `$${Number(
                      projection.totalContributed || 0
                    ).toLocaleString()}`,
                  },
                  {
                    label: "Total CESG Received",
                    value: `$${Number(
                      projection.totalCesg || 0
                    ).toLocaleString()}`,
                  },
                  {
                    label: "Projected Value",
                    value: `$${Number(
                      projection.projected || 0
                    ).toLocaleString()}`,
                  },
                ]}
              />
            </OutputCard>

            <div className="rounded-2xl p-4 bg-blue-50 text-sm">
              <strong>Notes:</strong>
              <ul className="list-disc ml-5">
                <li>
                  CESG = 20% of annual contributions up to $500/year, lifetime
                  cap $7,200.
                </li>
                <li>Extra CESG for low-income households is not modelled.</li>
                <li>
                  Projections are estimates and do not guarantee future
                  performance.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl p-4 bg-white border text-sm">
              Screenshot reference:{" "}
              <code>/mnt/data/018e5e7d-f1e4-4135-aba8-be35704d57ef.png</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
