"use client";

import { useParams } from "next/navigation";

export default function DownloadDetailPage() {
  const { slug } = useParams(); // Get the dynamic route parameter

  const getFileContent = () => {
    switch (slug) {
      case "form16":
        return <p>Details or download link for Form 16.</p>;
      case "gold&silverrate":
        return <p>Details or download link for Gold & Silver Rate.</p>;
      case "CostInflation":
        return <p>Details about the Cost Inflation Index.</p>;
      case "CountryCode":
        return <p>Details about Country Codes.</p>;
      default:
        return <p>File not found.</p>;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Download Details</h1>
      <div className="mt-4">{getFileContent()}</div>
    </div>
  );
}
