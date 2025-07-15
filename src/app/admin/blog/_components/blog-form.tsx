"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Tiptap from "@/components/rich-text/page";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  userId: string;
  isPublished: boolean;
  createdAt: string;
  author: string;
}

interface BlogFormDialogProps {
  blog: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (blog: Omit<BlogPost, "id" | "createdAt" | "author">) => void;
}

export function BlogFormDialog({
  blog,
  open,
  onOpenChange,
  onSave,
}: BlogFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail: "",
    userId: "",
    isPublished: false,
  });
  const [post, setPost] = useState("");
  const onChange = (content: string) => {
    setPost(content);
  };
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        thumbnail: blog.thumbnail,
        userId: blog.userId,
        isPublished: blog.isPublished,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        thumbnail: "",
        userId: "",
        isPublished: false,
      });
    }
  }, [blog, open]);

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // const renderPreview = () => {
  //   return (
  //     <div className="prose prose-sm max-w-none">
  //       <div className="flex items-center  gap-x-4 space-y-2">
  //         <h1 className="text-2xl font-bold ">
  //           {formData.title || "Blog Title"}
  //         </h1>
  //       </div>
  //       {formData.thumbnail && (
  //         <Image
  //           src={formData.thumbnail || "/placeholder.svg"}
  //           alt="Thumbnail"
  //           width={500}
  //           height={500}
  //           className="w-full h-48 object-cover rounded-lg mb-4"
  //         />
  //       )}
  //       {formData.content.split("\n").map((paragraph, index) => {
  //         if (paragraph.startsWith("## ")) {
  //           return (
  //             <h2 key={index} className="text-xl font-semibold mt-6 mb-3">
  //               {paragraph.replace("## ", "")}
  //             </h2>
  //           );
  //         }
  //         if (paragraph.startsWith("- **")) {
  //           const match = paragraph.match(/- \*\*(.*?)\*\*: (.*)/);
  //           if (match) {
  //             return (
  //               <div key={index} className="mb-2">
  //                 <strong>{match[1]}</strong>: {match[2]}
  //               </div>
  //             );
  //           }
  //         }
  //         if (paragraph.startsWith("- ")) {
  //           return (
  //             <li key={index} className="mb-1">
  //               {paragraph.replace("- ", "")}
  //             </li>
  //           );
  //         }
  //         if (paragraph.includes("**")) {
  //           const parts = paragraph.split(/(\*\*.*?\*\*)/);
  //           return (
  //             <p key={index} className="mb-4">
  //               {parts.map((part, i) =>
  //                 part.startsWith("**") && part.endsWith("**") ? (
  //                   <strong key={i}>{part.slice(2, -2)}</strong>
  //                 ) : (
  //                   part
  //                 )
  //               )}
  //             </p>
  //           );
  //         }
  //         if (paragraph.trim()) {
  //           return (
  //             <p key={index} className="mb-4">
  //               {paragraph}
  //             </p>
  //           );
  //         }
  //         return null;
  //       })}
  //     </div>
  //   );
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {blog ? "Edit Blog Post" : "Add New Blog Post"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-10">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      placeholder="Enter blog title"
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="userId">Created By</Label>
                    <Input
                      id="userId"
                      value={formData.userId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          userId: e.target.value,
                        }))
                      }
                      placeholder="Who created this"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-10">
                    <Label htmlFor="thumbnail">Thumbnail URL</Label>
                    <Input
                      id="thumbnail"
                      value={formData.thumbnail}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          thumbnail: e.target.value,
                        }))
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="col-span-2 ml-1 flex items-center mt-6 gap-x-2">
                    <Switch
                      id="isPublished"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          isPublished: checked,
                        }))
                      }
                    />
                    <Label htmlFor="isPublished">Published</Label>
                  </div>
                </div>

                <div className="col-span-4">
                  <Label htmlFor="content">Content</Label>
                  {/* <RichText /> */}
                  <div className="w-full my-2">
                    <Tiptap content={post} onChange={onChange} />
                  </div>
                </div>
              </div>
            </ScrollArea>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {blog ? "Update Post" : "Create Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
