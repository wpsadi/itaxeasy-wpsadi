import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import { LoadUser } from "@/components/common/LoadUser";
import { Toaster } from "@/components/ui/toaster";
import TanstackQuery from "@/helpers/tanstack-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iTaxEasy",
  description:
    "India's Most Trusted Accounting And Financial Platform Continuing The Legacy Of Accounting Firm N.S. Bedi And Associates Since 1972.",
  facebook: { admins: "itaxeasy.accounting.9" },
  other: {
    instagram: "https://www.instagram.com/itaxeasy/",
    youtube: "https://www.youtube.com/@Itaxeasy",
    whatsapp: "https://wa.me/8770877270",
    linkedin: "https://in.linkedin.com/company/itaxeasy-pvt-limited",
  },
  icons: {
    icon: "/favicon.ico", // Default favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className={`${inter.className} text-slate-800 h-full`}>
        <div className="min-h-screen flex flex-col">
          <Toaster />
          <ToastContainer />

          <TanstackQuery>
            <LoadUser />
            {/* This is to load th user*/}
            {children}
          </TanstackQuery>
        </div>
      </body>
    </html>
  );
}
