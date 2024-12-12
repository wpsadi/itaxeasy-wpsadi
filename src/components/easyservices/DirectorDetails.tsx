"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEasySearchDirector } from "@/services/easy-services/company/company-director-details";

import { Head } from "./Head";

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
  const directorSrchMutation = useEasySearchDirector();

  const form = useForm<DinFormValues>({
    resolver: zodResolver(dinSchema),
    defaultValues: {
      din: "",
    },
  });

  function onSubmit(data: DinFormValues) {
    console.log(data);

    directorSrchMutation.mutate(data.din);

    // Handle search logic here
  }

  function onClear() {
    form.reset();
  }

  return (
    <div className="m-10">
      <Head text="Company Director Details"></Head>

      <div className="grid p-10 gap-5 md:grid-cols-2">
        <Card>
          <CardContent className="p-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="din"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DIN Number:</FormLabel>
                      <FormControl>
                        <Input
                          disabled={directorSrchMutation.isPending}
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
                    disabled={directorSrchMutation.isPending}
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                  >
                    {directorSrchMutation.isPending ? "Searching..." : "Search"}
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
          // Add the search results component
          directorSrchMutation.isSuccess && directorSrchMutation.data?.message
        }

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">
              Welcome to the DIN search page.
            </h2>
            <p className="text-muted-foreground">
              Use the search bar to find information related to the given DIN
              number.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
