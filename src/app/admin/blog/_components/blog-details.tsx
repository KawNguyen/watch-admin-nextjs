"use client";

import { useMemo } from "react";
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

interface BlogDetailDialogProps {
  blog: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (blog: BlogPost) => void;
  onDelete?: (blog: BlogPost) => void;
  showActions?: boolean;
}

// Helper function to format author name
const formatAuthorName = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) return "Unknown Author";
  return `${firstName || ""} ${lastName || ""}`.trim();
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export function BlogDetailDialog({
  blog,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  showActions = false,
}: BlogDetailDialogProps) {
  const { data: userData, isLoading: isLoadingUser } = useMe();

  // Memoized author name to prevent unnecessary recalculations
  const authorName = useMemo(() => {
    if (isLoadingUser) return null;
    const user = userData?.data?.item;
    return formatAuthorName(user?.firstName, user?.lastName);
  }, [userData, isLoadingUser]);

  // Memoized formatted date
  const formattedDate = useMemo(() => {
    return blog ? formatDate(blog.createdAt) : "";
  }, [blog?.createdAt]);

  // Don't render if no blog is selected
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
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-2xl mb-3 leading-tight">
                {blog.title}
              </DialogTitle>

              {/* Author and Date Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 flex-shrink-0" />
                  {isLoadingUser ? (
                    <Skeleton className="h-4 w-20" />
                  ) : (
                    <span>{authorName}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {showActions && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className="flex items-center gap-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 pb-4">
            {/* Thumbnail */}
            {blog.thumbnail && (
              <div className="w-full">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-sm"
                  loading="lazy"
                />
              </div>
            )}

            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Content
              </h3>
              <div
                className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
