"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  label: string;
  value: number | string;
  onChange: (v: number) => void;
  placeholder?: string;
}

export default function NumberInput({
  label,
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <div className="mb-4">
      <Label className="mb-2">{label}</Label>
      <Input
        type="number"
        value={value as any}
        placeholder={placeholder}
        onChange={(e) => onChange(Number(e.target.value || 0))}
      />
    </div>
  );
}
