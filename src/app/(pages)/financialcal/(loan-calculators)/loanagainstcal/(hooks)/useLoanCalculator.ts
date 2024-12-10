import { useState } from 'react';

interface LoanDetails {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
}

interface LoanResult {
  emi: number;
  totalInterest: number;
  totalAmount: number;
  monthlyPayments: MonthlyPayment[];
}

interface MonthlyPayment {
  month: number;
  openingBalance: number;
  emi: number;
  interest: number;
  principal: number;
  closingBalance: number;
}

export function useLoanCalculator() {
  const [result, setResult] = useState<LoanResult | null>(null);

  const calculateLoan = ({ loanAmount, interestRate, loanTenure }: LoanDetails) => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalAmount = emi * totalMonths;
    const totalInterest = totalAmount - loanAmount;

    const monthlyPayments: MonthlyPayment[] = [];
    let remainingBalance = loanAmount;

    for (let month = 1; month <= totalMonths; month++) {
      const interest = remainingBalance * monthlyRate;
      const principal = emi - interest;
      const closingBalance = remainingBalance - principal;

      monthlyPayments.push({
        month,
        openingBalance: remainingBalance,
        emi,
        interest,
        principal,
        closingBalance: closingBalance > 0 ? closingBalance : 0,
      });

      remainingBalance = closingBalance;
    }

    setResult({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      monthlyPayments,
    });
  };

  return { result, calculateLoan };
}

