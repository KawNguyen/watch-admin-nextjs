import "react-photo-view/dist/react-photo-view.css";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import { Watch } from "@/types/watch";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import WatchForm from "./watch-form";
import { PhotoView } from "react-photo-view";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { watchApi } from "@/services/watch"
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { queryClient } from "@/components/provider/provider";

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

  return (
    <div className="flex items-center gap-2">
      <WatchForm mode="view" watchData={row.original} />
      <WatchForm mode="edit" watchData={row.original} />
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
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
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
};
export const columns: ColumnDef<Watch>[] = [
  {
    id: "select",
    header: ({ table }: { table: any }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: any }) => (
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
    header: "Image",
    cell: ({ row }: { row: any }) => {
      return (
        <PhotoView
          width={500}
          height={500}
          src={row.original.images[0]?.absolute_url}
        >
          <div className="h-10 w-10 rounded-md overflow-hidden">
            <AspectRatio ratio={1}>
              <Image
                src={
                  row.original?.images[0]?.absolute_url ||
                  "https://placehold.co/300x300.png"
                }
                alt={row.original.name}
                fill
                sizes="10vw"
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/300x300.png";
                }}
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
