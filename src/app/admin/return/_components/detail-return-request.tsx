"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Return } from "@/types/return";
import { Eye } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { returnApi } from "@/services/return";
import { queryClient } from "@/components/provider/provider";

const statusColorMap: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  COMPLETED: "bg-green-100 text-green-800",
};

export function ReturnDetailDialog({ data }: { data: Return }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(data.status);

  const updateStatusMutation = useMutation({
    mutationFn: (status: string) =>
      returnApi.updateReturnStatus(data.id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["returns"] });
      toast.success("Đã cập nhật yêu cầu trạng thái đổi trả thành công");
      setOpen(false);
    },
    onError: () => {
      toast.error("Chấp thuận thất bại");
    },
  });

  const statusColor = statusColorMap[status] ?? "bg-gray-100 text-gray-800";

  return (
    <>
      <Button
        variant="outline"
        className="border-none"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Chi Tiết Yêu Cầu Trả Hàng
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Mã đơn hàng
                </h3>
                <p className="mt-1 text-sm text-gray-900 break-words">
                  {data.orderId}
                </p>
              </div>
              <div className="col-span-3">
                <h3 className="text-sm font-medium text-gray-500">Sản phẩm</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {data.orderItem?.watch?.name}
                </p>
              </div>
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Số lượng trả
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {data.returnQuantity}
                </p>
              </div>
              <div className="col-span-3">
                <h3 className="text-sm font-medium text-gray-500">
                  Giá sản phẩm
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {data.orderItem?.price?.toLocaleString()}₫
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <h3 className="text-sm font-medium text-gray-500">
                  Khách hàng
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {data.user?.firstName} {data.user?.lastName}
                </p>
              </div>
              <div className="col-span-6">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-sm text-gray-900 break-words">
                  {data.user?.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <h3 className="text-sm font-medium text-gray-500">
                  Lý do trả hàng
                </h3>
                <p className="mt-1 text-sm text-gray-900 break-words">
                  {data.reason}
                </p>
              </div>
              <div className="col-span-3">
                <h3 className="text-sm font-medium text-gray-500">
                  Trạng thái
                </h3>
                <div className="mt-1">
                  <span
                    className={`inline-block text-sm font-medium px-2 py-1 rounded-full ${statusColor}`}
                  >
                    {status === "PENDING"
                      ? "Chờ Duyệt"
                      : status === "APPROVED"
                      ? "Đã Duyệt"
                      : status === "REJECTED"
                      ? "Từ Chối"
                      : status === "COMPLETED"
                      ? "Hoàn Thành"
                      : ""}
                  </span>
                </div>
              </div>
              <div className="col-span-3">
                <h3 className="text-sm font-medium text-gray-500">Ngày tạo</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(data.createdAt).toLocaleString("vi-VN")}
                </p>
              </div>
            </div>

            {data.images && data.images.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Hình ảnh đính kèm
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
                  {data.images.map((img: string, idx: number) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Ảnh trả hàng ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.status === "PENDING" && (
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="destructive"
                  disabled={updateStatusMutation.isPending}
                  onClick={() => updateStatusMutation.mutate("REJECTED")}
                >
                  Từ chối
                </Button>
                <Button
                  variant="default"
                  disabled={updateStatusMutation.isPending}
                  onClick={() => updateStatusMutation.mutate("APPROVED")}
                >
                  Chấp thuận
                </Button>
              </div>
            )}
            {data.status === "APPROVED" && (
              <div className="flex justify-end pt-4">
                <Button
                  variant="default"
                  disabled={updateStatusMutation.isPending}
                  onClick={() => updateStatusMutation.mutate("COMPLETED")}
                >
                  Hoàn Thành
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
