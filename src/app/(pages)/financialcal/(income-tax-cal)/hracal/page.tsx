"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { calculateHRA } from "./(lib)/calculate-hra"

const formSchema = z.object({
  basicSalary: z.string().transform(Number),
  hraReceived: z.string().transform(Number),
  rentPaid: z.string().transform(Number),
  metroCity: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

export default function HRACalculator() {
  const [hraExemption, setHraExemption] = useState<number | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basicSalary: 0,
      hraReceived: 0,
      rentPaid: 0,
      metroCity: false,
    },
  })

  function onSubmit(data: FormValues) {
    const result = calculateHRA({
      basicSalary: data.basicSalary,
      hraReceived: data.hraReceived,
      rentPaid: data.rentPaid,
      cityType: data.metroCity,
    })
    setHraExemption(result)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    console.log("Download PDF")
  }

  const handleClear = () => {
    form.reset()
    setHraExemption(null)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">HRA Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="basicSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Basic Salary</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter basic salary" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hraReceived"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HRA Received</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter HRA received" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rentPaid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Paid</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter rent paid" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metroCity"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Metro City</FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Calculate
            </Button>
          </form>
        </Form>

        {hraExemption !== null && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-center font-medium">HRA Exemption</h3>
              <p className="text-center text-2xl font-bold text-blue-600">
                ₹{hraExemption.toFixed(2)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handlePrint} variant="outline">
                Print
              </Button>
              <Button onClick={handleDownloadPDF} variant="outline">
                Download PDF
              </Button>
            </div>
            <Button onClick={handleClear} variant="secondary" className="w-full">
              Clear
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
