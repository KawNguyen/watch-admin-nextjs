import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/provider/provider";
import { movementApi } from "@/services/movement";
import { Movement } from "@/types/movement";
import MovementForm from "@/app/admin/category/movement/_components/movement-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
export const columns: ColumnDef<Movement>[] = [
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: { row: any }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      // Mutation for deleting the movement
      const mutationDelete = useMutation({
        mutationFn: (movementId: string) =>
          movementApi.deleteMovement(movementId),
        onSuccess: () => {
          toast.success("Movement deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["movements"] });
        },
        onError: () => {
          toast.error("Failed to delete movement");
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              {mutationDelete.isPending ? (
                <Loader2  className="size-4 animate-spin text-red-500"/>
              ) : (
                <Trash2
                  className="size-4 text-red-500 cursor-pointer"
                  onClick={() => setIsDialogOpen(true)}
                />
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              </DialogHeader>
              <p>
                Are you sure you want to delete
                <span className=" mx-2 underline text-red-500">
                  {row.original.name}
                </span>
                ?
              </p>
              <AlertDialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
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
