"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ifscSchema, type IFSCFormValues } from "@/lib/validations/ifsc"

export function IFSCSearchForm() {
  const form = useForm<IFSCFormValues>({
    resolver: zodResolver(ifscSchema),
    defaultValues: {
      ifsc: "",
    },
  })

  function onSubmit(data: IFSCFormValues) {
    console.log(data)
    // Handle search logic here
  }

  function onClear() {
    form.reset()
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>IFSC Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="ifsc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search By IFSC:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter IFSC Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  Search
                </Button>
                <Button
                  type="button"
                  onClick={onClear}
                  className="flex-1 bg-orange-400 hover:bg-orange-500"
                >
                  Clear
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">
            Welcome to the IFSC verification page.
          </h2>
          <p className="text-muted-foreground">
            Use the search bar to find information about Your IFSC.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}