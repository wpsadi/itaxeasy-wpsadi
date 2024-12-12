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
import { Head } from "./Head";

// Zod schema for validating Pincode
const pincodeSchema = z.object({
  pincode: z
    .string()
    .length(6, "Pincode must be exactly 6 digits")
    .regex(/^[0-9]{6}$/, "Pincode must only contain digits"),
});

// Type for the form values
type PincodeFormValues = z.infer<typeof pincodeSchema>;

export function PincodeSearchForm() {
  const form = useForm<PincodeFormValues>({
    resolver: zodResolver(pincodeSchema),
    defaultValues: {
      pincode: "",
    },
  });

  function onSubmit(data: PincodeFormValues) {
    console.log(data);
    // Handle search logic here
  }

  function onClear() {
    form.reset();
  }

  return (

    <div className="m-10">
    <Head text="Search By Pincode"></Head>


    <div className="grid p-10 gap-5 md:grid-cols-2">
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search By:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Pincode"
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
            Welcome to the Pincode search page.
          </h2>
          <p className="text-muted-foreground">
            Use the search bar to find information related to the given Pincode.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>

  );
}
