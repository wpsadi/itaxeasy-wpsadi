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

import { useSearchPincode } from "@/services/easy-services/post-office/srchPincode";


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

  const pincodeMutation = useSearchPincode();

  const form = useForm<PincodeFormValues>({
    resolver: zodResolver(pincodeSchema),
    defaultValues: {
      pincode: "",
    },
  });

  function onSubmit(data: PincodeFormValues) {
    console.log(data);

    pincodeMutation.mutate(data.pincode);

    // Handle search logic here
  }

  function onClear() {
    form.reset();
  }

  return (
    <div className="grid p-10 gap-5 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Search By Pincode</CardTitle>
        </CardHeader>
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

                        disabled={pincodeMutation.isPending}
                       placeholder="Your Pincode" {...field} />

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

                 disabled={pincodeMutation.isPending}

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

      {
        // here is response data
        pincodeMutation.isSuccess && pincodeMutation?.data?.message
      }

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
  );
}
