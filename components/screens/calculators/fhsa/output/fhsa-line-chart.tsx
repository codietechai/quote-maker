"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function FHSALineChart({
  currentBalance,
  monthlyContribution,
  annualRate,
  months,
}: {
  currentBalance: number;
  monthlyContribution: number;
  annualRate: number;
  months: number;
}) {
  const data = useMemo(() => {
    const values: number[] = [];
    const contributions: number[] = [];
    const r = annualRate / 12;

    let balance = currentBalance;

    for (let i = 0; i <= months; i++) {
      if (i > 0) {
        balance = balance * (1 + r) + monthlyContribution;
      }
      values.push(balance);
      contributions.push(currentBalance + monthlyContribution * i);
    }

    return { values, contributions };
  }, [currentBalance, monthlyContribution, annualRate, months]);

  const options = {
    chart: { type: "line", height: 300, toolbar: { show: false } },
    stroke: { width: 3 },
    xaxis: {
      labels: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
    tooltip: {
      x: { formatter: (v: number) => `${v} Months` },
      y: {
        formatter: (v: number) => `$${Math.round(v).toLocaleString()}`,
      },
    },
    legend: { position: "top" },
  } as any;

  const series = [
    { name: "Projected Value", data: data.values },
    { name: "Total Contributions", data: data.contributions },
  ];

  return <Chart options={options} series={series} type="line" height={300} />;
}
