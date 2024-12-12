"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { useEasyTrackGST } from "@/services/easy-services/gst-services/track-gst";
import {
  TrackGSTFormValues,
  trackGSTSchema,
} from "@/validations/easyservices/trackgst";

import { Head } from "./Head";

// Generate financial years (last 5 years)
const currentYear = new Date().getFullYear();
const financialYears = Array.from({ length: 5 }, (_, i) => {
  const year = currentYear - i;
  return `${year}-${(year + 1).toString().slice(2)}`;
});

export function TrackGSTForm() {
  const gstTrackMutation = useEasyTrackGST();

  const form = useForm<TrackGSTFormValues>({
    resolver: zodResolver(trackGSTSchema),
    defaultValues: {
      gstin: "",
      financialYear: "",
    },
  });

  async function onSubmit(data: TrackGSTFormValues) {
    console.log(data);
    // gstTrackMutation.mutate(data);
  }

  function handleClear() {
    form.reset();
  }

  return (
    <div className="m-10">
      <Head text="Track GST Return"></Head>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="gstin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GSTN Of The Tax Payer</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter GSTN Of The Tax Payer"
                        {...field}
                        disabled={gstTrackMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="financialYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Year</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={gstTrackMutation.isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose.." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {financialYears.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 pt-2">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={gstTrackMutation.isPending}
                >
                  {gstTrackMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Search
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleClear}
                  disabled={gstTrackMutation.isPending}
                >
                  Clear
                </Button>
              </div>
            </form>
          </Form>
        </div>
        {gstTrackMutation.isSuccess && gstTrackMutation?.data?.message}
        <div className="bg-gray-100 p-8 rounded-lg">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Welcome to the Track GST Return page.
            </h2>
            <p className="text-center text-muted-foreground">
              Use the search bar to find information GST Returns and their
              financial records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
