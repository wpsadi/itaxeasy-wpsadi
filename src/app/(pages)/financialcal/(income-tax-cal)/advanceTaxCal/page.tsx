"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { calculateAdvanceTax, type TaxPayerType } from "./(lib)/advance"

const taxPayerTypes: TaxPayerType[] = [
  "Individual",
  "HUF",
  "AOP/BOI",
  "Domestic Company",
  "Foreign Company",
  "Firms",
  "LLP",
  "Co-operative Society",
]

const formSchema = z.object({
  panNo: z.string().min(10).max(10),
  taxPayerType: z.enum(taxPayerTypes as [string, ...string[]]),
  section115BAC: z.enum(["Yes", "No"]),
  netTaxableIncome: z.string().transform(Number),
  relief: z.string().transform(Number),
  tdsCredit: z.string().transform(Number),
})

type FormValues = z.infer<typeof formSchema>

export default function AdvanceTaxCalculator() {
  const [result, setResult] = useState<ReturnType<typeof calculateAdvanceTax> | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      panNo: "",
      taxPayerType: "Individual",
      section115BAC: "No",
      netTaxableIncome: "",
      relief: "",
      tdsCredit: "",
    },
  })

  function onSubmit(data: FormValues) {
    const result = calculateAdvanceTax({
      panNo: data.panNo,
      taxPayerType: data.taxPayerType as TaxPayerType,
      section115BAC: data.section115BAC === "Yes",
      netTaxableIncome: data.netTaxableIncome,
      relief: data.relief,
      tdsCredit: data.tdsCredit,
    })
    setResult(result)
  }

  const handleReset = () => {
    form.reset()
    setResult(null)
  }

  const handleExportExcel = () => {
    // Implement Excel export logic
    console.log("Export to Excel")
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div>
              ADVANCE TAX CALCULATOR
              <div className="text-sm font-normal text-muted-foreground">
                FY 2023-2024 Old Regime
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="panNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN No.</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxPayerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Payer</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tax payer type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {taxPayerTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="section115BAC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whether opting for taxation under Section 115BAC?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="netTaxableIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Taxable Income</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="relief"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relief</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tdsCredit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TDS/TCS/MAT (AMT) Credit Utilized</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Calculate
                </Button>
                <Button type="button" variant="destructive" onClick={handleReset} className="flex-1">
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div>Advance Tax liability</div>
                <Button variant="outline" onClick={handleExportExcel}>
                  Export Excel
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Advance Tax liability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Advance tax payable upto June 15, 2024 (Cumulative)</TableCell>
                    <TableCell className="text-right">{result.advanceTaxLiability.june.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Advance tax payable upto September 15, 2024 (Cumulative)</TableCell>
                    <TableCell className="text-right">{result.advanceTaxLiability.september.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Advance tax payable upto December 15, 2024 (Cumulative)</TableCell>
                    <TableCell className="text-right">{result.advanceTaxLiability.december.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Advance tax payable upto March 15, 2025 (Cumulative)</TableCell>
                    <TableCell className="text-right">{result.advanceTaxLiability.march.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div>Advance Tax Installments</div>
                <Button variant="outline" onClick={handleExportExcel}>
                  Export Excel
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Advance Tax Installments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>First installment payable for the period April 1, 2024 to June 15, 2024</TableCell>
                    <TableCell className="text-right">{result.installments.first.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Second installment payable for the period June 16, 2024 to September 15, 2024</TableCell>
                    <TableCell className="text-right">{result.installments.second.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Third installment payable for the period September 16, 2024 to December 15, 2024</TableCell>
                    <TableCell className="text-right">{result.installments.third.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Last installment payable for the period December 16, 2024 to March 15, 2025</TableCell>
                    <TableCell className="text-right">{result.installments.fourth.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}