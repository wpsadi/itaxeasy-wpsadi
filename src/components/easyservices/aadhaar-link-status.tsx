"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";

// Zod schema for validating Aadhaar and PAN numbers
const validationSchema = z.object({
  aadhaar: z
    .string()
    .length(12, "Aadhaar number must be exactly 12 digits long")
    .regex(/^[0-9]{12}$/, "Aadhaar number must contain only 12 digits"),
  pan: z
    .string()
    .length(10, "PAN number must be exactly 10 characters long")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN number is invalid"),
});

// Type for the form values
type FormValues = z.infer<typeof validationSchema>;

export function CheckAadhaarLinkStatus() {
  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      aadhaar: "",
      pan: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    // Handle search logic here
  }

  function onClear() {
    form.reset();
  }

  return (
    <div className="grid p-10 gap-5 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Check Aadhaar Link Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Aadhaar Number Field */}
              <FormField
                control={form.control}
                name="aadhaar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhaar No.</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Aadhaar number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PAN Number Field */}
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN No.</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your PAN number"
                        {...field}
                      />
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
            Welcome to the Aadhaar and PAN search page.
          </h2>
          <p className="text-muted-foreground">
            Use the search bar to find information related to Aadhaar and PAN numbers.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}