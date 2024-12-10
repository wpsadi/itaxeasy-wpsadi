import { Loader } from "lucide-react";
import React from "react";

import { useAllApiUnderCategory } from "@/services/apis-section/allAPIInCategoryQuery";

import { APICard } from "./apisCard";

export const ApiAvailableCardsRenderer = ({
  category,
}: {
  category: string;
}) => {
  const SpecificCategoryAPICards = useAllApiUnderCategory(category);

  if (SpecificCategoryAPICards.isPending) {
    return (
      <>
        <div className="h-full w-full flex justify-center items-center p-2">
          <Loader className="animate-spin" />
        </div>
      </>
    );
  }
  if (SpecificCategoryAPICards.isError) {
    return (
      <>
        <div className="h-full w-full flex justify-center items-center p-2">
          Error loading the page. Please try again later.
        </div>
      </>
    );
  }
  return (
    <>
      {SpecificCategoryAPICards.data?.data.map((element, index) => {

        return (<React.Fragment key={index}>
            <APICard element={element} category={category} />
        </React.Fragment>);
      })}
    </>
  );
};
