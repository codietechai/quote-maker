export function fvAnnualRRSP({
  currentBalance = 0,
  annualContribution,
  rate,
  years,
}: {
  currentBalance?: number; // existing RRSP balance
  annualContribution: number;
  rate: number;
  years: number;
}): number {
  if (years <= 0) return currentBalance;
  if (rate === 0) return currentBalance + annualContribution * years;

  return (
    currentBalance * Math.pow(1 + rate, years) +
    annualContribution * ((Math.pow(1 + rate, years) - 1) / rate)
  );
}

export function fvMonthlyRRSP({
  currentBalance,
  monthlyContribution,
  annualRate,
  months,
}: {
  currentBalance: number;
  monthlyContribution: number;
  annualRate: number;
  months: number;
}): number {
  if (months <= 0) return currentBalance;

  const monthlyRate = annualRate / 12;

  if (monthlyRate === 0) {
    return currentBalance + monthlyContribution * months;
  }

  return (
    currentBalance * Math.pow(1 + monthlyRate, months) +
    monthlyContribution *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  );
}

export function fvMonthlyTFSA({
  currentBalance,
  monthlyContribution,
  annualRate,
  months,
}: {
  currentBalance: number;
  monthlyContribution: number;
  annualRate: number;
  months: number;
}) {
  const r = annualRate / 12;

  const futureBalance =
    currentBalance * Math.pow(1 + r, months) +
    monthlyContribution * ((Math.pow(1 + r, months) - 1) / r);

  return futureBalance;
}

export function fvAnnualTFSA({
  annualContribution,
  rate,
  years,
}: {
  annualContribution: number;
  rate: number;
  years: number;
}) {
  return annualContribution * ((Math.pow(1 + rate, years) - 1) / rate);
}

export function fvMonthlyFHSA({
  currentBalance,
  monthlyContribution,
  annualRate,
  months,
}: {
  currentBalance: number;
  monthlyContribution: number;
  annualRate: number;
  months: number;
}) {
  const r = annualRate / 12;

  return (
    currentBalance * Math.pow(1 + r, months) +
    monthlyContribution * ((Math.pow(1 + r, months) - 1) / r)
  );
}

export function fvAnnualFHSA({
  annualContribution,
  rate,
  years,
}: {
  annualContribution: number;
  rate: number;
  years: number;
}) {
  return annualContribution * ((Math.pow(1 + rate, years) - 1) / rate);
}
