"use client";
import { ArrowBigRight, FileText } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { HomeType } from "@/services/page/root/homePage/homeNavQuery";
import { HoveringNavCard } from "@/styles/navcardStyle";

type ListServicesProps = {
  pageData: HomeType;
};

export const ListServices = ({ pageData }: ListServicesProps) => {
  const refs = useRef<Record<string, HTMLButtonElement | null | null>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeNav = useRef<HTMLDivElement | null>(null);

  return (
    <div className="max-w-7xl lg:px-12 mx-auto" ref={containerRef}>
      <div id="servicesNav">
        <ul
          className="my-12 px-3 py-3 text-sm mx-auto gap-2 flex flex-row overflow-hidden border md:rounded-lg shadow-sm rounded-md"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {pageData.navcards?.map(
            (element,index) =>
              element.name && (
                <HoveringNavCard
                  ref={(el) => {
                    refs.current[element.name] = el;
                  }}
                  key={`key ${element.name}-index-${index}`}
                  id={`nav${element.name}`}
                  onClick={() => {
                    const scrollDiv = document.getElementById(element.name);
                    if (scrollDiv) {
                      scrollDiv.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "center",
                      });
                      activeNav.current = scrollDiv as HTMLDivElement;
                    }
                  }}
                  className="flex text-slate-900 items-center justify-center w-4/6 font-semibold text-center cursor-pointer transition-transform-all transform transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:shadow-md rounded-full"
                >
                  {element.name}
                </HoveringNavCard>
              )
          )}
        </ul>
      </div>

      <div id="servicesSection" className="max-w-6xl mx-auto relative">
        {pageData.navcards?.map(
          (element,index) =>
            element.name &&
            element.link && (
              <div
                ref={(el) => {
                  cardRefs.current[element.name] = el;
                }}
                key={`key ${element.name}-index-${index}`}
                className="relative"
                id={element.name}
              >
                <h4 className="text-slate-800 text-lg lg:text-[32px] font-semibold text-center flex-wrap my-8">
                  {element.name}
                </h4>
          
                <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10">
                  {element?.cards?.map(
                    (items) =>
                      items.heading &&
                      items.content && (
                        <li
                          key={items.heading}
                          className="flex flex-col justify-between h-52 hover:translate-y-1 transition-all max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden border w-full"
                        >
                          <div className="flex items-center px-5 text-sm py-2 bg-primary text-white font-semibold rounded-t-lg">
                            <span className="pl-2">{items.heading}</span>
                          </div>
                          <p className="max-h-[100px] overflow-hidden line-clamp-4 text-xs px-5 font-medium text-justify">
                            <span className="bg-blue-100 rounded-full w-10 p-2 text-center mb-2 mt-2">
                              <FileText
                         
                                width={20}
                                className="ml-1"
                              />
                            
                            </span>
                            {items.content}
                          </p>
                          <div className="flex justify-end bg-zinc-100 px-5 gap-5 items-center">
                            <Link
                              href={element.link || ""}
                              target="_blank"
                              className="py-5 text-xs link hover:text-primary"
                            >
                              <span className="flex flex-row items-center gap-1">
                                Continue <ArrowBigRight />
                              </span>
                            </Link>
                          </div>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )
        )}
      </div>
    </div>
  );
};
