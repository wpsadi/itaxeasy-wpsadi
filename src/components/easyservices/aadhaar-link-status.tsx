"use client";

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

export function CheckAadhaarLinkStatus() {
  // Remove the commented-out code to keep the UI for now

  // For now, pass an empty object or a mock object, 
  // but later integrate react-hook-form as needed
  const form: any = {}; // A placeholder for now

  return (
    <div className="grid p-10 gap-5 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Search By IFSC</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form tag with no react-hook-form logic for now */}
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                name="AadhaarNo."
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhaar No.</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Aadhaar No."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                name="PanNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your PAN Number"
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
  );
}