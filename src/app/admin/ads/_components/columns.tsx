import { useMutation } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { queryClient } from "@/components/provider/provider";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { advertisementApi } from "@/services/ads";
import type { Advertisment } from "@/types/advertisement";
import AdvertisementForm from "./ads-form";
import { formatDate } from "@/lib";
import { Switch } from "@/components/ui/switch";

const ActionCell = ({ row }: { row: any }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutationDelete = useMutation({
    mutationFn: (adsId: string) => advertisementApi.deleteAds(adsId),
    onSuccess: () => {
      toast.success("Xóa quảng cáo thành công");
      queryClient.invalidateQueries({ queryKey: ["advertisements"] });
    },
    onError: () => {
      toast.error("Xóa quảng cáo thất bại");
    },
  });
  const handleDelete = () => {
    mutationDelete.mutate(row.original.id);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <AdvertisementForm adsData={row.original} mode="view" />
      <AdvertisementForm adsData={row.original} mode="edit" />
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
              {row.original.title}
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

export const columns: ColumnDef<Advertisment>[] = [
  {
    accessorKey: "imageUrl",
    header: "Hình Ảnh",
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl;
      return (
        <div className="relative h-16 w-16">
          {imageUrl ? (
            <Image
              alt={row.getValue("title")}
              className="rounded-md object-cover"
              fill
              priority
              sizes="(max-width: 64px) 100vw, 64px"
              src={imageUrl}
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
              <span className="text-muted-foreground text-xs">
                Chưa có hình
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Tiêu Đề",
  },
  {
    accessorKey: "link",
    header: "Đường Dẫn",
  },
  {
    accessorKey: "isActive",
    header: "Trạng Thái",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return isActive == true ? (
        <Switch
          checked={isActive}
          className="h-5 w-9"
          onCheckedChange={(value) => {
            row.original.isActive = value;
            queryClient.invalidateQueries({ queryKey: ["advertisements"] });
          }}
        />
      ) : (
        <Switch
          checked={isActive}
          className="h-5 w-9"
          onCheckedChange={(value) => {
            row.original.isActive = value;
            queryClient.invalidateQueries({ queryKey: ["advertisements"] });
          }}
        />
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Từ",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      return formatDate(date);
    },
  },
  {
    accessorKey: "endDate",
    header: "Đến",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      return formatDate(date);
    },
  },
  {
    accessorKey: "actions",
    header: "Chức Năng  ",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
