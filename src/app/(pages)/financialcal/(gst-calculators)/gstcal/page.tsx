"use client";

import { GSTCalculator } from "./gst-calculator";

export type GSTCalType = {
  gstRate: number;
  gstType: "include" | "exclude";
  amount: number;
};

export default function Page() {
  return (
    <>
    
      <GSTCalculator />
    </>
  );
}
