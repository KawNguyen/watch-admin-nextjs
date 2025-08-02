"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogPost } from "@/types/blog";
import { useMe } from "@/queries/use-session";
import { formatDate } from "@/lib";

interface BlogDetailDialogProps {
  blog: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (blog: BlogPost) => void;
  onDelete?: (blog: BlogPost) => void;
  showActions?: boolean;
}

export function BlogDetailDialog({
  blog,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  showActions = false,
}: BlogDetailDialogProps) {
  const { data: userData, isLoading: isLoadingUser } = useMe();
  const fullName = `${userData?.firstName} ${userData?.lastName} `;

  if (!blog) return null;

  const handleEdit = () => {
    onEdit?.(blog);
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete?.(blog);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <ScrollArea className="h-[90vh]">
          <DialogHeader className="flex-shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-2xl mb-3 leading-tight">
                  {blog.title}
                </DialogTitle>

                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 flex-shrink-0" />
                    {isLoadingUser ? (
                      <Skeleton className="h-4 w-20" />
                    ) : (
                      <span>{fullName}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 pr-4">
            <div className="space-y-6 pb-4">
              {blog.thumbnail && (
                <div className="w-full">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-80 object-contain rounded-lg "
                    loading="lazy"
                  />
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Nội Dung
                </h3>
                <div
                  className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
