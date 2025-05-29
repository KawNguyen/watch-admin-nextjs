import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/provider/provider";
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
import SheetMovement from "@/components/sheet-movement";
import { MovementAPI } from "@/services/movement";
import { BandMaterialAPI } from "@/services/band-material";
import SheetBandMaterial from "@/components/sheet-band-material";

export type BandMaterial = {
  id: string;
  name: string;
};

export const columns: ColumnDef<BandMaterial>[] = [
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
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const mutationDelete = useMutation({
        mutationFn: (id: string) => BandMaterialAPI.deleteBandMaterial(id),
        onSuccess: () => {
          toast.success("Band material deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["bandmaterial"] });
        },
        onError: () => {
          toast.error("Failed to delete band material");
        },
      });
      return (
        <div className="flex items-center gap-2">
          <SheetBandMaterial
            mode="update"
            bandmaterialId={row.original.id}
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
                      {row.original.name}
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
