"use client";

import "react-quill/dist/quill.snow.css";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .max(100, { message: "Description must be 100 characters or less" }),
  coverImage: z.any().optional(),
  content: z.string().min(1, { message: "Content is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const fetchBlogData = async (id: string) => {
  return {
    id,
    title: "Sample Blog Post",
    description: "This is a sample blog post for editing.",
    content: "<p>This is the content of the sample blog post.</p>",
    coverImage: null,
  };
};

export default function BlogForm() {
  const params = useParams();
  const router = useRouter();
  const isEditing = params.action === "edit";
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  useEffect(() => {
    if (isEditing) {
      fetchBlogData(params.id as string).then((data) => {
        form.reset({
          title: data.title,
          description: data.description,
          content: data.content,
        });
      });
    }
  }, [isEditing, params.id, form]);

  const onSubmit = (data: FormValues) => {
    console.log({ ...data, coverImage });
    alert(isEditing ? "Blog post updated!" : "Blog post created!");
    router.push("/blogs");
  };

  const handleDelete = () => {
    if (deleteConfirmation === "delete") {
      console.log(`Deleting blog with id: ${params.id}`);
      setOpenDialog(false);
      setDeleteConfirmation("");
      router.push("/blogs");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? "Edit" : "Create"} Blog Post
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter blog title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter a short description (max 100 characters)"
                    maxLength={100}
                  />
                </FormControl>
                <FormDescription>
                  {field.value.length}/100 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Cover Image (Optional)</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              />
            </FormControl>
          </FormItem>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  {/* Wrap ReactQuill to avoid React Strict Mode issues */}
                  <div>
                    <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button type="submit">
              {isEditing ? "Update" : "Create"} Blog Post
            </Button>
            {isEditing && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => setOpenDialog(true)}
              >
                Delete Blog Post
              </Button>
            )}
          </div>
        </form>
      </Form>

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
              <FormLabel htmlFor="delete-confirm" className="text-right">
                Confirm
              </FormLabel>
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
