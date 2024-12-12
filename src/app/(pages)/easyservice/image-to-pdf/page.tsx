"use client"; // Correct directive with a space
import "react-toastify/dist/ReactToastify.css";

import jsPDF from "jspdf"; // Library to generate PDFs
import { MinusCircle, UploadIcon } from "lucide-react"; // Icon library
import React, { useState } from "react";
import { toast } from "react-toastify"; // React Toast

import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { Button } from "@/components/ui/button"; // shadcn button

type ImageWithUniqueId = {
  file: File;
  id: string;
};

export default function Page() {
  const [images, setImages] = useState<ImageWithUniqueId[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files).map((file) => ({
        file,
        id: `${file.name}-${Date.now()}`, // Ensure unique ID for each image
      }));
      setImages((prevImages) => [...prevImages, ...uploadedFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleGeneratePDF = async () => {
    if (images.length === 0) {
      toast.error(
        "Please upload at least one image before generating the PDF."
      );
      return;
    }

    const pdf = new jsPDF();

    for (let i = 0; i < images.length; i++) {
      const { file } = images[i];
      const reader = new FileReader();

      const imgData = await new Promise<string>((resolve, reject) => {
        reader.onload = (e) => {
          if (e.target?.result) resolve(e.target.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const img = new Image();
      await new Promise<void>((resolve) => {
        img.onload = () => {
          const imgWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (img.height * imgWidth) / img.width;

          if (i > 0) pdf.addPage();
          pdf.addImage(img, "JPEG", 0, 0, imgWidth, imgHeight);
          resolve();
        };
        img.src = imgData;
      });
    }

    pdf.save("images.pdf"); // Automatically triggers download
    toast.success("PDF generated and downloaded successfully!");
  };

  return (
    <>
      <HomeNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-2xl font-semibold text-blue-600 mb-6">
          Convert your Images to PDF
        </h1>

        {/* Upload Section */}
        <div className="border-dashed p-10 border-2 border-blue-500 rounded-lg w-96 min-h-[10rem] flex flex-col items-center justify-center space-y-2">
          {images.length > 0 ? (
            <>
              <ul className="list-disc">
                {images.map(({ file, id }, index) => (
                  <li
                    key={id}
                    className="flex items-center justify-between text-gray-700"
                  >
                    {file.name}
                    <MinusCircle
                      className="w-5 h-5 text-red-500 cursor-pointer ml-2"
                      onClick={() => handleRemoveImage(index)}
                    />
                  </li>
                ))}
              </ul>
              <UploadIcon className="w-8 h-8 text-blue-500" />
              <label
                htmlFor="image-upload"
                className="text-blue-500 cursor-pointer"
              >
                Add more Images
              </label>
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </>
          ) : (
            <>
              <UploadIcon className="w-8 h-8 text-blue-500" />
              <label
                htmlFor="image-upload"
                className="text-blue-500 cursor-pointer"
              >
                Browse Images to Upload
              </label>
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </>
          )}
        </div>

        {/* Generate PDF Button */}
        <Button
          className="mt-4 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
          onClick={handleGeneratePDF}
          disabled={images.length === 0}
        >
          Generate PDF
        </Button>
      </div>
      <HomeFooter />
    </>
  );
}
