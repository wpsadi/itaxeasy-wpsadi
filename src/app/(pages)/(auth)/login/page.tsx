import React from "react";

import FormBrand from "../formBrand";
import { LoginForm } from "./loginForm";

function Page() {
  return (
    <>
      <section className="bg-gray-50 min-h-screen w-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16 grid lg:grid-cols-2 items-center gap-8 lg:gap-16">
          {/* Left Section */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <FormBrand />
          </div>

          {/* Right Section */}
          <div className="w-full max-w-md mx-auto flex items-center justify-center lg:max-w-lg p-6 sm:p-8 rounded-lg shadow-lg">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
