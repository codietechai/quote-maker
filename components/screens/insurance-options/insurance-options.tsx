"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Heart,
  Plane,
  Shield,
  Clock,
  DollarSign,
  Activity,
  FileText,
  Zap,
} from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const items = [
  {
    title: "Life Insurance",
    subtitle: "Term & Whole Life Coverage",
    icon: <Heart className="size-6 text-rose-500" />,
    color: "#ff2056",
    popular: true,
    href: "/insurance-options/life-insurance",
  },
  {
    title: "Travel",
    subtitle: "Super Visa Insurance / Visitors Insurance",
    icon: <Plane className="size-6 text-blue-500" />,
    color: "#2b7fff",
    href: "/insurance-options/travel",
  },
  {
    title: "Health and Dental",
    subtitle: "Complete Medical & Dental Coverage",
    icon: <Shield className="size-6 text-green-600" />,
    color: "#00a63e",
    href: "/insurance-options/health-and-dental",
  },
  {
    title: "Long-Term Care",
    subtitle: "Extended Care Insurance",
    icon: <Clock className="size-6 text-purple-600" />,
    color: "#9810fa",
    href: "/insurance-options/long-term-care",
  },
  {
    title: "Loss of Income",
    subtitle: "Disability due to injury/illness",
    icon: <DollarSign className="size-6 text-orange-500" />,
    color: "#ff6900",
    href: "/insurance-options/loss-of-income",
  },
  {
    title: "Critical Illness Insurance",
    subtitle: "Protection Against Major Illnesses",
    icon: <Activity className="size-6 text-violet-600" />,
    color: "#7f22fe",
    href: "/insurance-options/critical-illness-insurance",
  },
  {
    title: "Final Expense Insurance",
    subtitle: "End-of-Life Coverage",
    icon: <FileText className="size-6 text-gray-600" />,
    color: "#4a5565",
    href: "/insurance-options/final-expense-insurance",
  },
  {
    title: "Accident & Dismemberment",
    subtitle: "Accidental Death & Dismemberment",
    icon: <Zap className="size-6 text-yellow-500" />,
    color: "#f0b100",
    href: "/insurance-options/accident-and-dismemberment",
  },
];

export default function InsurancePage() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen bg-linear-to-b from-blue-50 to-white py-16 pt-32 px-6">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          How can we help secure your peace of mind today??
        </h1>
        <p className="text-slate-600 text-lg">
          Choose your coverage and get an instant quote
        </p>
      </div>

      <div className="max-w-5xl mx-auto mb-10">
        <div className="bg-white shadow-md rounded-2xl px-6 py-4 flex items-center gap-4">
          <div className="flex items-center justify-center size-10 rounded-full bg-blue-700 text-white font-bold text-lg">
            3
          </div>
          <h2 className="text-xl font-semibold text-slate-800">
            Step 3: Select your insurance type
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="relative rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer p-6 group">
              <CardContent className="flex flex-col items-center text-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    backgroundColor: item.color,
                  }}
                >
                  {React.cloneElement(item.icon, { color: "white" })}
                </div>

                <h3 className="text-lg font-bold text-slate-800">
                  {item.title}
                </h3>

                <p className="text-sm text-blue-700 font-medium leading-tight">
                  {item.subtitle}
                </p>

                <Button
                  variant="ghost"
                  onClick={() => router.push(item.href)}
                  className="text-blue-700 hover:text-blue-900"
                >
                  Get Quote →
                </Button>
              </CardContent>

              {item.popular && (
                <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  POPULAR
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
