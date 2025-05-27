import { queryClient } from "@/components/provider/provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { adsAPI } from "@/services/ads";
import { Status } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { toast } from "sonner";
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
import SheetAds from "@/components/sheet-ads";
import { Loader2, Trash2 } from "lucide-react";
export type Ads = {
  id: string;
  name: string;
  image: string;
  status: Status;
  description: string;
  link:string;
  startDate:string;
  endDate:string;
};

export const columns: ColumnDef<Ads>[] = [
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
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative h-16 w-16">
        <Image
          src={row.getValue("image")}
          alt={row.getValue("name")}
          fill
          className="rounded-md object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const mutationDelete = useMutation({
        mutationFn: (id: string) => adsAPI.deleteAds(id),
        onSuccess: () => {
          toast.success("Ads deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["ads"] });
        },
        onError: () => {
          toast.error("Failed to delete Ads");
        },
      });
      return (
        <div className="flex items-center gap-2">
          <SheetAds
            mode="update"
            adsId={row.original.id}
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
