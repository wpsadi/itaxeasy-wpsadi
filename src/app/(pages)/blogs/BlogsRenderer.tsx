import React from "react";

import { BlogSuccessData } from "@/services/Blogs/getBlogsQuery";

import { BlogCard } from "./BlogCard";

interface ShowBlogsProps {
  blogs: BlogSuccessData;
}

export const ShowBlogs: React.FC<ShowBlogsProps> = ({ blogs }) => {
  return (
    <>
      {blogs.posts.map((blog, blogIndex) => {
        // getting date correctly in proper format
        // If you see future dates in your blog posts, it is because you are not passing the correct date to the Date constructor. You should pass the date in the format of "YYYY-MM-DDTHH:MM:SSZ" to the Date constructor. Here is the corrected code:
        const formattedDate = new Date(blog.createdAt) ?? "";
        const day = formattedDate.getDate();
        const month = formattedDate.toLocaleString("default", {
          month: "short",
        });
        const content = blog.contentDescription.slice(0, 180);
        const year = formattedDate.getFullYear();

        const blogData = {
          ...blog,
          day,
          month,
          year,
          content,
        };

        return (
          <React.Fragment key={blogIndex}>
            <BlogCard blog={blogData}/>
          </React.Fragment>
        );
      })}
    </>
  );
};
