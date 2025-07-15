"use client";

import { useState } from "react";
import { Plus, Search, Eye, Edit, Trash2, Calendar, Globe } from "lucide-react";
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
import { BlogDetailDialog } from "./_components/blog-details";
import { BlogFormDialog } from "./_components/blog-form";
import { DeleteConfirmDialog } from "./_components/blog-delete";

const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    slug: "getting-started-nextjs-14",
    content:
      "Next.js 14 introduces several exciting features including the App Router, Server Components, and improved performance optimizations. In this comprehensive guide, we'll explore how to build modern web applications with the latest version of Next.js.",
    thumbnail: "",
    userId: "user1",
    isPublished: true,
    createdAt: "2024-01-15",
    author: "John Doe",
  },
];

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [deletingBlog, setDeletingBlog] = useState<BlogPost | null>(null);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleSaveBlog = (
    blogData: Omit<BlogPost, "id" | "createdAt" | "author">
  ) => {
    if (editingBlog) {
      // Update existing blog
      setBlogs(
        blogs.map((blog) =>
          blog.id === editingBlog.id ? { ...blog, ...blogData } : blog
        )
      );
    } else {
      // Add new blog
      const newBlog: BlogPost = {
        ...blogData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        author: "Current User",
      };
      setBlogs([newBlog, ...blogs]);
    }
    setIsFormOpen(false);
    setEditingBlog(null);
  };

  const handleConfirmDelete = () => {
    if (deletingBlog) {
      setBlogs(blogs.filter((blog) => blog.id !== deletingBlog.id));
      setIsDeleteOpen(false);
      setDeletingBlog(null);
    }
  };

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
                <Badge
                  variant={blog.isPublished ? "default" : "secondary"}
                  className="absolute top-2 right-2"
                >
                  {blog.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4" onClick={() => handleViewDetail(blog)}>
              <CardTitle className="text-lg mb-2 line-clamp-2">
                {blog.title}
              </CardTitle>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {blog.content.replace(/[#*\n]/g, " ").substring(0, 120)}...
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{blog.author}</span>
                <span>•</span>
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
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      )}

      {/* Dialogs */}
      <BlogDetailDialog
        blog={selectedBlog}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BlogFormDialog
        blog={editingBlog}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSaveBlog}
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
