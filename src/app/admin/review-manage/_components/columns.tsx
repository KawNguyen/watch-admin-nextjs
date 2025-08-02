import { Eye, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/provider/provider";
import { reviewApi } from "@/services/review";
import type { Review } from "@/types/review";
import { formatDate } from "@/lib";
import { ColumnDef } from "@tanstack/react-table";

const ActionCell = ({ row }: { row: any }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const mutationDelete = useMutation({
    mutationFn: (reviewId: string) => reviewApi.deleteReview(reviewId),
    onSuccess: () => {
      toast.success("Xóa đánh giá thành công");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: () => {
      toast.error("Xóa đánh giá thất bại");
    },
  });

  const handleDelete = () => {
    mutationDelete.mutate(row.original.id);
    setIsDeleteDialogOpen(false);
  };
  return (
    <div className="flex items-center gap-3">
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogTrigger asChild>
          <Eye
            className="size-4 cursor-pointer text-primary hover:text-primary/80"
            onClick={() => setIsDetailDialogOpen(true)}
          />
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <h3 className="text-xl font-bold flex items-center gap-2">
              Chi tiết đánh giá
            </h3>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-3 rounded-xl ">
              <p className="text-sm text-gray-500">Mã đồng hồ</p>
              <p className="font-semibold">{row.original.watchId}</p>
            </div>

            <div className=" gap-3 p-3 rounded-xl ">
              <div>
                <p className="text-sm text-gray-500">Người Đánh Giá</p>
              </div>
              <div className="flex items-center gap-x-4">
                <p className="font-medium">
                  {row.original.user?.firstName} {row.original.user?.lastName}
                </p>
                <p className="text-sm">{row.original.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl ">
              <span className="text-sm text-gray-500">Đánh giá</span>
              <div className="flex gap-1 items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < row.original.rating
                        ? "text-yellow-400 text-xl"
                        : "text-gray-300 text-xl"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-xl">
              <p className="text-sm text-gray-500">Nội dung đánh giá</p>
              <p>{row.original.comment}</p>
            </div>
            <div className="p-3 rounded-xl text-sm text-gray-600">
              Ngày tạo: <b>{formatDate(row.original.createdAt)}</b>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger asChild>
          {mutationDelete.isPending ? (
            <Loader2 className="size-4 animate-spin text-red-500" />
          ) : (
            <Trash2
              className="size-4 cursor-pointer text-red-500"
              onClick={() => setIsDeleteDialogOpen(true)}
            />
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <h3 className="font-semibold text-lg">Xác Nhận Xóa</h3>
          </DialogHeader>
          <p>
            Bạn có chắc chắn xóa lời bình luận
            <span className="mx-2 text-red-500 underline">
              {row.original.comment}
            </span>
            ?
          </p>
          <AlertDialogFooter>
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              variant="secondary"
            >
              Hủy
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Xóa
            </Button>
          </AlertDialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const columns: ColumnDef<Review>[] = [
  { accessorKey: "watchId", header: "Mã Đồng Hồ" },
  { accessorKey: "user.email", header: "Người Đánh Giá" },
  {
    accessorKey: "rating",
    header: "Đánh Giá",
    cell: ({ row }) => {
      const rating = row.original.rating;

      return (
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={
                i < rating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"
              }
            >
              ★
            </span>
          ))}
        </div>
      );
    },
  },
  {
    header: "Họ và tên",
    cell: ({ row }: { row: any }) => {
      const fullName = `${row.original.user?.firstName ?? ""} ${
        row.original.user?.lastName ?? ""
      }`;
      return <p>{fullName.trim()}</p>;
    },
  },
  {
    accessorKey: "actions",
    header: "Chức Năng",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
