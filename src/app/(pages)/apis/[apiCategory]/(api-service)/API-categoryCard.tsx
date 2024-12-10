import Image from "next/image";
import Link from "next/link";

import { APICategoryData } from "@/services/apis-section/listCategoryQuery";

export const APICategoryCard = ({
  element,
  currentCategory,

}: {
  element: APICategoryData,
    currentCategory: string,

}) => {
  return (
    <>
      <Link key={element.id} href={element.path}>
        <div
            
          className={`h-28 w-36 flex md:items-center justify-center px-5 border-b-4 mx-3 cursor-pointer text-nowrap ${
            currentCategory === element.id
              ? "border-primary fill-primary text-primary"
              : "border-white fill-zinc-500 text-zinc-500"
          }`}
        >
          <div className="flex flex-col text-center items-center">
          {element.icon === undefined ? (
                  <Image width={30} height={30} src={element.src || "/loading.svg"} alt="icon" />
                ) : (
                  <span className="object-contain h-9 w-9">{element.icon}</span>
                )}

            <p className="font-semibold mt-5">{element.title}</p>
          </div>
        </div>
      </Link>
    </>
  );
};
