"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useAadhaarPanLink } from "@/services/easy-services/aadhar/aadhar-link-verification";

const formSchema = z.object({
  pan: z.string().min(10, "PAN number must be 10 characters").max(10),
  aadhaar: z.string().min(12, "Aadhaar number must be 12 digits").max(12),
});

export default function PanAadhaarStatus() {
  const aadharPanLinkMutation = useAadhaarPanLink();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pan: "",
      aadhaar: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    aadharPanLinkMutation.mutate(values);
  }

  function onClear() {
    form.reset();
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-6 border-l-4 border-blue-500 pl-3">
            Check Pan Aadhaar Status
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="pan"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  PAN No.
                </label>
                <input
                  {...form.register("pan")}
                  disabled={aadharPanLinkMutation.isPending}
                  id="pan"
                  placeholder="Enter PAN No."
                  className="w-full p-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.formState.errors.pan && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.pan.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="aadhaar"
                  className="block text-sm font-medium text-gray-700  mb-1"
                >
                  Aadhaar No.
                </label>
                <input
                  {...form.register("aadhaar")}
                  id="aadhaar"
                  disabled={aadharPanLinkMutation.isPending}
                  placeholder="Enter Aadhaar No."
                  className="w-full p-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.formState.errors.aadhaar && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.aadhaar.message}
                  </p>
                )}
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  disabled={aadharPanLinkMutation.isPending}
                  className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {aadharPanLinkMutation.isPending ? "Searching..." : "Search"}
                </button>
                <button
                  type="button"
                  onClick={onClear}
                  className="px-8 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors"
                >
                  clear
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex-1 bg-gray-100 p-8 rounded-lg">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">
              Welcome to the verification page.
            </h2>
            <p className="text-gray-600 text-center">
              Use the search bar to find information about Aadhaar and Pan Link
              status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
