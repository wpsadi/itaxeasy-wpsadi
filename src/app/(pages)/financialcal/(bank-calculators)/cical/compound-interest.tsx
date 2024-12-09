"use client";

import { useEffect, useRef, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ActionButtons } from "./(components)/action-buttons";
import { ChartDisplay } from "./(components)/chart-display";
import { InputWithSlider } from "./(components)/input-with-slider";
import { ResultsDisplay } from "./(components)/results-display";
import { calculateCompoundInterest } from "./(lib)/calculate-compound-interest";

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(6);
  const [time, setTime] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { totalAmount } = calculateCompoundInterest(principal, rate, time);
    setTotalAmount(totalAmount);
  }, [principal, rate, time]);

  const handleClear = () => {
    setPrincipal(1000);
    setRate(6);
    setTime(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-6">
      <Card className="max-w-3xl mx-auto print:shadow-none" ref={contentRef}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Compound Interest Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 print:grid-cols-2">
          <div className="space-y-4">
            <InputWithSlider
              label="Principal amount"
              value={principal}
              onChange={setPrincipal}
              min={1000}
              max={1000000}
              step={1000}
              symbol="₹"
            />
            <InputWithSlider
              label="Rate of interest (p.a)"
              value={rate}
              onChange={setRate}
              min={1}
              max={30}
              step={0.1}
              symbol="%"
            />
            <InputWithSlider
              label="Time period (years)"
              value={time}
              onChange={setTime}
              min={1}
              max={30}
              step={1}
              symbol="Y"
            />
            <ActionButtons onClear={handleClear} contentRef={contentRef} />
          </div>
          <div className="space-y-4">
            <ChartDisplay
              principal={principal}
              totalInterest={totalAmount - principal}
            />
            <ResultsDisplay
              principal={principal}
              totalInterest={totalAmount - principal}
              totalAmount={totalAmount}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
