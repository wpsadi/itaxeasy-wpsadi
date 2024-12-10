import Image from "next/image";
import Marquee from "react-fast-marquee";

import { HomeType } from "../../services/page/root/homePage/homeNavQuery";

export const HomeCorporatePartners = ({ pageData }: { pageData: HomeType }) => {
  const checkImageLink = (url: string) => {
    if (url && typeof url === "string" && url.includes("/")) {
      return url;
    } else {
      return "/images/home/ongoing_projects/upcoming.avif";
    }
  };
  return (
    <>
      <div className="max-w-7xl lg:px-8 mx-auto">
        <h3 className="text-center text-slate-900 text-3xl md:text-4xl font-extrabold">
          Corporate Partners
        </h3>
        <Marquee gradientWidth={50} speed={40} pauseOnHover={true}>
          <div className="mx-auto py-12 mb-20">
            <div className="grid grid-cols-6 mt-8">
              {pageData?.corporatePro.map((element, i) => (
                <div
                  key={`key ${element.heading + "-" + i}`}
                  className="flex flex-col hover:shadow-lg hover:shadow-primary  w-60 shadow-md rounded-lg mx-8 items-center overflow-hidden border"
                >
                  <div className="flex items-center py-5 h-full min-h-48">
                    <Image
                      width={200}
                      height={100}
                      alt="partners-logo"
                      src={checkImageLink(element.image)}
                    />
                  </div>
                  <div className="bg-zinc-100 w-full flex items-center px-5">
                    <span className="font-semibold text-sm mx-auto text-center py-3">
                      {element.heading}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Marquee>
      </div>
    </>
  );
};
