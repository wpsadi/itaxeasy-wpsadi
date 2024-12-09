import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { GSTCalType } from "../page";

interface GSTTypeSelectProps {
  control: Control<GSTCalType>;
}

export function GSTTypeSelect({ control }: GSTTypeSelectProps) {
  return (
    <FormField
      control={control}
      name="gstType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>GST Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select GST type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="include">Including GST</SelectItem>
              <SelectItem value="exclude">Excluding GST</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
