interface MISInput {
    investmentAmount: number;
    interestRate: number;
  }
  
  interface MISResult {
    monthlyIncome: number;
  }
  
  export function calculateMIS({
    investmentAmount,
    interestRate,
  }: MISInput): MISResult {
    // Calculate monthly income based on investment amount and interest rate
    const annualIncome = (investmentAmount * interestRate) / 100;
    const monthlyIncome = annualIncome / 12;
  
    return {
      monthlyIncome: Math.round(monthlyIncome),
    };
  }
  
  