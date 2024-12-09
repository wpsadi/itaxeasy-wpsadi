import { EnsureNotAuthenticated } from "@/components/common/EnsureNotAuthenticated";
import { EnableGoogleAuth } from "@/components/common/GoogleAuthProvider";

import FormBrand from "./formBrand";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EnsureNotAuthenticated>
        <EnableGoogleAuth>
          {/* <div className="min-h-screen h-full w-full flex items-center justify-center bg-neutral-50 lg:bg-gray-100">
          <div className="flex flex-col lg:flex-row gap-8 sm:place-content-center mx-auto lg:container py-1">
            <FormBrand />
            <div className="flex items-center justify-center">{children}</div>
          </div>
        </div> */}

          <section className="bg-slate-50 min-h-screen flex items-center h-full overflow-auto">
            <div className="mx-auto max-w-screen-xl  grid lg:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <FormBrand />
              </div>
              <div>
                <div className="w-full lg:max-w-xl  space-y-8  bg-white rounded-lg shadow-xl dark:bg-gray-800">
                  {children}
                </div>
              </div>
            </div>
          </section>
        </EnableGoogleAuth>
      </EnsureNotAuthenticated>
    </>
  );
}
