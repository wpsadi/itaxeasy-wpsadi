"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Head } from "./Head";

const stateCodeMapping = [
  { code: "01", name: "Jammu & Kashmir" },
  { code: "02", name: "Himachal Pradesh" },
  { code: "03", name: "Punjab" },
  { code: "04", name: "Chandigarh" },
  { code: "05", name: "Uttarakhand" },
  { code: "06", name: "Haryana" },
  { code: "07", name: "Delhi" },
  { code: "08", name: "Rajasthan" },
  { code: "09", name: "Uttar Pradesh" },
  { code: "10", name: "Bihar" },
  { code: "11", name: "Sikkim" },
  { code: "12", name: "Arunachal Pradesh" },
  { code: "13", name: "Nagaland" },
  { code: "14", name: "Manipur" },
  { code: "15", name: "Mizoram" },
  { code: "16", name: "Tripura" },
  { code: "17", name: "Meghalaya" },
  { code: "18", name: "Assam" },
  { code: "19", name: "West Bengal" },
  { code: "20", name: "Jharkhand" },
  { code: "21", name: "Odisha" },
  { code: "22", name: "Chhattisgarh" },
  { code: "23", name: "Madhya Pradesh" },
  { code: "24", name: "Gujarat" },
  { code: "25", name: "Daman and Diu" },
  { code: "26", name: "Dadra and Nagar Haveli" },
  { code: "27", name: "Maharashtra" },
  { code: "28", name: "Andhra Pradesh" },
  { code: "29", name: "Karnataka" },
  { code: "30", name: "Goa" },
  { code: "31", name: "Lakshadweep" },
  { code: "32", name: "Kerala" },
  { code: "33", name: "Tamil Nadu" },
  { code: "34", name: "Puducherry" },
  { code: "35", name: "Andaman & Nicobar Islands" },
  { code: "36", name: "Telangana" },
  { code: "37", name: "Andhra Pradesh (New)" },
];

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
    setMessage(
      `Searching for PAN: ${data.pan}, State Code: ${data.gstStateCode}`
    );
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* PAN Field */}
                <FormField
                  control={form.control}
                  name="pan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PAN Of Tax Payer</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter PAN Of The Tax Payer"
                          {...field}
                        />
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
                            {stateCodeMapping.map((state) => (
                              <SelectItem key={state.code} value={state.code}>
                                {state.name}
                              </SelectItem>
                            ))}
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

            {message && (
              <p className="mt-4 text-blue-500 font-semibold">{message}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
