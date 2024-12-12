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
import { useEasySearchGSTIN } from "@/services/easy-services/gst-services/Srch-gstin";
import { GSTINFormValues, gstinSchema } from "@/validations/easyservices/gstin";

import { Head } from "./Head";

export function GSTINSearchForm() {
  const gstSrchMutation = useEasySearchGSTIN();
  const form = useForm<GSTINFormValues>({
    resolver: zodResolver(gstinSchema),
    defaultValues: {
      gstin: "",
    },
  });

  function onSubmit(data: GSTINFormValues) {
    gstSrchMutation.mutate(data.gstin);
  }

  function onClear() {
    form.reset();
  }

  return (
    <div className="m-10">
      <Head text="Search By GSTIN"></Head>

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
                  name="gstin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Search By:</FormLabel>
                      <FormControl>
                        <Input
                          disabled={gstSrchMutation.isPending}
                          placeholder="Your GST Identification Number"
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
                    disabled={gstSrchMutation.isPending}
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                  >
                    {gstSrchMutation.isPending ? "Searching..." : "Search"}
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
          {/* here is response data */}
       
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
              gstSrchMutation.isSuccess && (
                <div className="p-10">
                  <Card>
                    <CardContent>
                      <h2 className="text-2xl font-bold mb-2">Search Results</h2>
                      <p className="text-muted-foreground">
                        <p><strong>Legal Name:</strong> {gstSrchMutation.data?.data?.data?.data?.lgnm}</p>
                        <p><strong>Trade Name:</strong> {gstSrchMutation.data?.data?.data?.data?.tradeNam}</p>
                        <p><strong>Principal Address:</strong> {gstSrchMutation.data?.data?.data?.data?.pradr.addr.bnm}, {gstSrchMutation.data?.data?.data?.data?.pradr.addr.loc}, {gstSrchMutation.data?.data?.data?.data?.pradr.addr.st}, {gstSrchMutation.data?.data?.data?.data?.pradr.addr.pncd}</p>
                        <p><strong>GSTIN:</strong> {gstSrchMutation.data?.data?.data?.data?.gstin}</p>
                        <p><strong>Status:</strong> {gstSrchMutation.data?.data?.data?.data?.sts}</p>
                        <p><strong>Nature of Business:</strong> {gstSrchMutation.data?.data?.data?.data?.pradr.ntr}</p>
                        <p><strong>Additional Addresses:</strong></p>
                        {gstSrchMutation.data?.data?.data?.data?.adadr.map((address, index) => (
                        <div key={index}>
                          <p><strong>Address {index + 1}:</strong> {address.bnm}, {address.loc}, {address.st}, {address.pncd}</p>
                        </div>
                        ))}
                        <p><strong>State Jurisdiction:</strong> {gstSrchMutation.data?.data?.data?.data?.stj}</p>
                        <p><strong>Central Jurisdiction:</strong> {gstSrchMutation.data?.data?.data?.data?.ctj}</p>
                        <p><strong>Last Update Date:</strong> {gstSrchMutation.data?.data?.data?.data?.lstupdt}</p>
                        <p><strong>Registration Date:</strong> {gstSrchMutation.data?.data?.data?.data?.rgdt}</p>
                        <p><strong>Cancellation Date:</strong> {gstSrchMutation.data?.data?.data?.data?.cxdt}</p>
                        <p><strong>E-invoice Status:</strong> {gstSrchMutation.data?.data?.data?.data?.einvoiceStatus}</p>
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )
            }
    </div>
  );
}
