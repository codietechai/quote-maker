"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";

interface Benefit {
  text: string;
}

interface CalculatorCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: Benefit[];
  color: string; // Tailwind color (e.g., "text-blue-600", "bg-blue-100")
  href: string;
  badge?: string;
}

export function CalculatorCard({
  icon,
  title,
  description,
  benefits,
  color,
  href,
  badge,
}: CalculatorCardProps) {
  const router = useRouter();
  return (
    <Card className="rounded-3xl shadow-md border border-gray-200 hover:shadow-lg hover:scale-[101%] transition">
      <CardHeader className="relative">
        {badge && (
          <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-medium shadow">
            {badge}
          </span>
        )}

        <div
          className={cn(
            "w-14 h-14 rounded-2xl border border-dashed border-gray-300 grid place-items-center mb-3",
            "bg-white shadow-sm"
          )}
        >
          <div className="text-3xl" style={{ color }}>
            {icon}
          </div>
        </div>

        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Key Benefits:</p>
          <ul className="space-y-2">
            {benefits.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-gray-700 text-sm"
              >
                <Check className="w-4 h-4 text-green-600" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={() => router.push(href)}>
          Calculate Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </Button>
      </CardContent>
    </Card>
  );
}
