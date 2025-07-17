"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Eye, Edit, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types/blog";
import { BlogFormDialog } from "./_components/blog-form";
import { DeleteConfirmDialog } from "./_components/blog-delete";
import { blogApi } from "@/services/blog";
import { BlogDetailDialog } from "./_components/blog-details";

// Query keys for better organization
const QUERY_KEYS = {
  blogs: ["blogs"] as const,
} as const;

// Helper function to format blog data
const formatBlogData = (data: any[]): BlogPost[] => {
  return data.map((item: any) => ({
    ...item,
    createdAt: item.createdAt.slice(0, 10),
  }));
};

// Helper function to strip HTML tags
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]+>/g, "");
};

export default function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [deletingBlog, setDeletingBlog] = useState<BlogPost | null>(null);

  const queryClient = useQueryClient();

  // Fetch blogs with useQuery
  const {
    data: blogs = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.blogs,
    queryFn: async () => {
      const data = await blogApi.getAllBlogs();
      return formatBlogData(data);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (slug: string) => {
      await blogApi.deleteBlog(slug);
    },
    onSuccess: () => {
      // Invalidate and refetch blogs
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.blogs });
      setIsDeleteOpen(false);
      setDeletingBlog(null);
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  // Memoized filtered blogs for performance
  const filteredBlogs = useMemo(() => {
    if (!searchTerm) return blogs;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(lowerSearchTerm) ||
        blog.content.toLowerCase().includes(lowerSearchTerm)
    );
  }, [blogs, searchTerm]);

  // Event handlers
  const handleConfirmDelete = async () => {
    if (!deletingBlog) return;
    deleteMutation.mutate(deletingBlog.slug);
  };

  const handleViewDetail = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsDetailOpen(true);
  };

  const handleAddNew = () => {
    setEditingBlog(null);
    setIsFormOpen(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setIsFormOpen(true);
  };

  const handleDelete = (blog: BlogPost) => {
    setDeletingBlog(blog);
    setIsDeleteOpen(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-destructive">
            Failed to load blogs. Please try again later.
          </p>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: QUERY_KEYS.blogs })
            }
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">
            Manage your blog posts and content
          </p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          New Post
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <Card
            key={blog.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={blog.thumbnail || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4" onClick={() => handleViewDetail(blog)}>
              <CardTitle className="text-lg mb-2 line-clamp-2">
                {blog.title}
              </CardTitle>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {stripHtmlTags(blog.content).substring(0, 120)}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{blog.createdAt}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetail(blog);
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(blog);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(blog);
                }}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchTerm
              ? "No blog posts found matching your search."
              : "No blog posts found."}
          </p>
        </div>
      )}

      {/* Dialogs */}
      <BlogDetailDialog
        blog={selectedBlog}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
      <BlogFormDialog
        mode={editingBlog ? "edit" : "create"}
        blog={editingBlog}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
      <DeleteConfirmDialog
        blog={deletingBlog}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
