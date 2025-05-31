import { queryClient } from "@/components/provider/provider";
import { Checkbox } from "@/components/ui/checkbox";
import { watchAPI } from "@/services/watch";
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
import SheetWatch from "@/components/sheet/sheet-watch";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { Gender } from "@/types";
export type Watch = {
  id: string;
  name: string;
  image: string;
  brand: string;
  price: string;
  description: string;
  gender: Gender;
};

export const columns: ColumnDef<Watch>[] = [
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image");
      return (
        <div className="relative h-16 w-16">
          {imageUrl ? (
            <Image
              src={imageUrl as string}
              alt={row.getValue("name")}
              fill
              sizes="(max-width: 64px) 100vw, 64px"
              className="rounded-md object-cover"
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
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("brand")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("gender")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
     const mutationDelete=useMutation({
      mutationFn:(id:string)=> watchAPI.deleteWatch(id),
      onSuccess:()=>{
        toast.success("Watch deleted successfully")
        queryClient.invalidateQueries({queryKey:["watch"]}) 
      },
      onError:(err)=>{
        toast.error("Error deleting watch") 
      },
     });
     return (
      <div className="flex items-center gap-2">
        <SheetWatch
          mode="update"
          watchId={row.original.id}
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
