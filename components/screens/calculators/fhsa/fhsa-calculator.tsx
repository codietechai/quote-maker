"use client";

import React, { useMemo, useState } from "react";
import { PageHeader } from "../page-header";
import { Calculator } from "lucide-react";

import FormulaSelector from "../calculator-layouts/formula-selector";
import InputCard from "../input/input-card";
import AgeSlider from "../input/age-slider";
import NumberInput from "../input/number-input";
import FrequencySelector from "../input/frequency-selector";
import { fvAnnualFHSA, fvMonthlyFHSA } from "@/lib/calculators-formulas";
import OutputCard from "../calculator-layouts/output-card";
import FHSALineChart from "./output/fhsa-line-chart";
import BreakdownList from "../calculator-layouts/breakdown-list";

export default function FHSACalculator() {
  const [mode, setMode] = useState<"annual" | "monthly">("monthly");

  const [currentAge, setCurrentAge] = useState(25);
  const [targetAge, setTargetAge] = useState(35);

  const [annualRate, setAnnualRate] = useState(0.05);

  const [currentBalance, setCurrentBalance] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualContribution, setAnnualContribution] = useState(8000);

  const [frequency, setFrequency] = useState<
    "annually" | "monthly" | "weekly" | "biweekly"
  >("monthly");

  const years = Math.max(0, targetAge - currentAge);
  const months = years * 12;

  // --- Projection ---
  const projected = useMemo(() => {
    return mode === "annual"
      ? fvAnnualFHSA({
          annualContribution,
          rate: annualRate,
          years,
        })
      : fvMonthlyFHSA({
          currentBalance,
          monthlyContribution,
          annualRate,
          months,
        });
  }, [
    mode,
    years,
    months,
    annualRate,
    annualContribution,
    monthlyContribution,
    currentBalance,
  ]);

  const totalContributed = useMemo(() => {
    if (mode === "annual") return annualContribution * years;
    return currentBalance + monthlyContribution * months;
  }, [
    mode,
    years,
    months,
    annualContribution,
    monthlyContribution,
    currentBalance,
  ]);

  const growth = Math.max(0, projected - totalContributed);

  return (
    <div className="bg-gray-100">
      <div className="py-10 px-6 max-w-6xl mx-auto">
        <PageHeader
          Icon={Calculator}
          heading="FHSA Calculator"
          description="Estimate how much tax-free savings you can build for your first home using an FHSA."
        />

        <div className="flex justify-center mt-6">
          <FormulaSelector value={mode} onChange={setMode} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-4">
            <InputCard title="Personal Information">
              <AgeSlider
                label="Current Age"
                value={currentAge}
                onChange={setCurrentAge}
                min={18}
                max={80}
              />
              <AgeSlider
                label="Target Home Purchase Age"
                value={targetAge}
                onChange={setTargetAge}
                min={currentAge}
                max={80}
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

            <InputCard title="Contribution Details">
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
                label="Current FHSA Balance"
                value={currentBalance}
                onChange={setCurrentBalance}
              />
            </InputCard>
          </div>

          {/* Output */}
          <div className="lg:col-span-1 space-y-4">
            <OutputCard title="Projected FHSA Value">
              <FHSALineChart
                currentBalance={currentBalance}
                monthlyContribution={monthlyContribution}
                annualRate={annualRate}
                months={months}
              />

              <BreakdownList
                items={[
                  {
                    label: "Your Contributions",
                    value: `$${totalContributed.toLocaleString()}`,
                  },
                  {
                    label: "Investment Growth",
                    value: `$${growth.toLocaleString()}`,
                  },
                  {
                    label: "Total FHSA Value",
                    value: `$${projected.toLocaleString()}`,
                  },
                ]}
              />
            </OutputCard>

            <div className="rounded-2xl p-4 bg-blue-50 text-sm">
              <strong>Note:</strong> FHSA growth is tax-free if used for your
              first home.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
