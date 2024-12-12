export type TaxPayerType =
  | "Individual"
  | "HUF"
  | "AOP/BOI"
  | "Domestic Company"
  | "Foreign Company"
  | "Firms"
  | "LLP"
  | "Co-operative Society"

interface TaxInput {
  panNo: string;
  taxPayerType: TaxPayerType;
  section115BAC: boolean;
  netTaxableIncome: number;
  relief: number;
  tdsCredit: number;
}

interface TaxResult {
  incomeTax: number;
  surcharge: number;
  educationCess: number;
  totalTaxLiability: number;
  assessedTax: number;
  advanceTaxLiability: {
    june: number;
    september: number;
    december: number;
    march: number;
  };
  installments: {
    first: number;
    second: number;
    third: number;
    fourth: number;
  };
}

export function calculateAdvanceTax(input: TaxInput): TaxResult {
  // Simplified tax calculation logic
  const incomeTax = input.netTaxableIncome * 0.3; // Example rate
  const surcharge = incomeTax * 0.1;
  const educationCess = (incomeTax + surcharge) * 0.04;
  const totalTaxLiability = incomeTax + surcharge + educationCess;
  const assessedTax = totalTaxLiability - input.relief - input.tdsCredit;

  // Calculate advance tax liability
  const advanceTaxLiability = {
    june: assessedTax * 0.15,
    september: assessedTax * 0.45,
    december: assessedTax * 0.75,
    march: assessedTax,
  };

  // Calculate installments
  const installments = {
    first: advanceTaxLiability.june,
    second: advanceTaxLiability.september - advanceTaxLiability.june,
    third: advanceTaxLiability.december - advanceTaxLiability.september,
    fourth: advanceTaxLiability.march - advanceTaxLiability.december,
  };

  return {
    incomeTax,
    surcharge,
    educationCess,
    totalTaxLiability,
    assessedTax,
    advanceTaxLiability,
    installments,
  };
}