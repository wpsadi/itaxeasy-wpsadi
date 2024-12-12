"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Head } from "./Head";

import { useEasySearchPAN } from "@/services/easy-services/gst-services/srch-pan";

import { Button } from "../ui/button";

const formSchema = z.object({
  pan: z.string().min(10, "PAN must be 10 characters").max(10),
  state: z.string().min(1, "Please select a state"),
});

const states = [
  { code: "01", name: "JAMMU AND KASHMIR" },
  { code: "02", name: "HIMACHAL PRADESH" },
  { code: "03", name: "PUNJAB" },
  { code: "04", name: "CHANDIGARH" },
  { code: "05", name: "UTTARAKHAND" },
  { code: "06", name: "HARYANA" },
  { code: "07", name: "DELHI" },
  { code: "08", name: "RAJASTHAN" },
  { code: "09", name: "UTTAR PRADESH" },
  { code: "10", name: "BIHAR" },
  { code: "11", name: "SIKKIM" },
  { code: "12", name: "ARUNACHAL PRADESH" },
  { code: "13", name: "NAGALAND" },
  { code: "14", name: "MANIPUR" },
];

export default function PANSearch() {
  const panSeachMutation = useEasySearchPAN();
  const {
    control,
    handleSubmit,
    reset: reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pan: "",
      state: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // panSeachMutation.mutate(data);
  };

  function onClear() {
    reset();
  }

  return (
    <div className="m-10">
    <Head text="Search By PAN"></Head>


    <div className="w-full max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-10">
        <div>
          <label
            htmlFor="pan"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            PAN Of Tax Payer
          </label>
          <Controller
            name="pan"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="pan"
                disabled={panSeachMutation.isPending}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter PAN Of The Tax Payer"
              />
            )}
          />
          {errors.pan && (
            <p className="text-red-500 text-sm mt-1">{errors.pan.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            GST State Code
          </label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="state"
                disabled={panSeachMutation.isPending}
                className="w-full p-2 border border-gray-300 rounded bg-white"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.code} - {state.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
          <div className="flex gap-4 my-3">
            <Button
              disabled={panSeachMutation.isPending}
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              {panSeachMutation.isPending ? "Searching..." : "Search"}
            </Button>
            <Button
              type="button"
              onClick={onClear}
              className="flex-1 bg-orange-400 hover:bg-orange-500"
            >
              Clear
            </Button>
          </div>
        </div>
        {panSeachMutation.isSuccess && panSeachMutation?.data?.message}
      </form>
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-2">
          Welcome to the TaxPayer search page.
        </h2>
        <p>
          Use the search bar to find information about taxpayers and their
          financial records.
        </p>
      </div>
    </div>
  </div>
  );
}
