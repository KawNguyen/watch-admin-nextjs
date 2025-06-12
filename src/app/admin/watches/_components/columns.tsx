import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Watch } from "@/types/watch";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";

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
        cell: ({ row }: { row: any }) => {
            return <div className="aspect-square"><Image src={row.original.poster[0].url} alt={row.original.name} width={50} height={50} className="object-contain" /></div>
        }
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
            return <div className="flex items-center gap-2">
                <Eye className="size-4 text-gray-500 hover:text-black duration-300 cursor-pointer"/>
                <SquarePen className="size-4 text-gray-500 hover:text-black duration-300 cursor-pointer"/>
                <Trash2 className="size-4 text-gray-500 hover:text-black duration-300 cursor-pointer"/>
            </div>
        }
    },
]