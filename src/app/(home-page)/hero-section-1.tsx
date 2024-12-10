"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Typewriter from "typewriter-effect";

import { Button } from "@/components/ui/button";

import { HomeType } from "../../services/page/root/homePage/homeNavQuery";

export const HomeHeroSection1 = ({ pageData }: { pageData: HomeType }) => {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-7xl grid lg:grid-cols-2 items-center gap-y-8 my-28">
      <div className="lg:order-2 mx-auto">
        {/* <Video src="/ITR.mp4" /> */}
        <Image
          unoptimized
          src="/Hero-ITR.gif"
          loading="eager"
          width={700}
          height={500}
          alt="ITR"
        />
      </div>
      <div className="lg:w-full lg:pl-16 lg:mx-0 mt-5 lg:mt-0 text-center lg:text-left">
        <h1 className="text-lg lg:text-[32px] font-bold text-slate-800 leading-snug">
          <Typewriter
            options={{
              strings: [`${pageData.upper.mainHeading}`],
              autoStart: true,
              loop: true,
              deleteSpeed: 3,
            }}
          />
        </h1>
        <p className="font-semibold text-slate-800 mt-3">
          {pageData.upper.subHeading}
        </p>

        <Button
          className="my-4 font-medium py-[10px] text-xl bg-primary hover:bg-blue-600"
          onClick={() =>
            router.push("/dashboard/itr/itr-filling/upload-form-16")
          }
        >
          {pageData.upper.button}
        </Button>
      </div>
    </div>
  );
};
