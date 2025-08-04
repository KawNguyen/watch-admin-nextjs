"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Edit, Loader2 } from "lucide-react";
import { orderApi } from "@/services/create-order";
import { toast } from "sonner";

interface OrderStatusUpdateDialogProps {
  orderId: string;
  currentStatus: string;
  onStatusUpdated: () => void;
  children: React.ReactNode;
}

const ORDER_STATUSES = [
  {
    value: "PENDING",
    label: "Chờ Duyệt",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "PROCESSING",
    label: "Đang Xử Lý",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "SHIPPING",
    label: "Đang Giao Hàng",
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "DELIVERED",
    label: "Đã Giao Hàng",
    color: "bg-orange-400 text-white",
  },
  {
    value: "COMPLETED",
    label: "Đã Hoàn Thành",
    color: "bg-green-400 text-white",
  },
  {
    value: "CANCELED",
    label: "Bị Hủy",
    color: "bg-red-100 text-red-800",
  },
];

const OrderStatusUpdateDialog: React.FC<OrderStatusUpdateDialogProps> = ({
  orderId,
  currentStatus,
  onStatusUpdated,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async () => {
    if (selectedStatus === currentStatus) {
      toast.info("Status is already set to this value");
      return;
    }

    try {
      setLoading(true);

      const updateData: any = {
        status: selectedStatus,
      };

      if (selectedStatus === "CANCELED" && notes.trim()) {
        updateData.cancellationReason = notes.trim();
      }

      if (selectedStatus !== "CANCELED" && notes.trim()) {
        updateData.shippingNotes = notes.trim();
      }

      await orderApi.updateStatus(orderId, updateData);

      toast.success("Cập nhật trạng thái đơn hàng thành công");
      onStatusUpdated();
      setOpen(false);
      setNotes("");
    } catch (error) {
      toast.error("Cập nhật trạng thái đơn hàng thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSelectedStatus(currentStatus);
      setNotes("");
    }
  };

  const getCurrentStatusInfo = () => {
    return ORDER_STATUSES.find((status) => status.value === currentStatus);
  };

  const getSelectedStatusInfo = () => {
    return ORDER_STATUSES.find((status) => status.value === selectedStatus);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Cập Nhật Trạng Thái Đơn Hàng
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Trạng Thái Hiện Tại</Label>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  getCurrentStatusInfo()?.color
                }`}
              >
                {getCurrentStatusInfo()?.label}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Trạng Thái Mới</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {ORDER_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            onClick={handleStatusUpdate}
            disabled={loading || selectedStatus === currentStatus}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Cập Nhật...
              </>
            ) : (
              "Cập Nhật"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderStatusUpdateDialog;
