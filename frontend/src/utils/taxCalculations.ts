export interface TaxSlab {
  from: number;
  to: number;
  rate: number;
}

export interface TaxBreakdown {
  grossIncome: number;
  standardDeduction: number;
  totalDeductions: number;
  taxableIncome: number;
  slabWiseTax: { slab: string; taxableAmount: number; rate: number; tax: number }[];
  taxBeforeRebate: number;
  rebate87A: number;
  taxAfterRebate: number;
  surcharge: number;
  cess: number;
  totalTaxPayable: number;
  regime: 'old' | 'new';
}

export interface OldRegimeInputs {
  grossIncome: number;
  ageGroup: 'below60' | '60to80' | 'above80';
  deduction80C: number;
  deduction80D: number;
  deduction80TTA: number;
  hraExemption: number;
  otherDeductions: number;
}

export interface NewRegimeInputs {
  grossIncome: number;
}

// Old Regime Tax Slabs FY 2024-25
function getOldRegimeSlabs(ageGroup: string): TaxSlab[] {
  if (ageGroup === 'above80') {
    return [
      { from: 0, to: 500000, rate: 0 },
      { from: 500000, to: 1000000, rate: 20 },
      { from: 1000000, to: Infinity, rate: 30 },
    ];
  } else if (ageGroup === '60to80') {
    return [
      { from: 0, to: 300000, rate: 0 },
      { from: 300000, to: 500000, rate: 5 },
      { from: 500000, to: 1000000, rate: 20 },
      { from: 1000000, to: Infinity, rate: 30 },
    ];
  } else {
    // below 60
    return [
      { from: 0, to: 250000, rate: 0 },
      { from: 250000, to: 500000, rate: 5 },
      { from: 500000, to: 1000000, rate: 20 },
      { from: 1000000, to: Infinity, rate: 30 },
    ];
  }
}

// New Regime Tax Slabs FY 2024-25
const NEW_REGIME_SLABS: TaxSlab[] = [
  { from: 0, to: 300000, rate: 0 },
  { from: 300000, to: 700000, rate: 5 },
  { from: 700000, to: 1000000, rate: 10 },
  { from: 1000000, to: 1200000, rate: 15 },
  { from: 1200000, to: 1500000, rate: 20 },
  { from: 1500000, to: Infinity, rate: 30 },
];

function computeSlabTax(
  taxableIncome: number,
  slabs: TaxSlab[]
): { slabWiseTax: { slab: string; taxableAmount: number; rate: number; tax: number }[]; totalTax: number } {
  let totalTax = 0;
  const slabWiseTax: { slab: string; taxableAmount: number; rate: number; tax: number }[] = [];

  for (const slab of slabs) {
    if (taxableIncome <= slab.from) break;
    const taxableInSlab = Math.min(taxableIncome, slab.to === Infinity ? taxableIncome : slab.to) - slab.from;
    if (taxableInSlab <= 0) continue;
    const tax = (taxableInSlab * slab.rate) / 100;
    totalTax += tax;
    const slabLabel =
      slab.to === Infinity
        ? `Above ₹${(slab.from / 100000).toFixed(0)}L`
        : `₹${(slab.from / 100000).toFixed(0)}L – ₹${(slab.to / 100000).toFixed(0)}L`;
    slabWiseTax.push({ slab: slabLabel, taxableAmount: taxableInSlab, rate: slab.rate, tax });
  }

  return { slabWiseTax, totalTax };
}

function computeSurcharge(income: number, tax: number): number {
  if (income > 50000000) return tax * 0.37; // 37% for > 5 Cr
  if (income > 20000000) return tax * 0.25; // 25% for > 2 Cr
  if (income > 10000000) return tax * 0.15; // 15% for > 1 Cr
  if (income > 5000000) return tax * 0.10;  // 10% for > 50L
  return 0;
}

export function calculateOldRegimeTax(inputs: OldRegimeInputs): TaxBreakdown {
  const { grossIncome, ageGroup, deduction80C, deduction80D, deduction80TTA, hraExemption, otherDeductions } = inputs;

  const standardDeduction = 50000;
  const totalDeductions = Math.min(deduction80C, 150000) + deduction80D + deduction80TTA + hraExemption + otherDeductions + standardDeduction;
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  const slabs = getOldRegimeSlabs(ageGroup);
  const { slabWiseTax, totalTax } = computeSlabTax(taxableIncome, slabs);

  // Section 87A rebate: up to ₹12,500 if taxable income ≤ ₹5L
  const rebate87A = taxableIncome <= 500000 ? Math.min(totalTax, 12500) : 0;
  const taxAfterRebate = Math.max(0, totalTax - rebate87A);

  const surcharge = computeSurcharge(grossIncome, taxAfterRebate);
  const taxPlusSurcharge = taxAfterRebate + surcharge;
  const cess = taxPlusSurcharge * 0.04;
  const totalTaxPayable = Math.round(taxPlusSurcharge + cess);

  return {
    grossIncome,
    standardDeduction,
    totalDeductions,
    taxableIncome,
    slabWiseTax,
    taxBeforeRebate: totalTax,
    rebate87A,
    taxAfterRebate,
    surcharge,
    cess,
    totalTaxPayable,
    regime: 'old',
  };
}

export function calculateNewRegimeTax(inputs: NewRegimeInputs): TaxBreakdown {
  const { grossIncome } = inputs;

  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, grossIncome - standardDeduction);

  const { slabWiseTax, totalTax } = computeSlabTax(taxableIncome, NEW_REGIME_SLABS);

  // Section 87A rebate: up to ₹25,000 if taxable income ≤ ₹7L
  const rebate87A = taxableIncome <= 700000 ? Math.min(totalTax, 25000) : 0;
  const taxAfterRebate = Math.max(0, totalTax - rebate87A);

  const surcharge = computeSurcharge(grossIncome, taxAfterRebate);
  const taxPlusSurcharge = taxAfterRebate + surcharge;
  const cess = taxPlusSurcharge * 0.04;
  const totalTaxPayable = Math.round(taxPlusSurcharge + cess);

  return {
    grossIncome,
    standardDeduction,
    totalDeductions: standardDeduction,
    taxableIncome,
    slabWiseTax,
    taxBeforeRebate: totalTax,
    rebate87A,
    taxAfterRebate,
    surcharge,
    cess,
    totalTaxPayable,
    regime: 'new',
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
