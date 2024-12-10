import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoanInputFormProps {
  onSubmit: (
    loanAmount: number,
    interestRate: number,
    loanTenure: number
  ) => void;
  onClear: () => void;
}

export function LoanInputForm({ onSubmit, onClear }: LoanInputFormProps) {
  const [loanAmount, setLoanAmount] = React.useState("");
  const [interestRate, setInterestRate] = React.useState("");
  const [loanTenure, setLoanTenure] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(Number(loanAmount), Number(interestRate), Number(loanTenure));
  };

  const handleClear = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="loanAmount"
          className="block text-sm font-medium text-gray-700"
        >
          Loan Amount (₹)
        </label>
        <Input
          id="loanAmount"
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
          placeholder="Enter loan amount"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="interestRate"
          className="block text-sm font-medium text-gray-700"
        >
          Interest Rate (% p.a.)
        </label>
        <Input
          id="interestRate"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          required
          placeholder="Enter interest rate"
          step="0.1"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="loanTenure"
          className="block text-sm font-medium text-gray-700"
        >
          Loan Tenure (years)
        </label>
        <Input
          id="loanTenure"
          type="number"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
          required
          placeholder="Enter loan tenure"
        />
      </div>
      <div className="flex space-x-2">
        <Button type="submit">Calculate</Button>
        <Button type="button" variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </form>
  );
}
