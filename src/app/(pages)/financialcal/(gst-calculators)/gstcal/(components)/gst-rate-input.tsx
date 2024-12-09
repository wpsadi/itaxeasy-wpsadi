import { useState } from "react";
import { Control } from "react-hook-form";

import {
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

import { GSTCalType } from "../page";

interface GSTRateInputProps {
  control: Control<GSTCalType>;
}

export function GSTRateInput({ control }: GSTRateInputProps) {
  const [isCustomRate, setIsCustomRate] = useState(false);

  return (
    <FormField
      control={control}
      name="gstRate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>GST Rate (%)</FormLabel>
          <FormControl>
            {!isCustomRate ? (
              <Select
                onValueChange={(value) => {
                  if (value === "custom") {
                    setIsCustomRate(true);
                    field.onChange(0);
                  } else {
                    field.onChange(parseFloat(value));
                  }
                }}
                defaultValue={field.value.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select GST rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% (NIL)</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="12">12%</SelectItem>
                  <SelectItem value="18">18%</SelectItem>
                  <SelectItem value="28">28%</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                type="number"
                placeholder="Enter custom GST rate"
                {...field}
                onChange={(e) => {
                  field.onChange(parseFloat(e.target.value));
                  if (e.target.value === "") {
                    setIsCustomRate(false);
                  }
                }}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
