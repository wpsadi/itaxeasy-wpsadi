"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrackGSTFormValues, trackGSTSchema } from "@/validations/easyservices/trackgst";

// Generate financial years (last 5 years)
const currentYear = new Date().getFullYear();
const financialYears = Array.from({ length: 5 }, (_, i) => {
  const year = currentYear - i;
  return `${year}-${(year + 1).toString().slice(2)}`;
});

export function TrackGSTForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TrackGSTFormValues>({
    resolver: zodResolver(trackGSTSchema),
    defaultValues: {
      gstin: "",
      financialYear: "",
    },
  });

  async function onSubmit(data: TrackGSTFormValues) {
    setIsLoading(true);
    try {
      // Submit data to your API here
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClear() {
    form.reset();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Track GST Return</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="gstin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GSTN Of The Tax Payer</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter GSTN Of The Tax Payer"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="financialYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Financial Year</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose.." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {financialYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 pt-2">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Search
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleClear}
                disabled={isLoading}
              >
                Clear
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Welcome to the Track GST Return page.
          </h2>
          <p className="text-center text-muted-foreground">
            Use the search bar to find information GST Returns and their
            financial records.
          </p>
        </div>
      </div>
    </div>
  );
}
