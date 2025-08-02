import "react-photo-view/dist/react-photo-view.css";

import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { WatchStatus, type Watch } from "@/types/watch";
import WatchForm from "./watch-form";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const adjustStatus = (status: string) => {
  const { DRAFTED, PUBLISHED, ARCHIVED } = WatchStatus;
  switch (status) {
    case PUBLISHED:
      return "success";
    case DRAFTED:
      return "secondary";
    case ARCHIVED:
      return "archived";
    default:
      return "outline";
  }
};

const ActionCell = ({ row }: { row: any }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutationDelete = useMutation({
    mutationFn: (watchId: string) => watchApi.delete(watchId),
    onSuccess: () => {
      toast.success("Xóa đồng hồ thành công");
      queryClient.invalidateQueries({ queryKey: ["watches"] });
    },
    onError: () => {
      toast.error("Xóa đồng hồ thất bại");
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
            <h3 className="font-semibold text-lg">Xác Nhận Xóa</h3>
          </DialogHeader>
          <p>
            Bạn có chắc chắn xóa
            <span className=" mx-2 text-red-500 underline">
              {row.original.name}
            </span>
            ?
          </p>
          <AlertDialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="secondary">
              Hủy
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Xóa
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
    header: "Hình Ảnh",
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
    header: "Tên",
  },
  {
    accessorKey: "gender",
    header: "Giới Tính",
  },
  {
    accessorKey: "brand.name",
    header: "Thương Hiệu",
  },
  {
    accessorKey: "price",
    header: "Giá",
  },
  {
    accessorKey: "status",
    header: "Tình Trạng",
    cell: ({ row }: { row: any }) => {
      const queryClient = useQueryClient();
      const queryKey = ["watches"];
      const currentStatus = row.original.status;
      const watchId = row.original.id;

      const mutation = useMutation({
        mutationFn: (data: { watchId: string; status: string }) =>
          watchApi.updateStatus(data.watchId, data.status),

        onMutate: async (updatedWatch) => {
          await queryClient.cancelQueries({ queryKey });
          const previousWatches = queryClient.getQueryData(queryKey);
          queryClient.setQueryData(queryKey, (oldData: any[]) =>
            oldData.map((watch) =>
              watch.id === updatedWatch.watchId
                ? { ...watch, status: updatedWatch.status }
                : watch
            )
          );
          return { previousWatches };
        },

        onError: (err, updatedWatch, context) => {
          toast.error("Thay đổi trạng thái thất bại");
          if (context?.previousWatches) {
            queryClient.setQueryData(queryKey, context.previousWatches);
          }
        },

        onSuccess: () => {
          toast.success("Thay đổi trạng thái thành công");
        },
      });

      return (
        <div>
          <Select
            value={currentStatus}
            onValueChange={(value) => {
              mutation.mutate({
                watchId: watchId,
                status: value.toUpperCase(),
              });
            }}
          >
            <SelectTrigger className="w-[150px] border-none focus:ring-0 shadow-none">
              <SelectValue>
                <Badge variant={adjustStatus(currentStatus)}>
                  {currentStatus}
                </Badge>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="w-[150px]">
              {Object.values(WatchStatus).map((status, idx) => (
                <SelectItem key={idx} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Chức Năng",
    cell: ({ row }: { row: any }) => <ActionCell row={row} />,
  },
];
