"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TFSAChart({
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
    const points: number[] = [];
    const contributions: number[] = [];

    let balance = currentBalance;
    const r = annualRate / 12;

    for (let i = 0; i <= months; i++) {
      if (i > 0) {
        balance = balance * (1 + r) + monthlyContribution;
      }

      points.push(balance);
      contributions.push(currentBalance + monthlyContribution * i);
    }

    return { points, contributions };
  }, [currentBalance, monthlyContribution, annualRate, months]);

  const options = {
    chart: {
      type: "line",
      height: 300,
      toolbar: { show: false },
    },
    stroke: { width: 3 },
    xaxis: {
      labels: { show: false },
      categories: Array.from({ length: months + 1 }, (_, i) => i),
    },
    yaxis: {
      show: false,
      labels: {
        formatter: (val: number) => `$${Math.round(val).toLocaleString()}`,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${Math.round(val).toLocaleString()}`,
      },
      x: {
        formatter: (value: number) => `${value} Months`,
      },
    },
    legend: { position: "top" },
  } as any;

  const series = [
    {
      name: "Projected Value",
      data: data.points,
    },
    {
      name: "Total Contributions",
      data: data.contributions,
    },
  ];

  return <Chart options={options} series={series} type="line" height={300} />;
}
