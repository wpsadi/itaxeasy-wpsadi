"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { LoanInputs } from "./(components)/loan-inputs";
import {
  MonthlyBreakdown,
  MonthlyBreakdownProps,
} from "./(components)/monthly-breakdown";
import { ResultsDisplay } from "./(components)/results-display";
import { calculateLoan } from "./(lib)/ calculate-loan";

const formSchema = z.object({
  loanAmount: z.number().min(1, "Loan amount must be greater than 0"),
  interestRate: z.number().min(0, "Interest rate must be positive"),
  loanTenure: z.number().min(1, "Loan tenure must be at least 1 year"),
});

type Result = {
  emi: number;
  loanAmount: number;
  totalInterest: number;
  totalAmount: number;
  monthlyPayment: MonthlyBreakdownProps["monthlyData"];
};

export function BusinessLoanCalculator() {
  const [results, setResults] = useState<Result>();
  const [loading, setLoading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 0,
      interestRate: 0,
      loanTenure: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const calculatedResults = calculateLoan(
      values.loanAmount,
      values.interestRate,
      values.loanTenure
    );
    setResults(calculatedResults);
    setLoading(false);
  }

  const handleClear = () => {
    form.reset();
    setResults(undefined);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white my-5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Business Loan Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <LoanInputs control={form.control} />
                <div className="flex justify-center space-x-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Calculating..." : "Calculate"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleClear}>
                    Clear
                  </Button>
                  {results && (
                    <Button type="button" onClick={handlePrint}>
                      Print
                    </Button>
                  )}
                </div>
              </form>
            </Form>
            {results && (
              <div className="mt-6" ref={printRef}>
                <ResultsDisplay results={results} />
              </div>
            )}
          </div>
          {results && (
            <div className="max-h-[600px] overflow-y-auto">
              <MonthlyBreakdown monthlyData={results.monthlyPayment} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
