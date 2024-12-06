import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

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
    <html lang="en">
      <Script src="https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js" />
      <body className={`${inter.className} text-slate-800`}>
        <div className="h-screen w-screen overflow-auto">
          <Toaster />
          <TanstackQuery>{children}</TanstackQuery>
        </div>
      </body>
    </html>
  );
}
