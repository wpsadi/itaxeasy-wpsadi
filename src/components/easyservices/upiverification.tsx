"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  upiAddress: z.string().min(1, "UPI address is required"),
  name: z.string().min(1, "Name is required"),
});

export default function UPIVerification() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upiAddress: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onClear() {
    form.reset();
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-6 border-l-4 border-blue-500 pl-3">
            UPI Verification
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="upiAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  UPI Address
                </label>
                <input
                  {...form.register("upiAddress")}
                  id="upiAddress"
                  placeholder="Enter UPI address"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.formState.errors.upiAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.upiAddress.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  {...form.register("name")}
                  id="name"
                  placeholder="Enter Name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Search
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
              Welcome to the UPI varification search page.
            </h2>
            <p className="text-gray-600">
              Use the search bar to find information about UPI details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}