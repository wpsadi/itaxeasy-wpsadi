import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  type: "aadhaar" | "pan" | "check" | "cross";
  verified: boolean;
  size?: "sm" | "default";
}

export function StatusBadge({
  type,
  verified,
  size = "default",
}: StatusBadgeProps) {
  const Icon = verified ? Check : X;
  const baseClass = "flex items-center rounded-full";
  const sizeClass = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <div
      className={cn(
        baseClass,
        sizeClass,
        verified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      )}
    >
      <Icon className={cn("mr-1", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      {type === "aadhaar" && "Aadhaar"}
      {type === "pan" && "Pan"}
      {type === "check" && "Verified"}
      {type === "cross" && "Not Linked"}
    </div>
  );
}
