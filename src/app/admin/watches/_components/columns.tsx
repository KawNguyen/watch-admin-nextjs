import "react-photo-view/dist/react-photo-view.css";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import { Watch } from "@/types/watch";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import WatchForm from "./watch-form";
import { PhotoView } from "react-photo-view";

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
    cell: ({ row }: { row: any }) => {
      return (
        <div className="flex items-center gap-2">
          <WatchForm mode="view" watchData={row.original} />
          <WatchForm mode="edit" watchData={row.original} />
          <Trash2 className="size-4 text-gray-500 hover:text-black duration-300 cursor-pointer" />
        </div>
      );
    },
  },
];
