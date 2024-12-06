import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import TanstackQuery from "@/helpers/tanstack-query";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="h-[100vh] w-[100vw] bg-white overflow-scroll">
        <TanstackQuery>{children}</TanstackQuery>
        </div>
        
      </body>
    </html>
  );
}
