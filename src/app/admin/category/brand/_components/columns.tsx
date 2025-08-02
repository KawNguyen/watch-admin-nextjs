import { useMutation } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import BrandForm from "@/app/admin/category/brand/_components/brand-form";
import { queryClient } from "@/components/provider/provider";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { brandApi } from "@/services/brand";
import type { Brand } from "@/types/brand";

const ActionCell = ({ row }: { row: any }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutationDelete = useMutation({
    mutationFn: (brandId: string) => brandApi.deleteBrand(brandId),
    onSuccess: () => {
      toast.success("Xóa thương hiệu thành công");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: () => {
      toast.error("Xóa thương hiệu thất bại");
    },
  });
  const handleDelete = () => {
    mutationDelete.mutate(row.original.id);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <BrandForm brandData={row.original} mode="view" />
      <BrandForm brandData={row.original} mode="edit" />
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
            Bạn có chắc chắn xóa thương hiệu
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

export const columns: ColumnDef<Brand>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
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
    accessorKey: "image",
    header: "Logo",
    cell: ({ row }) => {
      const image = row.original.image;

      return (
        <div className="relative h-16 w-16">
          {image ? (
            <Image
              alt={row.getValue("name")}
              className="rounded-md object-cover"
              fill
              priority
              sizes="(max-width: 64px) 100vw, 64px"
              src={
                image.absolute_url || (image?.update?.absolute_url as string)
              }
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
              <span className="text-muted-foreground text-xs">No image</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "country",
    header: "Nguồn Gốc",
  },
  {
    accessorKey: "actions",
    header: "Chức Năng",

    cell: ({ row }: { row: any }) => <ActionCell row={row} />,
  },
];
