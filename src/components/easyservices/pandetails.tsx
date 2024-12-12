"use client";


import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEasyDetailsPAN } from "@/services/easy-services/income-tax/pan-details";
import { PANFormValues, panSchema } from "@/validations/easyservices/pan";

export function PANSearchForm() {
  const srchPanMutation = useEasyDetailsPAN();
  const form = useForm<PANFormValues>({
    resolver: zodResolver(panSchema),
    defaultValues: {
      pan: "",
    },
  });

  function onSubmit(data: PANFormValues) {
    srchPanMutation.mutate(data.pan);
    // Handle search logic here
  }

  function onClear() {
    form.reset();
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 p-10">
      <Card>
        <CardHeader>
          <CardTitle>PAN DETAILS</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pan Of Tax Payer :</FormLabel>
                    <FormControl>
                      <Input
                        disabled={srchPanMutation.isPending}
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
                  disabled={srchPanMutation.isPending}
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  {srchPanMutation.isPending ? "Searching..." : "Search"}
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
      {srchPanMutation.isSuccess && srchPanMutation?.data?.message}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">
            Welcome to the PAN verification page.
          </h2>
          <p className="text-muted-foreground">
            Use the search bar to find information about PAN.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
