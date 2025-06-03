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
import SheetBrand from "@/components/sheet/sheet-brand";
import Image from "next/image";
import { brandAPI } from "@/services/brand";
import { BrandTypes } from "@/types/brand";

export const columns: ColumnDef<BrandTypes>[] = [
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
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const imageUrl = row.getValue("logo");
      return (
        <div className="relative h-16 w-16">
          {imageUrl ? (
            <Image
              src={imageUrl as string}
              alt={row.getValue("name")}
              fill
              sizes="(max-width: 64px) 100vw, 64px"
              className="rounded-md object-cover"
              priority
              unoptimized
            />
          ) : (
            <div className="h-full w-full bg-muted rounded-md flex items-center justify-center">
              <span className="text-xs text-muted-foreground">No image</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("country")}</div>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const mutationDelete = useMutation({
        mutationFn: (brandId: string) => brandAPI.deleteBrand(brandId),
        onSuccess: () => {
          toast.success("Brand deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["brand"] });
        },
        onError: () => {
          toast.error("Failed to delete brand");
        },
      });

      return (
        <div className="flex items-center gap-2">
          <SheetBrand
            mode="edit"
            brandId={row.original.brandId}
            initialData={row.original}
            logoData={row.original.logo}
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
                  onClick={() => mutationDelete.mutate(row.original.brandId)}
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
