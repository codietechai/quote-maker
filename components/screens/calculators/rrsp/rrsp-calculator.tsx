"use client";

import { fvAnnualRRSP, fvMonthlyRRSP } from "@/lib/calculators-formulas";
import React, { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { PageHeader } from "../page-header";
import FormulaSelector from "../calculator-layouts/formula-selector";
import InputCard from "../input/input-card";
import AgeSlider from "../input/age-slider";
import NumberInput from "../input/number-input";
import FrequencySelector from "../input/frequency-selector";
import OutputCard from "../calculator-layouts/output-card";
import RRSPChart from "./output/rrsp-chart";
import BreakdownList from "../calculator-layouts/breakdown-list";

export default function RRSPCalculator() {
  const [mode, setMode] = useState<"annual" | "monthly">("monthly");
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [annualReturn, setAnnualReturn] = useState(0.05);

  const [annualContribution, setAnnualContribution] = useState(2400);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [currentBalance, setCurrentBalance] = useState(10000);

  const [frequency, setFrequency] = useState<
    "annually" | "monthly" | "weekly" | "biweekly"
  >("monthly");

  const years = Math.max(0, retirementAge - currentAge);
  const months = years * 12;

  const projected = useMemo(() => {
    if (mode === "annual") {
      return fvAnnualRRSP({
        currentBalance,
        annualContribution,
        rate: annualReturn,
        years,
      });
    }

    return fvMonthlyRRSP({
      currentBalance,
      monthlyContribution,
      annualRate: annualReturn,
      months,
    });
  }, [
    mode,
    annualContribution,
    monthlyContribution,
    currentBalance,
    annualReturn,
    years,
    months,
  ]);

  const totalContributed = useMemo(() => {
    if (mode === "annual") {
      return annualContribution * years + currentBalance;
    }
    return monthlyContribution * months + currentBalance;
  }, [
    mode,
    annualContribution,
    monthlyContribution,
    currentBalance,
    years,
    months,
  ]);

  const growth = Math.max(0, projected - totalContributed);

  return (
    <div className="bg-background">
      <div className="py-10 px-6 max-w-6xl mx-auto">
        <PageHeader
          Icon={Calculator}
          description="Calculate your retirement savings potential with personalized projections and scenario analysis."
          heading="Enhanced RRSP Calculator"
        />

        <div className="flex items-center justify-center mt-6">
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
                label="Retirement Age"
                value={retirementAge}
                onChange={setRetirementAge}
                min={currentAge}
                max={80}
              />
            </InputCard>

            <InputCard title="Investment Parameters">
              <label className="text-sm font-medium">
                Annual Return Rate (R)
              </label>
              <input
                type="range"
                min={0}
                max={0.15}
                step={0.005}
                value={annualReturn}
                onChange={(e) => setAnnualReturn(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div className="text-sm text-right">
                {Math.round(annualReturn * 100)}%
              </div>
            </InputCard>

            <InputCard title="Contribution Details">
              {mode === "annual" ? (
                <NumberInput
                  label="Annual Contribution Amount"
                  value={annualContribution}
                  onChange={setAnnualContribution}
                />
              ) : (
                <NumberInput
                  label="Monthly Contribution Amount"
                  value={monthlyContribution}
                  onChange={setMonthlyContribution}
                />
              )}

              {/* <FrequencySelector value={frequency} onChange={setFrequency} /> */}

              <NumberInput
                label="Current RRSP Balance"
                value={currentBalance}
                onChange={setCurrentBalance}
              />
            </InputCard>
          </div>

          <OutputCard title="Retirement Savings">
            <RRSPChart value={projected || 0} />

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
                  label: "Total",
                  value: `$${projected.toLocaleString()}`,
                },
              ]}
            />
          </OutputCard>
        </div>
      </div>
    </div>
  );
}
