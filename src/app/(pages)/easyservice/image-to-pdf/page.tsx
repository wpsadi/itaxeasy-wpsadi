"use client"; // Correct directive with a space

import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn button
import { UploadIcon } from "lucide-react"; // Icon library

export default function Page() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleGeneratePDF = () => {
    if (!image) {
      alert("Please upload an image before generating the PDF.");
      return;
    }
    // Add logic to convert image to PDF
    alert("PDF generated successfully!");
  };

  return (
    <>
      <HomeNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-2xl font-semibold text-blue-600 mb-6">
          Convert your Images to PDF
        </h1>

        {/* Upload Section */}
        <div className="border-dashed border-2 border-blue-500 rounded-lg w-96 h-40 flex flex-col items-center justify-center space-y-2 p-4">
          {image ? (
            <p className="text-gray-700">{image.name}</p>
          ) : (
            <>
              <UploadIcon className="w-8 h-8 text-blue-500" />
              <label
                htmlFor="image-upload"
                className="text-blue-500 cursor-pointer"
              >
                Browse Image to Upload
              </label>
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </>
          )}
        </div>

        {/* Generate PDF Button */}
        <Button
          className="mt-4 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
          onClick={handleGeneratePDF}
          disabled={!image}
        >
          Generate PDF
        </Button>
      </div>
      <HomeFooter />
    </>
  );
}
