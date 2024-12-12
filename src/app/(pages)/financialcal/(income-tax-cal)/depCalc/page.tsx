"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { calculateDepreciation } from "./(lib)/calculate";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const formSchema = z.object({
  purchasePrice: z.string().transform(Number),
  scrapValue: z.string().transform(Number),
  usefulLife: z.string().transform(Number),
});

type FormValues = z.infer<typeof formSchema>;

export default function DepreciationCalculator() {
  const [result, setResult] = useState<{
    yearlyValues: number[];
    depreciationPercentage: number;
    costOfAsset: number;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchasePrice: 0,
      scrapValue: 0,
      usefulLife: 0,
    },
  });

  function onSubmit(data: FormValues) {
    const calculationResult = calculateDepreciation({
      purchasePrice: data.purchasePrice,
      scrapValue: data.scrapValue,
      usefulLife: data.usefulLife,
    });
    setResult(calculationResult);
  }

  const chartData = result
    ? {
        labels: Array.from(
          { length: result.yearlyValues.length },
          (_, i) => `Year ${i}`
        ),
        datasets: [
          {
            label: "Yearly Depreciation Representation",
            data: result.yearlyValues,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            tension: 0.1,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      x: {
        type: "category" as const,
        beginAtZero: true,
      },
      y: {
        type: "linear" as const,
        beginAtZero: true,
      },
    },
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download logic here
    console.log("Download");
  };

  const handleClear = () => {
    form.reset();
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Depreciation Calculator</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="purchasePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Price</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="Enter purchase price"
                            {...field}
                          />
                          <span className="absolute right-3 top-2.5">₹</span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="scrapValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scrap Value</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="Enter scrap value"
                            {...field}
                          />
                          <span className="absolute right-3 top-2.5">₹</span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usefulLife"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Useful Life</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="Enter years"
                            {...field}
                          />
                          <span className="absolute right-3 top-2.5">Y</span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Button type="submit" className="w-full">
                    Calculate
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleClear}
                    className="w-full"
                  >
                    Clear
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrint}
                    className="w-full"
                  >
                    Print
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleDownload}
                    className="w-full"
                  >
                    Download
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="space-y-6">
            {result && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {chartData && (
                    <Line data={chartData} options={chartOptions} />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Depreciation Percentage
                      </h3>
                      <p className="text-2xl font-bold">
                        {result.depreciationPercentage.toFixed(2)}%
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Cost Of Asset
                      </h3>
                      <p className="text-2xl font-bold">
                        ₹{result.costOfAsset.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
