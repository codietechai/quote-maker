export type MonthlyRespInputs = {
  currentBalance: number;
  monthlyContribution: number;
  annualRate: number;
  months: number;
  lifetimeCesgCap?: number;
};

export type AnnualRespInputs = {
  currentBalance: number;
  annualContribution: number;
  annualRate: number;
  years: number;
  lifetimeCesgCap?: number;
};

export function annualCesgForAmount(annualContribution: number) {
  return Math.min(0.2 * annualContribution, 500);
}

export function fvMonthlyRESP({
  currentBalance,
  monthlyContribution,
  annualRate,
  months,
  lifetimeCesgCap = 7200,
}: MonthlyRespInputs) {
  const r = annualRate / 12;
  const contributionsSeries: number[] = [];
  const cesgSeries: number[] = [];
  const projectedSeries: number[] = [];

  let balance = currentBalance;
  let totalContributed = 0;
  let totalCesg = 0;
  let yearContributionAcc = 0;
  let monthsElapsed = 0;

  for (let m = 0; m <= months; m++) {
    // push current state (before monthly deposit for month 0)
    projectedSeries.push(balance);
    contributionsSeries.push(totalContributed);
    cesgSeries.push(totalCesg);

    if (m === months) break;

    // monthly contribution at start of month
    balance += monthlyContribution;
    totalContributed += monthlyContribution;
    yearContributionAcc += monthlyContribution;
    monthsElapsed++;

    // apply monthly growth
    balance *= 1 + r;

    // If we've completed a year (12 months), credit CESG for that year's contributions
    if (monthsElapsed % 12 === 0) {
      const annualContrib = yearContributionAcc;
      const cesgThisYear = Math.min(
        annualCesgForAmount(annualContrib),
        Math.max(0, lifetimeCesgCap - totalCesg)
      );
      if (cesgThisYear > 0) {
        totalCesg += cesgThisYear;
        balance += cesgThisYear; // grant is added to the RESP balance
      }
      yearContributionAcc = 0; // reset yearly accumulator
    }
  }

  return {
    projected: balance,
    projectedSeries,
    contributionsSeries,
    cesgSeries,
    totalContributed,
    totalCesg,
  };
}

export function fvAnnualRESP({
  currentBalance,
  annualContribution,
  annualRate,
  years,
  lifetimeCesgCap = 7200,
}: AnnualRespInputs) {
  const contributionsSeries: number[] = [];
  const cesgSeries: number[] = [];
  const projectedSeries: number[] = [];

  let balance = currentBalance;
  let totalContributed = 0;
  let totalCesg = 0;

  for (let y = 0; y <= years; y++) {
    projectedSeries.push(balance);
    contributionsSeries.push(totalContributed);
    cesgSeries.push(totalCesg);

    if (y === years) break;

    balance += annualContribution;
    totalContributed += annualContribution;

    const cesgThisYear = Math.min(
      annualCesgForAmount(annualContribution),
      Math.max(0, lifetimeCesgCap - totalCesg)
    );
    if (cesgThisYear > 0) {
      totalCesg += cesgThisYear;
      balance += cesgThisYear;
    }

    balance *= 1 + annualRate;
  }

  return {
    projected: balance,
    projectedSeries,
    contributionsSeries,
    cesgSeries,
    totalContributed,
    totalCesg,
  };
}
