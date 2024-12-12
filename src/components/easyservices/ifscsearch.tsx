"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

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
import { useEasySearchIFSC } from "@/services/easy-services/easy-bank/ifsc-srch";
import { IFSCFormValues, IFSCSchema } from "@/validations/easyservices/IFSCin";

export function IFSCSearchForm() {
  const ifsSearchMutation = useEasySearchIFSC();

  const form = useForm<IFSCFormValues>({
    resolver: zodResolver(IFSCSchema),
    defaultValues: {
      IFSC: "",
    },
  });

  function onSubmit(data: IFSCFormValues) {
    ifsSearchMutation.mutate(data.IFSC);

    // Handle search logic here
  }

  function onClear() {
    form.reset();
  }

  return (
    <div className="grid p-10 gap-5 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Search By IFSC</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="IFSC"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search By:</FormLabel>
                    <FormControl>
                      <Input
                        disabled={ifsSearchMutation.isPending}
                        placeholder="Your IFSC Identification Number"
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
                  disabled={ifsSearchMutation.isPending}
                >
                  {ifsSearchMutation.isPending ? "Searching..." : "Search"}
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

      {ifsSearchMutation.isSuccess && ifsSearchMutation?.data?.message}

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">
            Welcome to the TaxPayer search page.
          </h2>
          <p className="text-muted-foreground">
            Use the search bar to find information about taxpayers and their
            financial records.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
