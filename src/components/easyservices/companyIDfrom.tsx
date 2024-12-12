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
import { useEasySearchCompanyID } from "@/services/easy-services/company/company-details";

// Zod schema for validating Company ID
const companyIdSchema = z.object({
  companyId: z
    .string()
    .length(10, "Company ID must be exactly 10 characters long")

    .regex(
      /^[A-Za-z0-9]+$/,
      "Company ID must only contain alphanumeric characters"
    ),
});

// Type for the form values
type CompanyIdFormValues = z.infer<typeof companyIdSchema>;

export function CompanyIDSearchForm() {
  const companySearchIDMutation = useEasySearchCompanyID();

  const form = useForm<CompanyIdFormValues>({
    resolver: zodResolver(companyIdSchema),
    defaultValues: {
      companyId: "",
    },
  });

  function onSubmit(data: CompanyIdFormValues) {
    console.log(data);

    companySearchIDMutation.mutate(data.companyId);

    // Handle search logic here
  }

  function onClear() {
    form.reset();
  }

  return (
    <div className="grid p-10 gap-5 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Search By Company ID</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company ID:</FormLabel>
                    <FormControl>
                      <Input
                        disabled={companySearchIDMutation.isPending}
                        placeholder="Enter Company ID"
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
                  disabled={companySearchIDMutation.isPending}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  {companySearchIDMutation.isPending
                    ? "Searching..."
                    : "Search"}
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
            Welcome to the Company ID search page.
          </h2>
          <p className="text-muted-foreground">
            Use the search bar to find information related to the given Company
            ID.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
