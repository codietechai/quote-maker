"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  value: "annual" | "monthly";
  onChange: (val: "annual" | "monthly") => void;
}

export default function FormulaSelector({ value, onChange }: Props) {
  return (
    <div className="w-full md:w-64">
      <Select
        value={value}
        onValueChange={(v) => onChange(v as "annual" | "monthly")}
      >
        <SelectTrigger className="rounded-full bg-background">
          <SelectValue placeholder="Contribution Frequency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="annual">
            Option A — Annual Contributions
          </SelectItem>
          <SelectItem value="monthly">
            Option B — Monthly Contributions
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
