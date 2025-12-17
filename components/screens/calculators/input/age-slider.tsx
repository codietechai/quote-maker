"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface Props {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
}

export default function AgeSlider({
  label,
  value,
  min = 18,
  max = 80,
  onChange,
}: Props) {
  return (
    <div className="mb-4">
      <Label className="flex items-center justify-between mb-2">
        <span>{label}</span>
        <span className="text-sm text-gray-600">{value} yrs</span>
      </Label>
      <Slider
        defaultValue={[value]}
        min={min}
        max={max}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  );
}
