"use client";

import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { marked } from "marked";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const blogs: {
  id: number;
  title: string;
  content: string;
}[] = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    content:
      "# Getting Started with Next.js\n\nNext.js is a powerful React framework that makes it easy to build server-side rendered and statically generated web applications.\n\n## Key Features\n\n- Server-side rendering\n- Static site generation\n- API routes\n- Built-in CSS support\n\n## Getting Started\n\nTo start a new Next.js project, run the following command:\n\n```bash\nnpx create-next-app@latest\n```\n\nFollow the prompts, and you'll have a new Next.js project up and running in no time!",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    content:
      "# Advanced React Patterns\n\nThis blog post explores some advanced React patterns that can help you write more efficient and maintainable code.\n\n## Render Props\n\nRender props is a pattern where a component receives a function as a prop and uses this function to render its content.\n\n## Higher-Order Components (HOCs)\n\nHOCs are functions that take a component as an argument and return a new component with some added functionality.\n\n## Hooks\n\nHooks allow you to use state and other React features without writing a class. They're a game-changer in React development.\n\nStay tuned for more in-depth explanations of these patterns!",
  },
  {
    id: 3,
    title: "Introduction to TypeScript",
    content:
      "# Introduction to TypeScript\n\nTypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional types, classes, and modules to JavaScript.\n\n## Why Use TypeScript?\n\n- Static typing\n- Object-oriented features\n- Compile-time errors\n- Great tooling support\n\n## Basic Types\n\nTypeScript supports several types including:\n\n- `boolean`\n- `number`\n- `string`\n- `array`\n- `tuple`\n- `enum`\n- `any`\n- `void`\n\nStay tuned for more detailed explanations and examples!",
  },
];

const sanitizedContent = async (content: string) => {
  return DOMPurify.sanitize(await marked.parse(content ?? ""));
};

const useBlogData = (id: string) => {
  return useQuery({
    queryKey: ["blog", { id }],
    queryFn: async () => {
      const blog = blogs.find((blog) => blog.id.toString() == id);
      console.log(typeof blog?.id.toString(), typeof id, blog);
      if (blog == undefined) {
        throw Error("Blog not found");
      }
      return {
        id: blog.id,
        title: blog.title,
        content: await sanitizedContent(blog.content),
      };
    },
  });
};

export default function BlogPost() {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const router = useRouter();
  const params = useParams<{
    blogId: string;
  }>();
  const blogId = parseInt(params.blogId);

  const blogQuery = useBlogData(blogId.toString());

  const handleDelete = () => {
    if (deleteConfirmation === "delete") {
      // Here you would typically call an API to delete the blog post
      console.log(`Deleting blog with id: ${blogId}`);
      setOpenDialog(false);
      setDeleteConfirmation("");
      router.push("/blogs"); // Redirect to blogs list after deletion
    }
  };

  if (blogQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (blogQuery.isError) {
    return (
      <div>
        Error:{" "}
        {blogQuery.error instanceof Error
          ? blogQuery.error.message
          : "An unknown error occurred"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-primary text-primary-foreground p-4 mb-8 rounded-lg flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button asChild>
          <Link href="/blogs/create">Create New Blog</Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-4">{blogQuery.data?.title}</h1>

      <div className="mb-4 flex space-x-4">
        <Button variant="outline" asChild>
          <Link href={`/blogs/edit/${blogId}`}>Edit</Link>
        </Button>
        <Button variant="destructive" onClick={() => setOpenDialog(true)}>
          Delete
        </Button>
      </div>

      <div
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{
          __html: blogQuery.data?.content ?? "",
        }}
      />

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this blog post?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. Please type &quot;delete&quot; to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="delete-confirm" className="text-right">
                Confirm
              </Label>
              <Input
                id="delete-confirm"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteConfirmation !== "delete"}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
