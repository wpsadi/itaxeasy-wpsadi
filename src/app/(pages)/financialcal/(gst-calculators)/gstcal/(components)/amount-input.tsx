import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { GSTCalType } from "../page";

interface AmountInputProps {
  control: Control<GSTCalType>;
}

export function AmountInput({ control }: AmountInputProps) {
  return (
    <FormField
      control={control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount (₹)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter amount"
              {...field}
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
