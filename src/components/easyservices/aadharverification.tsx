"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { Head } from "./Head";

import { useSendAadharOTP } from "@/services/easy-services/aadhar/sendAadharOTP";


// Zod schema for validating Aadhaar number
const aadhaarSchema = z.object({
  aadhaar: z
    .string()
    .length(12, "Aadhaar number must be exactly 12 digits long")
    .regex(/^[0-9]{12}$/, "Aadhaar number must contain only 12 digits"),
});

// Type for the form values
type AadhaarFormValues = z.infer<typeof aadhaarSchema>;

export function AadhaarSearchForm() {
  const aadhaarOTPMutation = useSendAadharOTP();

  const form = useForm<AadhaarFormValues>({
    resolver: zodResolver(aadhaarSchema),
    defaultValues: {
      aadhaar: "",
    },
  });

  function onSubmit(data: AadhaarFormValues) {
    console.log(data);

    aadhaarOTPMutation.mutate(data.aadhaar);
  }

  function onClear() {
    form.reset();
  }

  return (

    <div className="m-10">
      <Head text="Search By Aadhaar Number"></Head>

        <div className="grid p-10 gap-5 md:grid-cols-2">
        <Card>
          <CardContent className="p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="aadhaar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar Number:</FormLabel>
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
              Welcome to the Aadhaar search page.
            </h2>
            <p className="text-muted-foreground">
              Use the search bar to find information related to the given Aadhaar number.
            </p>
          </CardContent>
        </Card>
      </div>

   
    </div>
  );
}
