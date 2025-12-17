"use client";
import React from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface Props {
  value: "annually" | "monthly" | "weekly" | "biweekly";
  onChange: (v: Props["value"]) => void;
}

export default function FrequencySelector({ value, onChange }: Props) {
  return (
    <div className="mb-4">
      <div className="text-sm font-medium mb-2">Contribution Frequency</div>
      <div className="flex gap-2 flex-wrap">
        {(
          ["annually", "monthly", "weekly", "biweekly"] as Props["value"][]
        ).map((f) => (
          <Button
            key={f}
            onClick={() => onChange(f)}
            className={`${
              value === f
                ? "bg-linear-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } rounded-full`}
          >
            {f}
          </Button>
        ))}
      </div>
    </div>
  );
}
