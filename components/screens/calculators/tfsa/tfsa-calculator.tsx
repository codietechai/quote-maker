"use client";

import React, { useMemo, useState } from "react";
import { PageHeader } from "../page-header";
import { Calculator } from "lucide-react";

import FormulaSelector from "../calculator-layouts/formula-selector";
import InputCard from "../input/input-card";
import AgeSlider from "../input/age-slider";
import NumberInput from "../input/number-input";
import FrequencySelector from "../input/frequency-selector";
import { fvAnnualTFSA, fvMonthlyTFSA } from "@/lib/calculators-formulas";
import OutputCard from "../calculator-layouts/output-card";
import TFSAChart from "./output/tfsa-chart";
import BreakdownList from "../calculator-layouts/breakdown-list";

export default function TFSACalculator() {
  const [mode, setMode] = useState<"annual" | "monthly">("monthly");

  const [currentAge, setCurrentAge] = useState(30);
  const [targetAge, setTargetAge] = useState(60);

  const [annualRate, setAnnualRate] = useState(0.05);

  const [currentBalance, setCurrentBalance] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(400);
  const [annualContribution, setAnnualContribution] = useState(6000);

  const [frequency, setFrequency] = useState<
    "annually" | "monthly" | "weekly" | "biweekly"
  >("monthly");

  const years = Math.max(0, targetAge - currentAge);
  const months = years * 12;

  const projected = useMemo(() => {
    if (mode === "annual") {
      return fvAnnualTFSA({
        annualContribution,
        rate: annualRate,
        years,
      });
    }

    return fvMonthlyTFSA({
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
          heading="TFSA Savings Calculator"
          description="Project your TFSA tax-free savings growth based on contributions and investment returns."
        />

        <div className="flex items-center justify-center mt-6">
          <FormulaSelector value={mode} onChange={setMode} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Side Inputs */}
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
                label="Target Age"
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
                label="Current TFSA Balance"
                value={currentBalance}
                onChange={setCurrentBalance}
              />
            </InputCard>
          </div>

          {/* Right Output */}
          <div className="lg:col-span-1 space-y-4">
            <OutputCard title="Projected TFSA Value">
              <TFSAChart
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
                    label: "Total TFSA Value",
                    value: `$${projected.toLocaleString()}`,
                  },
                ]}
              />
            </OutputCard>

            <div className="rounded-2xl p-4 bg-green-50 text-sm">
              <strong>Note:</strong> TFSA growth is completely tax-free. This
              calculator shows projected value and does not calculate
              contribution room.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
