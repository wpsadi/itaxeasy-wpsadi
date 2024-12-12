"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useEasyBankAccountVerify } from "@/services/easy-services/easy-bank/verify-account";

// Zod schema for validation
const formSchema = z.object({
  accountNumber: z
    .string()
    .min(10, "Account number must be at least 10 digits")
    .max(12, "Account number must be at most 12 digits")
    .regex(/^\d+$/, "Account number must contain only digits"),
  ifscCode: z
    .string()
    .length(11, "IFSC code must be 11 characters")
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
  accountHolderName: z
    .string()
    .min(3, "Account holder name must be at least 3 characters")
    .max(100, "Account holder name cannot exceed 100 characters"),
  mobile: z
    .string()
    .length(10, "Mobile number must be 10 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
});

export default function VerificationOfBank() {
  const bankDetailsVerifyMutation = useEasyBankAccountVerify();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      mobile: "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values); // Process the form values here
    bankDetailsVerifyMutation.mutate(values);
  }

  // Handle clear action
  function onClear() {
    form.reset(); // Reset the form fields
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-6 border-l-4 border-blue-500 pl-3">
            Verify Account Details
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Account Number
                </label>
                <input
                  {...form.register("accountNumber")}
                  disabled={bankDetailsVerifyMutation.isPending}
                  id="accountNumber"
                  placeholder="Enter Account Number"
                  className="w-full p-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.formState.errors.accountNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.accountNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="ifscCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  IFSC Code
                </label>
                <input
                  {...form.register("ifscCode")}
                  id="ifscCode"
                  disabled={bankDetailsVerifyMutation.isPending}
                  placeholder="Enter IFSC Code"
                  className="w-full p-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.formState.errors.ifscCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.ifscCode.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="accountHolderName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Account Holder Name
                </label>
                <input
                  {...form.register("accountHolderName")}
                  disabled={bankDetailsVerifyMutation.isPending}
                  id="accountHolderName"
                  placeholder="Enter Account Holder Name"
                  className="w-full p-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.formState.errors.accountHolderName && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.accountHolderName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number
                </label>
                <input
                  {...form.register("mobile")}
                  disabled={bankDetailsVerifyMutation.isPending}
                  id="mobile"
                  placeholder="Enter Mobile Number"
                  className="w-full p-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.formState.errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.mobile.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  disabled={bankDetailsVerifyMutation.isPending}
                  className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                 {
                  bankDetailsVerifyMutation.isPending ? "Verifying..." : "Verify"
                 }
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

        {
          bankDetailsVerifyMutation.isSuccess && bankDetailsVerifyMutation?.data?.message
        }

        <div className="flex-1 bg-gray-100 p-8 rounded-lg">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">
              Welcome to the Account Verification Page.
            </h2>
            <p className="text-gray-600 text-center">
              Use the form to verify account details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
