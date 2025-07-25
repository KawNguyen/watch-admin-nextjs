"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Star, Search, Filter } from "lucide-react";
import { formatDate } from "@/lib";

interface Review {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  productName: string;
  rating: number;
  title: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    productName: "Wireless Headphones Pro",
    rating: 5,
    title: "Excellent sound quality!",
    content:
      "These headphones exceeded my expectations. The sound quality is crystal clear and the battery life is amazing. Highly recommend!",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    customerName: "Mike Chen",
    customerEmail: "mike.chen@email.com",
    productName: "Smart Watch Series X",
    rating: 4,
    title: "Great features, minor issues",
    content:
      "Love the fitness tracking and notifications. Battery could be better, but overall a solid smartwatch.",
    status: "approved",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
  },
  {
    id: "3",
    customerName: "Emily Davis",
    customerEmail: "emily.d@email.com",
    productName: "Bluetooth Speaker Mini",
    rating: 2,
    title: "Disappointing purchase",
    content:
      "Sound quality is poor and connection keeps dropping. Not worth the price.",
    status: "rejected",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T11:30:00Z",
  },
  {
    id: "4",
    customerName: "David Wilson",
    customerEmail: "david.w@email.com",
    productName: "Gaming Mouse Elite",
    rating: 5,
    title: "Perfect for gaming",
    content:
      "Responsive, comfortable grip, and the RGB lighting is a nice touch. Best gaming mouse I've owned.",
    status: "approved",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T17:20:00Z",
  },
];

export default function Component() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<Review | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleViewReview = (review: Review) => {
    setSelectedReview(review);
    setIsViewDialogOpen(true);
  };

  const handleEditReview = (review: Review) => {
    setEditForm({ ...review });
    setIsEditDialogOpen(true);
  };

  const handleUpdateReview = () => {
    if (!editForm) return;

    setReviews((prev) =>
      prev.map((review) =>
        review.id === editForm.id
          ? { ...editForm, updatedAt: new Date().toISOString() }
          : review
      )
    );
    setIsEditDialogOpen(false);
    setEditForm(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Review Management</h1>
          <p className="text-muted-foreground">
            Manage customer reviews, approve or reject submissions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-medium">{review.customerName}</div>
                        <div className="text-sm text-muted-foreground">
                          {review.customerEmail}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {review.productName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewReview(review)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditReview(review)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <h3 className="font-semibold">{selectedReview.customerName}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedReview.customerEmail}
                </p>
                <div className="ml-auto">
                  {getStatusBadge(selectedReview.status)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Product</Label>
                  <p className="text-sm">{selectedReview.productName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Rating</Label>
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedReview.rating)}
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Review Content</Label>
                <p className="text-sm">{selectedReview.content}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p>{formatDate(selectedReview.createdAt)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Updated</Label>
                  <p>{formatDate(selectedReview.updatedAt)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          {editForm && (
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(value: "pending" | "approved" | "rejected") =>
                  setEditForm({ ...editForm, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateReview}>Update Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
