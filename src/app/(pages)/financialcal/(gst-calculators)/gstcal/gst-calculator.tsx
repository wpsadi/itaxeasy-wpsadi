"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { AmountInput } from "./(components)/amount-input";
import { GSTRateInput } from "./(components)/gst-rate-input";
import { GSTTypeSelect } from "./(components)/gst-type-select";
import { ResultDisplay } from "./(components)/result-display";
import { calculateGST } from "./(lib)/calculate-gst";

const formSchema = z.object({
  gstType: z.enum(["include", "exclude"]),
  amount: z.number().min(0, "Amount must be positive"),
  gstRate: z.number().min(0, "GST rate must be positive"),
});

export function GSTCalculator() {
  const [gstAmount, setGstAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gstType: "include",
      amount: 0,
      gstRate: 5,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { gstAmount, totalAmount } = calculateGST(
      values.gstType,
      values.amount,
      values.gstRate
    );
    setGstAmount(gstAmount);
    setTotalAmount(totalAmount);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-10">
      <Card className="w-full max-w-md shadow-2xl  transition-transform duration-300">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            GST Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <GSTTypeSelect control={form.control} />
              <AmountInput control={form.control} />
              <GSTRateInput control={form.control} />
              <ResultDisplay label="GST Amount" value={gstAmount} />
              <ResultDisplay label="Total Amount" value={totalAmount} />
              <div className="flex justify-center">
                <Button type="submit">Calculate</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
