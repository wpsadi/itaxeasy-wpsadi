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

// Zod schema for validating DIN number
const dinSchema = z.object({
  din: z
    .string()
    .length(8, "DIN number must be exactly 8 characters long")
    .regex(/^\d+$/, "DIN number must only contain digits"),
});

// Type for the form values
type DinFormValues = z.infer<typeof dinSchema>;

export function DINSearchForm() {
  const form = useForm<DinFormValues>({
    resolver: zodResolver(dinSchema),
    defaultValues: {
      din: "",
    },
  });

  function onSubmit(data: DinFormValues) {
    console.log(data);
    // Handle search logic here
  }

  function onClear() {
    form.reset();
  }

  return (
    <div className="grid p-10 gap-5 md:grid-cols-2">
      <Card>
        <h1 className="p-5 text-2xl">Company Director Details</h1>
        <CardHeader>
          <CardTitle>Search By DIN</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="din"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DIN Number:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter DIN Number"
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
            Welcome to the DIN search page.
          </h2>
          <p className="text-muted-foreground">
            Use the search bar to find information related to the given DIN number.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}