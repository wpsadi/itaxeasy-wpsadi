"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArcElement, Chart as ChartJS, Legend,Tooltip } from 'chart.js'
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

import { calculateMIS } from "./(lib)/calculate-mis"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

const formSchema = z.object({
  investmentAmount: z.string().transform(Number).refine(val => val > 0, {
    message: "Investment amount must be greater than 0",
  }),
  interestRate: z.string().transform(Number).refine(val => val > 0 && val <= 100, {
    message: "Interest rate must be between 0 and 100",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function PostOfficeMISCalculator() {
  const [result, setResult] = useState<ReturnType<typeof calculateMIS> | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentAmount: "",
      interestRate: "",
    },
  })

  function onSubmit(data: FormValues) {
    const result = calculateMIS({
      investmentAmount: data.investmentAmount,
      interestRate: data.interestRate,
    })
    setResult(result)
  }

  const chartData = result
    ? {
        labels: ['Monthly Income'],
        datasets: [
          {
            data: [result.monthlyIncome],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      }
    : null

  const handleClear = () => {
    form.reset()
    setResult(null)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Implement download logic here
    console.log("Download")
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Post Office (MIS) Calculator</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="investmentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investment Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" placeholder="Enter investment amount" {...field} />
                          <span className="absolute right-3 top-2.5">₹</span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest Rate</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" placeholder="Enter interest rate" {...field} />
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
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Monthly Income</h3>
                    <p className="text-2xl">₹{result.monthlyIncome.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

