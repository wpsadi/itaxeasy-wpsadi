import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LoanInputsProps {
  control: Control<{
    loanAmount: number;
    interestRate: number;
    loanTenure: number;
  }>;
}

export function LoanInputs({ control }: LoanInputsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <FormField
        control={control}
        name="loanAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Loan Amount (₹)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter loan amount"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="interestRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Interest Rate (% p.a.)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter interest rate"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="loanTenure"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Loan Tenure (years)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter loan tenure"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
