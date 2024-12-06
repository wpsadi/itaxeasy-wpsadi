import React from "react";

import FormBrand from "../formBrand";
import { LoginForm } from "./loginForm";

function Page() {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 lg:bg-gray-100">
      <div className="grid gap-8 sm:place-content-center lg:grid-cols-2 mx-auto lg:container  py-4">
        <FormBrand />
        <div className="flex items-center justify-center">
        <LoginForm />
        </div>
      </div>
    </div>
    </>
  );
}

export default Page;
