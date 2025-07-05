import { ColumnDef } from "@tanstack/react-table";
import { StockEntry } from "@/types/stock-entry";
import StockDetailDialog from "../create/_components/stock-detail-dialog";

const ActionCell = ({ row }: { row: any }) => {
  const data = row.original as StockEntry;

  return (
    <div className="flex items-center gap-2">
      <StockDetailDialog data={data} />
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
          <strong>{item.watchId}</strong>
        </div>
      ))}
    </div>
  );
};

export const columns: ColumnDef<StockEntry>[] = [
  {
    accessorKey: "createdBy",
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