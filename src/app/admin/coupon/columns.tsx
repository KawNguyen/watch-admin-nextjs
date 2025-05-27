import { queryClient } from "@/components/provider/provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { couponAPI } from "@/services/coupon";
import { Status } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SheetCoupon from "@/components/sheet-coupon";
import { Loader2, Trash2 } from "lucide-react";
export type Coupon = {
  id: string;
  code: string;
  discount: number;
  startDate: string;
  endDate: string;
  status: Status;
};

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
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="capitalize">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("discount")}</div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("startDate")}</div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("endDate")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const mutationDelete = useMutation({
        mutationFn: (id: string) => couponAPI.deleteCoupon(id),
        onSuccess: () => {
          toast.success("Coupon deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["coupon"] });
        },
        onError: () => {
          toast.error("Failed to delete coupon");
        },
      });
      return (
        <div className="flex items-center gap-2">
          <SheetCoupon
            mode="update"
            couponId={row.original.id}
            initialData={row.original}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="text-red-600" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-red-500">
                      {row.original.code}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      will permanently removed.
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => mutationDelete.mutate(row.original.id)}
                  disabled={mutationDelete.isPending}
                >
                  {mutationDelete.isPending ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : null}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
