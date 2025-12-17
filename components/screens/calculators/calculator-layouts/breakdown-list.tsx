import React from "react";

export default function BreakdownList({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.label} className="flex justify-between text-sm">
          <span className="text-gray-600">{it.label}</span>
          <span className="font-medium">{it.value}</span>
        </li>
      ))}
    </ul>
  );
}
