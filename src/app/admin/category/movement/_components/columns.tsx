import { useMutation } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import MovementForm from "@/app/admin/category/movement/_components/movement-form";
import { queryClient } from "@/components/provider/provider";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { movementApi } from "@/services/movement";
import type { Movement } from "@/types/movement";
export const columns: ColumnDef<Movement>[] = [
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
    accessorKey: "name",
    header: "Loại Chuyển Động",
  },
  {
    accessorKey: "actions",
    header: "Chức Năng",
    cell: ({ row }: { row: any }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const mutationDelete = useMutation({
        mutationFn: (movementId: string) =>
          movementApi.deleteMovement(movementId),
        onSuccess: () => {
          toast.success("Xóa chuyển động thành công");
          queryClient.invalidateQueries({ queryKey: ["movements"] });
        },
        onError: () => {
          toast.error("Xóa chuyển động thất bại");
        },
      });
      const handleDelete = () => {
        mutationDelete.mutate(row.original.id);
        setIsDialogOpen(false);
      };

      return (
        <div className="flex items-center gap-2">
          <MovementForm mode="view" movementData={row.original} />
          <MovementForm mode="edit" movementData={row.original} />
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
                <h3 className="font-semibold text-lg">Xác Nhận Xóa</h3>
              </DialogHeader>
              <p>
                Bạn có chắc chắn xóa chuyển động này
                <span className=" mx-2 text-red-500 underline">
                  {row.original.name}
                </span>
                ?
              </p>
              <AlertDialogFooter>
                <Button
                  onClick={() => setIsDialogOpen(false)}
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
    },
  },
];
