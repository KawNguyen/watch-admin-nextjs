import { useMutation } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { queryClient } from '@/components/provider/provider';
import { AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { couponApi } from '@/services/coupon';
import type { Coupon } from '@/types/coupon';
import CouponForm from './coupon-form';
import { Switch } from '@/components/ui/switch';
export const columns: ColumnDef<Coupon>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
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
    accessorKey: "discountType",
    header: "Discount Type",
  },
  {
    accessorKey: "discountValue",
    header: "Discount Value",
  },

  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return isActive == true ? (
        <Switch
          checked={isActive}
          className="h-5 w-9"
          onCheckedChange={(value) => {
            row.original.isActive = value;
            queryClient.invalidateQueries({ queryKey: ["coupons"] });
          }}
        />
      ) : (
        <Switch
          checked={isActive}
          className="h-5 w-9"
          onCheckedChange={(value) => {
            row.original.isActive = value;
            queryClient.invalidateQueries({ queryKey: ["coupons"] });
          }}
        />
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: { row: any }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const mutationDelete = useMutation({
        mutationFn: (couponId: string) => couponApi.deleteCoupon(couponId),
        onSuccess: () => {
          toast.success("Coupon deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["coupons"] });
        },
        onError: () => {
          toast.error("Failed to delete coupon");
        },
      });
      const handleDelete = () => {
        mutationDelete.mutate(row.original.id);
        setIsDialogOpen(false);
      };

      return (
        <div className="flex items-center gap-2">
          <CouponForm couponData={row.original} mode="view" />
          <CouponForm couponData={row.original} mode="edit" />
          <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
            <DialogTrigger asChild>
              {mutationDelete.isPending ? (
                <Loader2 className="size-4 animate-spin text-red-500" />
              ) : (
                <Trash2
                  className="size-4 cursor-pointer text-red-500"
                  onClick={() => setIsDialogOpen(true)}
                />
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h3 className="font-semibold text-lg">Confirm Deletion</h3>
              </DialogHeader>
              <p>
                Are you sure you want to delete
                <span className=" mx-2 text-red-500 underline">
                  {row.original.code}
                </span>
                ?
              </p>
              <AlertDialogFooter>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button onClick={handleDelete} variant="destructive">
                  Confirm Delete
                </Button>
              </AlertDialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
