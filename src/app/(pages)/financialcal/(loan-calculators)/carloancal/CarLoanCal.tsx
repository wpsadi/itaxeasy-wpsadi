"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { LoanInputForm } from "./(components)/LoanInputForm";
import { LoanPieChart } from "./(components)/LoanPieChart";
import { LoanSummary } from "./(components)/LoanSummary";
import { MonthlyPaymentTable } from "./(components)/MonthlyPaymentTable";
import { useLoanCalculator } from "./(hooks)/useLoanCalculator";

export function CarLoanCal() {
  const { result, calculateLoan } = useLoanCalculator();
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (
    loanAmount: number,
    interestRate: number,
    loanTenure: number
  ) => {
    calculateLoan({ loanAmount, interestRate, loanTenure });
    setShowResults(true);
  };

  const handleClear = () => {
    setShowResults(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 ">
      <h1 className="text-3xl font-bold text-center">Car Loan Calculator</h1>
      <LoanInputForm onSubmit={handleSubmit} onClear={handleClear} />
      {showResults && result && (
        <div className="space-y-8">
          <LoanSummary
            emi={result.emi}
            totalInterest={result.totalInterest}
            totalAmount={result.totalAmount}
          />
          <LoanPieChart
            loanAmount={result.totalAmount - result.totalInterest}
            totalInterest={result.totalInterest}
          />
          <MonthlyPaymentTable payments={result.monthlyPayments} />
          <div className="flex justify-center">
            <Button onClick={handlePrint}>Print Results</Button>
          </div>
        </div>
      )}
    </div>
  );
}
