interface NPSInput {
    monthlyInvestment: number;
    rateOfInterest: number;
    currentAge: number;
  }
  
  interface YearlyBreakdown {
    year: number;
    investmentAmount: number;
    interestEarned: number;
    maturityAmount: number;
  }
  
  interface NPSResult {
    total: number;
    invested: number;
    gain: number;
    yearlyBreakdown: YearlyBreakdown[];
  }
  
  export function calculateNPS({
    monthlyInvestment,
    rateOfInterest,
    currentAge,
  }: NPSInput): NPSResult {
    const retirementAge = 60;
    const investmentYears = retirementAge - currentAge;
    const yearlyInvestment = monthlyInvestment * 12;
    const yearlyBreakdown: YearlyBreakdown[] = [];
    
    let totalInvested = 0;
    let totalAmount = 0;
    
    for (let year = 1; year <= investmentYears; year++) {
      totalInvested += yearlyInvestment;
      const openingBalance = totalAmount;
      const interestEarned = (openingBalance + yearlyInvestment / 2) * (rateOfInterest / 100);
      totalAmount = openingBalance + yearlyInvestment + interestEarned;
      
      yearlyBreakdown.push({
        year,
        investmentAmount: yearlyInvestment,
        interestEarned,
        maturityAmount: totalAmount,
      });
    }
  
    return {
      total: Math.round(totalAmount),
      invested: Math.round(totalInvested),
      gain: Math.round(totalAmount - totalInvested),
      yearlyBreakdown: yearlyBreakdown.map(item => ({
        ...item,
        interestEarned: Math.round(item.interestEarned),
        maturityAmount: Math.round(item.maturityAmount),
      })),
    };
  }
  
  