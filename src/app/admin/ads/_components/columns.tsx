import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/provider/provider";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { advertisementApi } from "@/services/ads";
import AdvertisementForm from "./ads-form";
import { Advertisment } from "@/types/advertisement";

const ActionCell = ({ row }: { row: any }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutationDelete = useMutation({
    mutationFn: (adsId: string) => advertisementApi.deleteAds(adsId),
    onSuccess: () => {
      toast.success("Advertisement deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["advertisements"] });
    },
    onError: () => {
      toast.error("Failed to delete advertisement");
    },
  });
  const handleDelete = () => {
    mutationDelete.mutate(row.original.id);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <AdvertisementForm mode="view" adsData={row.original} />
      <AdvertisementForm mode="edit" adsData={row.original} />
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
              {row.original.title}
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

export const columns: ColumnDef<Advertisment>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl;
      return (
        <div className="relative h-16 w-16">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={row.getValue("title")}
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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "link",
    header: "Link",
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    accessorKey: "startDate",
    header: "From",
  },
  {
    accessorKey: "endDate",
    header: "To",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
