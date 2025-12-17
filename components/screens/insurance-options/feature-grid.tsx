"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
}

interface FeatureGridProps {
  items: Feature[];
}

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="rounded-2xl shadow-sm hover:shadow-lg transition-all p-6">
            <CardContent className="flex flex-col items-center text-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                style={{ backgroundColor: item.color }}
              >
                {React.cloneElement(item?.icon as any, {
                  color: "white",
                  size: 24,
                })}
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.subtitle}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
