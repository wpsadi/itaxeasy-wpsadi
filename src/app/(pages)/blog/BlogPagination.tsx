"use client";
import React from "react";

import { useBlogsQuery } from "../../../services/Blogs/getBlogsQuery";

interface PaginationProps {
  paginator: ReturnType<typeof useBlogsQuery>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const BlogPagination: React.FC<PaginationProps> = ({
  paginator,
  page,
  setPage,
}) => {
  return (
    <>
      <nav className="flex justify-center my-8">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              className=" cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={
                !paginator.hasPreviousPage || paginator.isFetchingPreviousPage
              }
              onClick={() => {
                console.log("pressed prev");
                paginator.fetchPreviousPage();
                setPage((prev) => prev - 1);
              }}
            >
              {paginator.hasPreviousPage ? "Prev" : "No More Blogs"}
            </button>
          </li>
          <li>
            <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300  hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              {page}
            </span>
          </li>
          <li>
            <button
              className=" cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                console.log("pressed next");
                paginator.fetchNextPage();
                setPage((prev) => prev + 1);
              }}
              disabled={!paginator.hasNextPage || paginator.isFetchingNextPage}
            >
              {paginator.hasNextPage ? "Next" : "No More Blogs"}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
