export function calculateLoan(loanAmount: number, interestRate: number, loanTenure: number) {
    const monthlyRate = interestRate / (100 * 12)
    const totalMonths = loanTenure * 12
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    const totalAmount = emi * totalMonths
    const totalInterest = totalAmount - loanAmount
  
    const monthlyPayment = calculateMonthlyEmiPayment(loanAmount, interestRate, loanTenure, emi)
  
    return {
      emi: Math.round(emi),
      loanAmount,
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      monthlyPayment,
    }
  }
  
  function calculateMonthlyEmiPayment(loanAmount: number, rate: number, loanTenure: number, emi: number) {
    const monthlyCalculation = []
    let totalLoanAmount = loanAmount
  
    for (let i = 0; i < loanTenure * 12; i++) {
      const towardsInterest = (totalLoanAmount * rate) / (100 * 12)
      const towardsLoan = emi - towardsInterest
      totalLoanAmount -= towardsLoan
  
      monthlyCalculation.push({
        month: i + 1,
        emi: Math.round(emi),
        towards_loan: Math.round(towardsLoan),
        towards_interest: Math.round(towardsInterest),
        outstanding_loan: Math.round(totalLoanAmount),
      })
    }
  
    return monthlyCalculation
  }
  
  