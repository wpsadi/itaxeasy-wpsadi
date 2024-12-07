import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  children?: React.ReactNode;
  message?: string;
}

export function ErrorPage({
  children,
  message = "An error occurred",
}: ErrorPageProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <div className="mb-6">
          {children ? (
            children
          ) : (
            <p className="text-xl text-gray-700">{message}</p>
          )}
        </div>
        <div className="space-x-4">
          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
          <Button onClick={() => router.push("/")} variant="default">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
