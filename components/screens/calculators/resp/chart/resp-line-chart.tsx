"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RESPLineChart({
  projectedSeries,
  contributionsSeries,
  cesgSeries,
  pointCountLabel = "Months",
}: {
  projectedSeries: number[];
  contributionsSeries: number[];
  cesgSeries: number[];
  pointCountLabel?: string;
}) {
  const months = projectedSeries.length - 1;

  const series = useMemo(
    () => [
      { name: "Projected Value", data: projectedSeries },
      { name: "Your Contributions", data: contributionsSeries },
      { name: "Gov Grants (CESG)", data: cesgSeries },
    ],
    [projectedSeries, contributionsSeries, cesgSeries]
  );

  const options: ApexOptions = {
    chart: { type: "line", height: 320, toolbar: { show: false } },
    stroke: { width: 3 },
    xaxis: {
      labels: { show: false },
      categories: Array.from({ length: months + 1 }, (_, i) => i),
      title: { text: pointCountLabel },
    },
    yaxis: {
      labels: {
        show: false,
        formatter: (val: number) => `$${Math.round(val).toLocaleString()}`,
      },
    },
    tooltip: {
      x: {
        formatter: (value: number) => `${value} ${pointCountLabel}`,
      },
      y: {
        formatter: (val: number) => `$${Math.round(val).toLocaleString()}`,
      },
    },
    legend: { position: "top" },
  };

  return <Chart options={options} series={series} type="line" height={320} />;
}
