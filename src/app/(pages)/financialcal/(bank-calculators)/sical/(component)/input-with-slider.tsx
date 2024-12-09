import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface InputWithSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  symbol: string;
}

export function InputWithSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  symbol,
}: InputWithSliderProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-24"
        />
        <span className="text-sm font-medium">{symbol}</span>
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={min}
          max={max}
          step={step}
          className="flex-1"
        />
      </div>
    </div>
  );
}
