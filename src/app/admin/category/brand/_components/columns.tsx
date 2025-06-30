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
import SheetBrand from "@/app/admin/category/brand/_components/brand-form";
import Image from "next/image";
import { brandApi } from "@/services/brand";
import { BrandTypes } from "@/types/brand";
import BrandForm from "@/app/admin/category/brand/_components/brand-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

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
    accessorKey: "image",
    header: "Logo",
    cell: ({ row }) => {
      const image = row.getValue("image");

      const imageUrl =
        image && typeof image === "object" && "absolute_url" in image
          ? (image as { absolute_url: string }).absolute_url
          : null;

      return (
        <div className="relative h-16 w-16">
          {imageUrl ? (
            <Image
              src={imageUrl}
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: { row: any }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const mutationDelete = useMutation({
        mutationFn: (brandId: string) => brandApi.deleteBrand(brandId),
        onSuccess: () => {
          toast.success("Brand deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["brands"] });
        },
        onError: () => {
          toast.error("Failed to delete brand");
        },
      });
      const handleDelete = () => {
        mutationDelete.mutate(row.original.id);
        setIsDialogOpen(false);
      };

      return (
        <div className="flex items-center gap-2">
          <BrandForm mode="view" brandData={row.original} />
          <BrandForm mode="edit" brandData={row.original} />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              {mutationDelete.isPending ? (
                <Loader2 className="size-4 animate-spin text-red-500" />
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
