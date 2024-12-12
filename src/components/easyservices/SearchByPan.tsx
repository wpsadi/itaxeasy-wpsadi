"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Head } from "./Head";

// Validation schema using Zod
const PANFormSchema = z.object({
  pan: z
    .string()
    .length(10, "PAN must be exactly 10 characters")
    .regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN format"),
  gstStateCode: z.string().nonempty("Please select a state"),
});

type PANFormValues = z.infer<typeof PANFormSchema>;

export default function PANSearchForm() {
  const [message, setMessage] = useState("");

  const form = useForm<PANFormValues>({
    resolver: zodResolver(PANFormSchema),
    defaultValues: {
      pan: "",
      gstStateCode: "",
    },
  });

  const onSubmit = (data: PANFormValues) => {
    setMessage(`Searching for PAN: ${data.pan}, State Code: ${data.gstStateCode}`);
  };

  const onClear = () => {
    form.reset();
    setMessage("");
  };

  return (

    <div className="m-10">
    <Head text="PAN Of Tax Payer"></Head>


    <div className="grid p-10 gap-5 md:grid-cols-2">
      {/* Form Section */}
      <Card>
        <CardContent className="p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* PAN Field */}
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Of Tax Payer</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter PAN Of The Tax Payer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* GST State Code Field */}
              <FormField
                control={form.control}
                name="gstStateCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST State Code</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">Jammu & Kashmir</SelectItem>
                          <SelectItem value="02">Himachal Pradesh</SelectItem>
                          <SelectItem value="03">Punjab</SelectItem>
                          <SelectItem value="04">Chandigarh</SelectItem>
                          <SelectItem value="05">Uttarakhand</SelectItem>
                          {/* Add more state codes as needed */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
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

      {/* Welcome Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">
            Welcome to the TaxPayer search page.
          </h2>
          <p className="text-muted-foreground">
            Use the search bar to find information about taxpayers and their
            financial records.
          </p>
          {message && <p className="mt-4 text-blue-500 font-semibold">{message}</p>}
        </CardContent>
      </Card>
    </div>
  </div>

  );
}