"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArcElement, Chart as ChartJS, Legend,Tooltip } from "chart.js"
import { useState } from "react"
import { Pie } from "react-chartjs-2"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { calculateCapitalGains } from "./(lib)/calculate-capital-gains"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

const formSchema = z.object({
  purchasePrice: z.string().transform(Number),
  salePrice: z.string().transform(Number),
  taxRate: z.string().transform(Number),
})

type FormValues = z.infer<typeof formSchema>

export default function CapitalGainsCalculator() {
  const [result, setResult] = useState<ReturnType<typeof calculateCapitalGains> | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchasePrice: "",
      salePrice: "",
      taxRate: "",
    },
  })

  function onSubmit(data: FormValues) {
    const result = calculateCapitalGains({
      purchasePrice: data.purchasePrice,
      salePrice: data.salePrice,
      taxRate: data.taxRate,
    })
    setResult(result)
  }

  const chartData = result
    ? {
        labels: ["Purchase Price", "Sale Price", "Capital Gains Tax Rate", "Total Capital Gains", "Tax Owed"],
        datasets: [
          {
            data: [
              result.purchasePrice,
              result.salePrice,
              result.taxRate,
              result.totalCapitalGains,
              result.taxOwed,
            ],
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }
    : null

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Implement PDF download logic here
    console.log("Download")
  }

  const handleClear = () => {
    form.reset()
    setResult(null)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Capital Gain Calculator</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="purchasePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Price</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" placeholder="Enter purchase price" {...field} />
                          <span className="absolute right-3 top-2.5">₹</span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Price</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" placeholder="Enter sale price" {...field} />
                          <span className="absolute right-3 top-2.5">₹</span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="taxRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capital Gains Tax Rate</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" placeholder="Enter tax rate" {...field} />
                          <span className="absolute right-3 top-2.5">%</span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Button type="submit">Calculate</Button>
                  <Button type="button" variant="destructive" onClick={handleClear}>
                    Clear
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button type="button" variant="outline" onClick={handlePrint}>
                    Print
                  </Button>
                  <Button type="button" variant="secondary" onClick={handleDownload}>
                    Download
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="space-y-6">
            {result && (
              <>
                <div className="aspect-square">
                  {chartData && <Pie data={chartData} />}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Purchase Price</h3>
                      <p className="text-2xl">₹{result.purchasePrice}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Sale Price</h3>
                      <p className="text-2xl">₹{result.salePrice}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Capital Gains Tax Rate</h3>
                      <p className="text-2xl">{result.taxRate}%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Total Capital Gains</h3>
                      <p className="text-2xl">₹{result.totalCapitalGains}</p>
                    </CardContent>
                  </Card>
                  <Card className="col-span-2">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Tax Owed</h3>
                      <p className="text-2xl">₹{result.taxOwed}</p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

