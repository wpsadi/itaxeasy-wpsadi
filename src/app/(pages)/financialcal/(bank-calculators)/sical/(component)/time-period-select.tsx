import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePeriodSelectProps {
  value: string;
  onChange: (value: "yearly" | "monthly" | "quarterly") => void;
}

export function TimePeriodSelect({ value, onChange }: TimePeriodSelectProps) {
  return (
    <div className="space-y-2">
      <Label>Select Time Period</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select time period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yearly">Yearly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="quarterly">Quarterly</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
