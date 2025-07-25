"use client";

import type React from "react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import TextEditor from "@/components/tip-tap/text-editor";
import { useMe } from "@/queries/use-session";
import { blogFormSchema } from "@/schema/blog";
import { blogApi } from "@/services/blog";
import { Loader2, Pencil, Plus } from "lucide-react";
import { BlogPost } from "@/types/blog";

const QUERY_KEYS = {
  blogs: ["blogs"] as const,
} as const;

interface BlogFormDialogProps {
  mode: "create" | "edit";
  blog?: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type BlogFormValues = z.infer<typeof blogFormSchema>;

const getDefaultValues = (userId?: string): BlogFormValues => ({
  title: "",
  thumbnail: "",
  content: "",
  isPublished: false,
  userId: userId || "",
});

const formatAuthorName = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) return "Unknown Author";
  return `${firstName || ""} ${lastName || ""}`.trim();
};

export function BlogFormDialog({
  mode,
  blog,
  open,
  onOpenChange,
}: BlogFormDialogProps) {
  const { data: userData, isLoading: isLoadingUser } = useMe();
  const queryClient = useQueryClient();
  const isEditMode = mode === "edit";

  const userInfo = useMemo(() => {
    if (isLoadingUser || !userData) return null;
    const user = userData;
    return {
      id: user.id,
      fullName: formatAuthorName(user.firstName, user.lastName),
    };
  }, [userData, isLoadingUser]);

  const mutation = useMutation({
    mutationFn: async (data: BlogFormValues) => {
      if (isEditMode && blog) {
        return blogApi.updateBlog(blog.slug, data);
      } else {
        return blogApi.createBlog(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.blogs });
      toast.success(
        isEditMode ? "Blog updated successfully" : "Blog created successfully"
      );
      onOpenChange(false);
      form.reset();
    },
    onError: (error: any) => {
      console.error("Blog operation failed:", error);
      toast.error(error.response?.data?.message);
    },
  });

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: getDefaultValues(userInfo?.id),
  });

  useEffect(() => {
    if (open) {
      if (isEditMode && blog) {
        form.reset({
          title: blog.title || "",
          thumbnail: blog.thumbnail || "",
          content: blog.content || "",
          isPublished: blog.isPublished || false,
          userId: userInfo?.id || "",
        });
      } else {
        form.reset(getDefaultValues(userInfo?.id));
      }
    }
  }, [open, blog, userInfo?.id, form, isEditMode]);

  const onSubmit = async (data: BlogFormValues) => {
    if (!userInfo?.id) {
      toast.error("User information not available");
      return;
    }

    mutation.mutate({
      ...data,
      userId: userInfo.id,
    });
  };

  const handleClose = () => {
    if (!mutation.isPending) {
      onOpenChange(false);
      form.reset();
    }
  };

  const dialogTitle = isEditMode ? "Edit Blog Post" : "Create New Blog Post";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl">{dialogTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col"
          >
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6 pb-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-10">
                        <FormLabel>
                          Title <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter blog title"
                            {...field}
                            disabled={mutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-2 space-y-2">
                    <Label>Created By</Label>
                    {isLoadingUser ? (
                      <Skeleton className="h-9 w-full" />
                    ) : (
                      <Input
                        value={userInfo?.fullName || "Unknown Author"}
                        disabled
                        className="bg-muted"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-10">
                        <FormLabel>Thumbnail URL</FormLabel>
                        {blog?.thumbnail && (
                          <img
                            src={blog?.thumbnail}
                            alt={blog.title}
                            className="size-20"
                          />
                        )}
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.jpg"
                            {...field}
                            disabled={mutation.isPending}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-2 flex items-center gap-2 space-y-0 lg:mt-6">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={mutation.isPending}
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">Published</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content *</FormLabel>
                      <FormControl>
                        <div className="border rounded-md">
                          <TextEditor
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <DialogFooter className="flex-shrink-0 mt-6 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending || isLoadingUser}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    {isEditMode ? (
                      <>
                        <Pencil className="mr-2 h-4 w-4" />
                        Update Post
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Post
                      </>
                    )}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
