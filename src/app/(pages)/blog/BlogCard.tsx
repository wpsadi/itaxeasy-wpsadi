import { ChevronRightCircle, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { BlogData } from "@/services/Blogs/getBlogsQuery";



export type BlogProps = {
  blog: BlogData & {
    day: number;
    month: string;
    year: number;
    content: string;
  };
};

export const BlogCard: React.FC<BlogProps> = ({ blog }) => {
  return (
    <>
      <article
        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        key={blog.id}
      >
        <div className="h-48 overflow-hidden">
          <Image
            className="rounded-t-md object-cover "
            src={blog.imageUrl}
            alt="Blog Image"
            width={800}
            height={600}
          />
        </div>

        <div className="p-5">
          <div>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
              {blog.category}
            </span>
          </div>
          <p className="md:text-xl font-semibold capitalize  text-xs  hover:text-gray-700  p-2 pb-4 pl-0 ">
            {blog.title}
          </p>

          <p className="pb-2 text-xs hidden md:block">
            {blog.content}...
            <Link href={`/blogs/${blog.id}`} className="text-primary ml-2">
              Continue reading
            </Link>
          </p>
          <span className="text-sm pb-3">
            By
            <a href="#" className="font-semibold mx-1 hover:text-gray-800">
              ItaxEasy
            </a>
            ,
            <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mx-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
              <Clock size={16} className="me-1" />
              {`${blog.day} ${blog.month} ${blog.year}`}
            </span>
          </span>
          <Link className="mt-3 block" href={`/blogs/${blog.id}`}>
            <Button className="flex gap-2 items-center hover:bg-blue-600">
              Read More
              <ChevronRightCircle size={20} />
            </Button>
          </Link>
        </div>
      </article>
    </>
  );
};
