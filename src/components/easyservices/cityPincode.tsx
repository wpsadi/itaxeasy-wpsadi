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

import { useSearchCity } from "@/services/easy-services/post-office/srchCity";


// Zod schema for validating City name
const citySchema = z.object({
  city: z
    .string()
    .min(3, "City name must be at least 3 characters long")
    .max(50, "City name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "City name must only contain alphabets and spaces"),
});

// Type for the form values
type CityFormValues = z.infer<typeof citySchema>;

export function CitySearchForm() {
  const srchCityMutation = useSearchCity();

  const form = useForm<CityFormValues>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      city: "",
    },
  });

  function onSubmit(data: CityFormValues) {
    console.log(data);

    srchCityMutation.mutate(data.city);

    // Handle search logic here
  }

  function onClear() {
    form.reset();
  }

  return (
    
    <div className="grid p-10 gap-5 md:grid-cols-2">
      <Head text="Search By City"></Head>


    <div className="m-10">
      <Card>
        <CardContent className="p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City Name:</FormLabel>
                    <FormControl>
                      <Input
                        disabled={srchCityMutation.isPending}
                        placeholder="Enter City Name"
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
                  disabled={srchCityMutation.isPending}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  {srchCityMutation.isPending ? "Searching..." : "Search"}
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

      {
        // here is response data
        srchCityMutation.isSuccess && srchCityMutation?.data?.message
      }

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">
            Welcome to the City search page.
          </h2>
          <p className="text-muted-foreground">
            Use the search bar to find information related to the given City
            name.
          </p>
        </CardContent>
      </Card>
    </div>
    </div>

  );
}
