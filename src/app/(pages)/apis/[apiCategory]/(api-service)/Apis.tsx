"use client";
import axios from "axios";
import { isHttpError } from "http-errors";
import { useParams } from "next/navigation";
import React from "react";

import { ErrorPage } from "@/components/common/errorRaiser";
import { LoadingScreen } from "@/components/common/Loader";

import { useListAPICategory } from "../../../../../services/apis-section/listCategoryQuery";
import { APICategoryCard } from "./API-categoryCard";
import { ApiAvailableCardsRenderer } from "./apisAvailableCardsRenderer";

export default function Apis() {
  const params = useParams();
  const category = String(params.apiCategory) ?? "x";
  const apiListQuery = useListAPICategory();

  if (apiListQuery.isPending) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <LoadingScreen />
        </div>
      </>
    );
  }

  if (apiListQuery.isError) {
    const error = apiListQuery.error;
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message, "message");
      return (
        <div className="min-h-screen flex justify-center items-center">
          {error.response?.data.message ? (
            <ErrorPage message={error.response?.data.message} />
          ) : (
            <ErrorPage message="Something went wrong" />
          )}
        </div>
      );
    }
    if (isHttpError(error)) {
      return <ErrorPage message={error.message} />;
    }
    return <ErrorPage message="Something went wrong" />;
  }

  if (
    apiListQuery.isFetched &&
    apiListQuery.isSuccess &&
    apiListQuery.data.data.map((ele) => ele.id).includes(category) == false
  ) {
    return <ErrorPage message="Category not found" />;
  }

  const apiCategories = apiListQuery.data?.data;

  return (
    <div>
      {/* <AddServices user={user} /> */}
      <div className="flex items-center md:justify-center overflow-x-scroll md:overflow-auto mt-10 max-w-7xl mx-auto">
        {apiCategories.map((element, index) => (
          <APICategoryCard
            element={element}
            currentCategory={category}
            key={`${element}-${index + 1}`}
          />
        ))}
      </div>
      {apiListQuery.isFetched && apiListQuery.isSuccess && (
        <>
          <div className="mb-10 md:rounded-xl bg-gray-200 grid-rows-1 p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <ApiAvailableCardsRenderer category={category} />
          </div>
        </>
      )}
    </div>
  );
}
