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
      return(
        <div className="flex items-center gap-2">
          <BrandForm mode="view" brandData={row.original}/>
          <BrandForm mode="edit" brandData={row.original}/>
          <Trash2 className="size-4 text-gray-500 hover:text-black duration-300 cursor-pointer" />
      </div>
       )
    },
  },
];
