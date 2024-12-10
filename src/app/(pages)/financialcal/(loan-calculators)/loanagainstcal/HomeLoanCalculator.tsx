"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { LoanInputForm } from "./(components)/LoanInputForm";
import { LoanPieChart } from "./(components)/LoanPieChart";
import { LoanSummary } from "./(components)/LoanSummary";
import { MonthlyPaymentTable } from "./(components)/MonthlyPaymentTable";
import { useLoanCalculator } from "./(hooks)/useLoanCalculator";

export function HomeLoanCalculator() {
  const { result, calculateLoan } = useLoanCalculator();
  const [showResults, setShowResults] = useState(false);
  const printRef = useRef(null);

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

  const handlePrint = ()=>{
    window.print();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Home Loan Calculator</h1>
      <LoanInputForm onSubmit={handleSubmit} onClear={handleClear} />
      {showResults && result && (
        <div ref={printRef} className="space-y-8">
          <LoanSummary
            emi={result.emi}
            totalInterest={result.totalInterest}
            totalAmount={result.totalAmount}
          />
          <LoanPieChart
            loanAmount={result.totalAmount - result.totalInterest}
            emi={result.emi}
            totalInterest={result.totalInterest}
          />
          <MonthlyPaymentTable payments={result.monthlyPayments} />
          <div className="flex justify-center space-x-4">
            <Button onClick={() => handlePrint()}>Print Results</Button>
            <Button variant="outline">Download</Button>
          </div>
        </div>
      )}
    </div>
  );
}
