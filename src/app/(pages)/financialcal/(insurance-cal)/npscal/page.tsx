"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { calculateNPS } from "../../(insurance-cal)/npscal/(lib)/calculate-nps"

const formSchema = z.object({
  monthlyInvestment: z.string().transform(Number).refine(val => val > 0, {
    message: "Monthly investment must be greater than 0",
  }),
  rateOfInterest: z.string().transform(Number).refine(val => val > 0 && val <= 100, {
    message: "Rate of interest must be between 0 and 100",
  }),
  currentAge: z.string().transform(Number).refine(val => val >= 18 && val < 60, {
    message: "Current age must be between 18 and 59",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function NPSCalculator() {
  const [result, setResult] = useState<ReturnType<typeof calculateNPS> | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyInvestment: "",
      rateOfInterest: "",
      currentAge: "",
    },
  })

  function onSubmit(data: FormValues) {
    const result = calculateNPS({
      monthlyInvestment: data.monthlyInvestment,
      rateOfInterest: data.rateOfInterest,
      currentAge: data.currentAge,
    })
    setResult(result)
  }

  const handleClear = () => {
    form.reset()
    setResult(null)
  }

  const handleDownload = () => {
    // Implement download logic here
    console.log("Download")
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">NPS Calculator</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="monthlyInvestment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Investment</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="Enter monthly investment" {...field} />
                            <span className="absolute right-3 top-2.5">₹</span>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rateOfInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate Of Interest (P.A.)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="Enter interest rate" {...field} />
                            <span className="absolute right-3 top-2.5">%</span>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Age</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="Enter current age" {...field} />
                            <span className="absolute right-3 top-2.5">Y</span>
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

            {result && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Total</h3>
                      <p className="text-2xl">₹{result.total.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Invested</h3>
                      <p className="text-2xl">₹{result.invested.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Gain</h3>
                      <p className="text-2xl">₹{result.gain.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>Investment Amount</TableHead>
                        <TableHead>Interest Earned</TableHead>
                        <TableHead>Maturity Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.yearlyBreakdown.map((year) => (
                        <TableRow key={year.year}>
                          <TableCell>{year.year}</TableCell>
                          <TableCell>₹{year.investmentAmount.toLocaleString()}</TableCell>
                          <TableCell>₹{year.interestEarned.toLocaleString()}</TableCell>
                          <TableCell>₹{year.maturityAmount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

