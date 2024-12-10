import Image from "next/image";
import Link from "next/link";

import { API_endpointDataUnderCategory } from "@/services/apis-section/allAPIInCategoryQuery";

export const APICard = ({

    element,
  
    category,
  
  }: {
  
    element: API_endpointDataUnderCategory;
  
    category: string;
  
  })=> 
(  <Link href={`/apis/${category}/${element.id}`}>
    <div className="flex hover:shadow-lg h-full hover:shadow-primary flex-col justify-start items-center py-8 px-3 bg-white shadow-md rounded-lg mx-8 md:mx-0 cursor-pointer">
      <Image
        className="w-[40px] object-cover rounded-lg"
        src={element.src}
        width={44}
        height={44}
        alt="icon"
      />

      <div>
        <p className="heading-6 text-center my-8 ">{element.title}</p>
        <p className="description text-justify mt-1">{element.description}</p>
      </div>
    </div>
  </Link>);
;
