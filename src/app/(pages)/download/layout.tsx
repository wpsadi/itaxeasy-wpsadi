"use client";

import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HomeNavbar/>
      <div className="bg-gray-200 min-h-screen">{children}</div>
      <HomeFooter />
    </div>
  );
}
