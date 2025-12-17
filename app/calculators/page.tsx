import { CalculatorCard } from "@/components/screens/calculators/calculator-card";
import { PageHeader } from "@/components/screens/calculators/page-header";
import Navigation from "@/components/common/navbar";
import { PiggyBank, Home, GraduationCap, Calculator } from "lucide-react";

export default function CanadianCalculatorsPage() {
  return (
    <main>
      <Navigation />

      <div className="py-10 px-6">
        <PageHeader
          Icon={Calculator}
          heading="Canadian Savings Calculators"
          description="Calculate RRSP, TFSA, FHSA & RESP with 2025 limits"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-10">
          <CalculatorCard
            icon={<PiggyBank className="w-7 h-7" />}
            title="RRSP Calculator"
            description="Registered Retirement Savings Plan — Build your retirement nest egg with tax-deductible contributions and tax-deferred growth."
            benefits={[
              { text: "Tax-deductible contributions" },
              { text: "Tax-deferred growth" },
              { text: "Retirement income planning" },
            ]}
            href="/calculators/rrsp"
            color="#1E40AF"
            badge="POPULAR"
          />

          <CalculatorCard
            icon={<PiggyBank className="w-7 h-7" />}
            title="TFSA Calculator"
            description="Flexible savings with tax-free growth and tax-free withdrawals for any financial goal."
            benefits={[
              { text: "Tax-free growth" },
              { text: "Flexible withdrawals" },
              { text: "No age restrictions" },
            ]}
            href="/calculators/tfsa"
            color="#059669"
          />

          <CalculatorCard
            icon={<Home className="w-7 h-7" />}
            title="FHSA Calculator"
            description="Save for your first home with tax deductions on contributions and tax-free investment growth."
            benefits={[
              { text: "Tax-deductible contributions" },
              { text: "Tax-free growth" },
              { text: "Home ownership assistance" },
            ]}
            href="/calculators/fhsa"
            color="#EA580C"
          />

          <CalculatorCard
            icon={<GraduationCap className="w-7 h-7" />}
            title="RESP Calculator"
            description="Plan your child's education with government grants and tax-sheltered investment growth."
            benefits={[
              { text: "Government grants" },
              { text: "Education savings" },
              { text: "Tax-sheltered growth" },
            ]}
            href="/calculators/resp"
            color="#9333EA"
          />
        </div>
      </div>
    </main>
  );
}
