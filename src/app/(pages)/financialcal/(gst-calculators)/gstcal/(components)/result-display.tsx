import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ResultDisplayProps {
  label: string
  value: number | null
}

export function ResultDisplay({ label, value }: ResultDisplayProps) {
  return (
    <div className="space-y-2">
      <Label>{label} (₹)</Label>
      <Input
        type="number"
        value={value !== null ? value.toFixed(2) : ""}
        readOnly
      />
    </div>
  )
}

