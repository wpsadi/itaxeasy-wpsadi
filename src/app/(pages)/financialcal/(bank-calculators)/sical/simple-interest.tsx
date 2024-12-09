"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ActionButtons } from "./(component)/action-buttons";
import { ChartDisplay } from "./(component)/chart-display";
import { InputWithSlider } from "./(component)/input-with-slider";
import { ResultsDisplay } from "./(component)/results-display";
import { TimePeriodSelect } from "./(component)/time-period-select";
import { calculateInterest } from "./(lib)/calculate-interest";

export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(6);
  const [time, setTime] = useState(1);
  const [timePeriod, setTimePeriod] = useState<
    "yearly" | "monthly" | "quarterly"
  >("yearly");
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const { totalInterest, totalAmount } = calculateInterest(
      principal,
      rate,
      time,
      timePeriod
    );
    setTotalInterest(totalInterest);
    setTotalAmount(totalAmount);
  }, [principal, rate, time, timePeriod]);

  const handleClear = () => {
    setPrincipal(1000);
    setRate(6);
    setTime(1);
    setTimePeriod("yearly");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Simple Interest Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
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
              label="Time period"
              value={time}
              onChange={setTime}
              min={1}
              max={30}
              step={1}
              symbol={
                timePeriod === "yearly"
                  ? "Y"
                  : timePeriod === "monthly"
                  ? "M"
                  : "Q"
              }
            />
            <TimePeriodSelect value={timePeriod} onChange={setTimePeriod} />
            <ActionButtons onClear={handleClear} />
          </div>
          <div className="space-y-4">
            <ChartDisplay principal={principal} totalInterest={totalInterest} />
            <ResultsDisplay
              principal={principal}
              totalInterest={totalInterest}
              totalAmount={totalAmount}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
