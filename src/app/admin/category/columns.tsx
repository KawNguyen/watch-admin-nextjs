import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import SheetCategory from "@/components/sheet-category";
import { useMutation } from "@tanstack/react-query";
import { categoryAPI } from "@/services/category";
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

export type Category = {
  id: number;
  name: string;
  gender: Gender;
};
export enum Gender {
  MEN = "MEN",
  WOMEN = "WOMEN",
  UNISEX = "UNISEX",
}
export const columns: ColumnDef<Category>[] = [
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
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("gender")}</div>
    ),
  },
  {
    // id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const mutationDelete = useMutation({
        mutationFn: (id: number) => categoryAPI.deleteCategory(id),
        onSuccess: () => {
          toast.success("Category deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["category"] });
        },
        onError: () => {
          toast.error("Failed to delete category");
        },
      });

      return (
        <div className="flex items-center gap-2">
          <SheetCategory
            mode="update"
            categoryId={row.original.id}
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
