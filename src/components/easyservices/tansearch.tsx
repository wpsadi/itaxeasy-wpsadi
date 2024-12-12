"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useEasySearchTan } from "@/services/easy-services/income-tax/srch-tan";
import Card from "@/styles/cardStyles";

import { CardContent } from "../ui/card";
import { Head } from "./Head";

const formSchema = z.object({
  tan: z.string().min(1, "TAN number is required"),
});

export default function TanSearch() {
  
  const tanSearchMutation = useEasySearchTan();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tan: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    tanSearchMutation.mutate(values.tan);
  }

  function onClear() {
    form.reset();
  }

  return (
    <div className="m-10">
      <Head text="Search Tan Details"></Head>

      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex gap-8 p-10">
          <div className="flex-1">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="tan"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Search By TAN:
                  </label>
                  <input
                    {...form.register("tan")}
                    id="tan"
                    disabled={tanSearchMutation.isPending}
                    placeholder="Enter TAN Number"
                    className="w-full p-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {form.formState.errors.tan && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.tan.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={tanSearchMutation.isPending}
                    className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    {tanSearchMutation.isPending ? "Searching..." : "Search"}
                  </button>
                  <button
                    type="button"
                    onClick={onClear}
                    className="px-8 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
          {tanSearchMutation.isSuccess && tanSearchMutation?.data?.success}
          <div className="flex-1 bg-gray-100 p-8 rounded-lg">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">
                Welcome to the Tan verification page.
              </h2>
              <p className="text-gray-600">
                Use the search bar to find information about Tan Number.
              </p>
            </div>
          </div>
        </div>
        {tanSearchMutation.isSuccess && (
          <div className="p-10">
            <Card>
              <CardContent>
                <h2 className="text-2xl font-bold mb-2">Search Results</h2>
                <p className="text-muted-foreground">
                    {tanSearchMutation.data && (
                    <div>
                      <h3 className="text-xl font-semibold">Header</h3>
                      <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(tanSearchMutation.data.data.header, null, 2)}</pre>
                      <h3 className="text-xl font-semibold mt-4">Messages</h3>
                      {/* <ul className="list-disc pl-5">
                      {tanSearchMutation.data.data.messages.map((message, index) => (
                        <li key={index}>
                        <p>Code: {message.code}</p>
                        <p>Type: {message.type}</p>
                        <p>Description: {message.desc}</p>
                        </li>
                      ))}
                      </ul> */}
                      {tanSearchMutation.data.data.nameOrgn && (
                      <div className="mt-4">
                        <h3 className="text-xl font-semibold">Organization Details</h3>
                        <p>Name: {tanSearchMutation.data.data.nameOrgn}</p>
                        <p>Address Line 1: {tanSearchMutation.data.data.addLine1}</p>
                        <p>Address Line 2: {tanSearchMutation.data.data.addLine2}</p>
                        <p>Address Line 3: {tanSearchMutation.data.data.addLine3}</p>
                        <p>Address Line 4: {tanSearchMutation.data.data.addLine4}</p>
                        <p>Address Line 5: {tanSearchMutation.data.data.addLine5}</p>
                        <p>State Code: {tanSearchMutation.data.data.stateCd}</p>
                        <p>PIN: {tanSearchMutation.data.data.pin}</p>
                        <p>Phone Number: {tanSearchMutation.data.data.phoneNum}</p>
                        <p>Date of TAN Allotment: {tanSearchMutation.data.data.dtTanAllotment}</p>
                        <p>Email ID 1: {tanSearchMutation.data.data.emailId1}</p>
                        <p>Email ID 2: {tanSearchMutation.data.data.emailId2}</p>
                      </div>
                      )}
                    </div>
                    )}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
