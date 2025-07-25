import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Inventory } from "@/types/inventory";

export const columns: ColumnDef<Inventory>[] = [
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
    accessorKey: "watchId",
    header: "Watch Id",
  },
  {
    accessorKey: "watch.name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      const lowStockThreshold = row.original.lowStockThreshold;
      return (
        <div>
          {quantity > lowStockThreshold ? (
            <span className="text-green-500 font-bold">{quantity}</span>
          ) : (
            <span className="text-red-500 font-bold">{quantity}</span>
          )}
        </div>
      );
    },
  },
];
