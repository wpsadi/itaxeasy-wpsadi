"use client";

import { UploadIcon } from "lucide-react";
import { PDFDocument } from "pdf-lib"; // Ensure pdf-lib is installed
import { useState } from "react";

import { Button } from "@/components/ui/button"; // ShadCN button

export default function MergePDFComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      const pdfFiles = uploadedFiles.filter(
        (file) => file.type === "application/pdf"
      );
      setFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
    }
  };

  const handleMergePDFs = async () => {
    if (files.length < 2) {
      alert("Please upload at least two PDF files to merge.");
      return;
    }

    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("An error occurred while merging the PDFs.");
    } finally {
      setIsMerging(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold text-blue-600 mb-6">
        Merge PDF Files
      </h1>

      {/* Upload Section */}
      <div className="border-dashed border-2 border-gray-400 rounded-lg w-96 h-48 flex flex-col items-center justify-center space-y-2 p-4">
        <UploadIcon className="w-8 h-8 text-blue-500" />
        <label htmlFor="file-upload" className="text-blue-500 cursor-pointer">
          Drag & drop files to upload
        </label>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="application/pdf"
          multiple
          onChange={handleFileUpload}
        />
        <p className="text-gray-500 text-sm">Only PDF files are supported</p>
      </div>

      {/* Uploaded Files */}
      <div className="mt-4 w-96 space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-sm"
          >
            <span className="text-sm text-gray-700 truncate max-w-[75%]">
              {file.name}
            </span>
            <button
              onClick={() => handleRemoveFile(index)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Merge Button */}
      <Button
        className="mt-4 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
        onClick={handleMergePDFs}
        disabled={files.length < 2 || isMerging}
      >
        {isMerging ? "Merging..." : "Merge PDFs"}
      </Button>
    </div>
  );
}
