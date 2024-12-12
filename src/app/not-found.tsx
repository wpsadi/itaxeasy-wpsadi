import Image from "next/image";
import Link from "next/link";

import HomeFooter from "@/components/common/HomeFooter";
import { HomeNavbar } from "@/components/common/HomeNavbar";
import { Button } from "@/components/ui/button";

const quotes = [
  "Failure is simply the opportunity to begin again, this time more intelligently. - Henry Ford",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The only real mistake is the one from which we learn nothing. - Henry Ford",
  "Failure is so important. We speak about success all the time. It is the ability to resist failure or use failure that often leads to greater success. - J.K. Rowling",
  "I have not failed. I've just found 10,000 ways that won't work. - Thomas A. Edison",
];

export default function NotFound() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <>
      <HomeNavbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Oops! Page Not Found
          </h2>
          <Image
            src="/sad-dog.svg"
            alt="Sad dog face"
            width={200}
            height={200}
            className="mx-auto mb-6"
          />
          <p className="text-xl text-gray-600 mb-8">{randomQuote}</p>
          <Button asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}
