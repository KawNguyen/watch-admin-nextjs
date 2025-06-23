import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Checkbox } from "@/components/ui/checkbox";
import { Watch } from "@/types/watch";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import WatchForm from "./watch-form";

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
    header: "Poster",
    // cell: ({ row }: { row: any }) => {
    //   return (
    //     <div className="h-12 w-8">
    //       <AspectRatio ratio={2 / 3}>
    //         <Image
    //           src={row.original.poster[0].url}
    //           alt={row.original.name}
    //           width={40}
    //           height={60}
    //           className="object-cover"
    //         />
    //       </AspectRatio>
    //     </div>
    //   );
    // },
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
