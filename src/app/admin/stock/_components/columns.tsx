import { ColumnDef } from "@tanstack/react-table";
import { StockEntry } from "@/types/stock-entry";
import StockForm from "../create/stock-form";

const ActionCell = ({ row }: { row: any }) => {
  return (
    <div className="flex items-center gap-2">
      <StockForm mode="view" stockData={row.original} />
      <StockForm mode="edit" stockData={row.original} />
    </div>
  );
};
const StockItemsCell = ({ row }: { row: any }) => {
  const items = row.original.stockItems as {
    watchId: string;
    quantity: number;
    price: number;
  }[];

  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <div key={index} className="text-sm">
          🕒 <strong>{item.watchId}</strong> — SL: {item.quantity}, Giá:{" "}
          {item.price}
        </div>
      ))}
    </div>
  );
};

export const columns: ColumnDef<StockEntry>[] = [
  {
    accessorKey: "addedById",
    header: "Added By",
  },
  {
    id: "stockItems",
    header: "Stock Items",
    cell: StockItemsCell,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
