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
import { Textarea } from "@/components/ui/textarea";
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
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "PROCESSING",
    label: "Processing",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "SHIPPING",
    label: "Shipping",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    value: "DELIVERED",
    label: "Delivered",
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "COMPLETED",
    label: "Completed",
    color: "bg-green-100 text-green-800",
  },
  { value: "CANCELED", label: "Canceled", color: "bg-red-100 text-red-800" },
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

      toast.success("Order status updated successfully");
      onStatusUpdated();
      setOpen(false);
      setNotes("");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
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
            Update Order Status
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Current Status */}
          <div className="space-y-2">
            <Label>Current Status</Label>
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
            <Label htmlFor="status">New Status</Label>
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

          {selectedStatus === "CANCELED" && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                ⚠️ This action will cancel the order. Please provide a reason
                above.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleStatusUpdate}
            disabled={loading || selectedStatus === currentStatus}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Status"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderStatusUpdateDialog;
