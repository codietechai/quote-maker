"use client";

import Navigation from "@/components/common/navbar";
import { PageHeader } from "@/components/screens/calculators/page-header";
import { FeatureGrid } from "@/components/screens/insurance-options/feature-grid";
import { QuoteForm } from "@/components/screens/insurance-options/quote-form";
import { Heart, ShieldCheck, DollarSign } from "lucide-react";

export default function Page() {
  const features = [
    {
      icon: <Heart size={26} />,
      title: "Family Protection",
      subtitle:
        "Secure your family's financial future with comprehensive coverage",
      color: "red",
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Guaranteed Coverage",
      subtitle: "Lock in your rates with term life insurance plans",
      color: "blue",
    },
    {
      icon: <DollarSign size={26} />,
      title: "Affordable Premiums",
      subtitle: "Competitive rates with flexible payment options",
      color: "#2ffacc",
    },
  ];

  return (
    <>
      <Navigation />
      <div className="bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <PageHeader
            heading="Life Insurance Quote"
            description="Get personalized life insurance quotes to protect your family's financial future"
          />

          <div className="mt-10">
            <QuoteForm />
          </div>

          <div className="mt-14">
            <FeatureGrid items={features} />
          </div>
        </div>
      </div>
    </>
  );
}
