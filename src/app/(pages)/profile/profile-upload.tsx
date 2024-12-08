"use client";

import { useState } from "react";

import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function ProfileUpload() {
  const [fileName, setFileName] = useState<string>("");

  return (
    <FormItem>
      <FormLabel>UPLOAD PROFILE PHOTO</FormLabel>
      <div className="relative">
        <Input
          type="file"
          accept="image/*"
          className="cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setFileName(file ? file.name : "");
          }}
        />
      </div>
      {fileName && (
        <p className="text-sm text-muted-foreground mt-1">
          Selected: {fileName}
        </p>
      )}
    </FormItem>
  );
}
