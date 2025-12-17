"use client";
import React from "react";
import dynamic from "next/dynamic";

// ApexCharts is client-only. Use dynamic import.
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RRSPChart({ value = 0 }: { value: number }) {
  const maxGoal = 500000;
  const percent = Math.min((value / maxGoal) * 100, 100);
  const options = {
    chart: { type: "radialBar" },
    plotOptions: {
      radialBar: {
        hollow: { size: "70%" },
        dataLabels: {
          value: {
            formatter: () => `$${value.toLocaleString()}`,
          },
        },
      },
    },
    labels: ["Projected Value"],
  } as any;

  const series = [percent];

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-auto">
          <Chart
            options={options}
            series={series}
            type="radialBar"
            height={320}
          />
        </div>
        <div className="flex-1">
          <div className="text-2xl font-bold">${value.toFixed(2)}</div>
          <div className="text-xs text-gray-500 text-center">
            Projected total
          </div>
        </div>
      </div>
    </div>
  );
}
