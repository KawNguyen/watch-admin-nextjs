import { queryClient } from "@/components/provider/provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { couponApi } from "@/services/coupon";
import { ColumnDef } from "@tanstack/react-table";

import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import CouponForm from "./coupon-form";
import { Coupon } from "@/types/coupon";
import { useState } from "react";

function CouponActions({ row }: { row: any }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => couponApi.deleteCoupon(id),
    onSuccess: () => {
      toast.success("Coupon deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting coupon:", error);
      toast.error("Failed to delete coupon");
    },
  });

  const handleDelete = () => {
    if (row.original.id) {
      console.log("Deleting coupon with ID:", row.original.id);
      deleteMutation.mutate(row.original.id);
    } else {
      toast.error("Cannot delete: Missing coupon ID");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <CouponForm mode="view" couponData={row.original} />
      <CouponForm mode="edit" couponData={row.original} />
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-red-500 h-8 w-8 p-0">
            {deleteMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Coupon</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete coupon <span className="font-bold">{row.original.code}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const columns: ColumnDef<Coupon>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "discountType",
    header: "Discount",
  },
  {
    accessorKey: "discountValue",
    header: "Discount Value",
  },
  {
    accessorKey: "minOrderValue",
    header: "Min Order Value",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CouponActions row={row} />,
  },
];