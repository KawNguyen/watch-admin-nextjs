import "react-photo-view/dist/react-photo-view.css";

import { useMutation } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { PhotoView } from "react-photo-view";
import { toast } from "sonner";
import { queryClient } from "@/components/provider/provider";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { watchApi } from "@/services/watch";
import type { Watch } from "@/types/watch";
import WatchForm from "./watch-form";

const ActionCell = ({ row }: { row: any }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutationDelete = useMutation({
    mutationFn: (watchId: string) => watchApi.delete(watchId),
    onSuccess: () => {
      toast.success("Watch deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["watches"] });
    },
    onError: () => {
      toast.error("Failed to delete watch");
    },
  });
  const handleDelete = () => {
    mutationDelete.mutate(row.original.id);
    setIsDialogOpen(false);
  };
  // const test=`${}`;
  return (
    <div className="flex items-center gap-2">
      <WatchForm mode="view" watchData={row.original} />
      <WatchForm mode="edit" watchData={row.original} />
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
              {row.original.name}
            </span>
            ?
          </p>
          <AlertDialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="secondary">
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
};
export const columns: ColumnDef<Watch>[] = [
  {
    id: "select",
    header: ({ table }: { table: any }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }: { row: any }) => (
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
    header: "Image",
    cell: ({ row }: { row: any }) => {
      return (
        <PhotoView
          height={500}
          src={row.original.images[0]?.absolute_url}
          width={500}
        >
          <div className="h-10 w-10 overflow-hidden rounded-md">
            <AspectRatio ratio={1}>
              <Image
                alt={row.original.name}
                className="object-cover"
                fill
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/300x300.png";
                }}
                sizes="10vw"
                src={
                  row.original?.images[0]?.absolute_url ||
                  "https://placehold.co/300x300.png"
                }
              />
            </AspectRatio>
          </div>
        </PhotoView>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "brand.name",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: { row: any }) => <ActionCell row={row} />,
  },
];
