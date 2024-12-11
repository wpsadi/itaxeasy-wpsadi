"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const blogs = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn the basics of Next.js and start building your first app.",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    excerpt:
      "Explore advanced patterns to make your React code more efficient and maintainable.",
  },
  {
    id: 3,
    title: "Introduction to TypeScript",
    excerpt:
      "Discover the benefits of using TypeScript in your JavaScript projects.",
  },
];

export default function BlogsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setBlogToDelete(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (deleteConfirmation === "delete") {
      // Here you would typically call an API to delete the blog post
      console.log(`Deleting blog with id: ${blogToDelete}`);
      setOpenDialog(false);
      setDeleteConfirmation("");
      setBlogToDelete(null);
    }
  };

  return (
    <div className="bg-white min-h-screen mx-4 mt-3">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{blog.excerpt}</p>
              <Link
                href={`/blogs/${blog.id}`}
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Read more
              </Link>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/blogs/edit/${blog.id}`}>Edit</Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

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
              onClick={confirmDelete}
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
