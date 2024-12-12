"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
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

import { Head } from "./Head";

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
    <div className="m-10">
      <Head text="Search By IFSC"></Head>

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
          {
              ifsSearchMutation.isSuccess && (
                <div className="p-10">
                  <Card>
                    <CardContent>
                      <h2 className="text-2xl font-bold mb-2">Search Results</h2>
                      <p className="text-muted-foreground">                      <div>
                        <p><strong>MICR:</strong> {ifsSearchMutation.data?.data?.MICR}</p>
                        <p><strong>Branch:</strong> {ifsSearchMutation.data?.data?.BRANCH}</p>
                        <p><strong>Address:</strong> {ifsSearchMutation.data?.data?.ADDRESS}</p>
                        <p><strong>State:</strong> {ifsSearchMutation.data?.data?.STATE}</p>
                        <p><strong>Contact:</strong> {ifsSearchMutation.data?.data?.CONTACT || "N/A"}</p>
                        <p><strong>UPI:</strong> {ifsSearchMutation.data?.data?.UPI ? "Yes" : "No"}</p>
                        <p><strong>RTGS:</strong> {ifsSearchMutation.data?.data?.RTGS ? "Yes" : "No"}</p>
                        <p><strong>City:</strong> {ifsSearchMutation.data?.data?.CITY}</p>
                        <p><strong>Centre:</strong> {ifsSearchMutation.data?.data?.CENTRE}</p>
                        <p><strong>District:</strong> {ifsSearchMutation.data?.data?.DISTRICT}</p>
                        <p><strong>NEFT:</strong> {ifsSearchMutation.data?.data?.NEFT ? "Yes" : "No"}</p>
                        <p><strong>IMPS:</strong> {ifsSearchMutation.data?.data?.IMPS ? "Yes" : "No"}</p>
                        <p><strong>SWIFT:</strong> {ifsSearchMutation.data?.data?.SWIFT || "N/A"}</p>
                        <p><strong>ISO3166:</strong> {ifsSearchMutation.data?.data?.ISO3166}</p>
                        <p><strong>Bank:</strong> {ifsSearchMutation.data?.data?.BANK}</p>
                        <p><strong>Bank Code:</strong> {ifsSearchMutation.data?.data?.BANKCODE}</p>
                        <p><strong>IFSC:</strong> {ifsSearchMutation.data?.data?.IFSC}</p>
                      </div>
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )
            }
    </div>
  );
}
