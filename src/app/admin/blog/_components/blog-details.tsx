"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BlogPost } from "@/types/blog";
import { useMe } from "@/queries/use-session";
import Image from "next/image";

interface BlogDetailDialogProps {
  blog: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (blog: BlogPost) => void;
  onDelete: (blog: BlogPost) => void;
}

export function BlogDetailDialog({
  blog,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: BlogDetailDialogProps) {
  if (!blog) return null;
  const { data: user } = useMe();
  const id = `${user?.data?.item.id}`;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start justify-between mt-4 ">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{blog.title}</DialogTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{blog.createdAt}</span>
                </div>
                <Badge variant={blog.isPublished ? "default" : "secondary"}>
                  {blog.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(blog)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(blog)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="h-full w-full ">
          <div className="space-y-6">
            <div className="w-full">
              <Image
                src="/qr/qr.png"
                alt={blog.title}
                width={500}
                height={500}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Content</h3>
              <div className="prose prose-sm max-w-none">
                {blog.content.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={index}
                        className="text-xl font-semibold mt-6 mb-3"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("- **")) {
                    const match = paragraph.match(/- \*\*(.*?)\*\*: (.*)/);
                    if (match) {
                      return (
                        <div key={index} className="mb-2">
                          <strong>{match[1]}</strong>: {match[2]}
                        </div>
                      );
                    }
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
