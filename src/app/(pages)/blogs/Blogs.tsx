"use client";

import Image from "next/image";
import React from "react";

import { useBlogsQuery } from "@/services/Blogs/getBlogsQuery";

import { BlogPagination } from "./BlogPagination";
import { BlogSidebar } from "./BlogSidebar";
import { ShowBlogs } from "./BlogsRenderer";

const Blogs = () => {
  const [page, setPage] = React.useState(1);
  const BlogsQuery = useBlogsQuery({
    limit: 6,
  });

  return (
    <>
      <div className="container mx-auto flex flex-row flex-wrap py-6">
        {/* Posts Section */}
        <>
          <div className="w-full md:w-2/3">
            {BlogsQuery.isPending ? (
              <div className="fixed w-full md:2/3 bg-white flex items-center justify-center">
                <Image
                  src="/loading.svg"
                  alt="loading..."
                  width={100}
                  height={100}
                />
              </div>
            ) : (
              <section className="w-full flex flex-col items-center px-3">
                
                  {BlogsQuery.data?.pages.map((response, index) => {
                    const pageIndex = index + 1;
                    return (
                      // ${pageIndex !== (BlogsQuery.data?.pageParams?.length || 0) && "hidden"}
                      <span key={pageIndex} className={`grid sm:grid-cols-2 gap-4 ${pageIndex!==page && "hidden"}`}>
                        <ShowBlogs blogs={response.data} />
                      </span>
                    );
                  })}
                

                {/* Pagination */}
              </section>
            )}
          </div>
          {/* Sidebar Section  */}
          <BlogSidebar />
        </>
      </div>
      <BlogPagination paginator={BlogsQuery} page={page} setPage={setPage}/>
    </>
  );
};

export default Blogs;
