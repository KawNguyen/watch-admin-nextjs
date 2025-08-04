import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Support } from "@/types/support";
import SupportDetailDialog from "./support-detail-dialog";
import { Badge } from "@/components/ui/badge";
export const columns: ColumnDef<Support>[] = [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "subject",
    header: "Tiêu Đề",
  },
  {
    accessorKey: "status",
    header: "Trạng Thái",
    cell: ({ row }: { row: any }) => {
      const status = row.original.status;

      const getStatusColor = (status: string) => {
        switch (status) {
          case "UN_CHECKED":
            return "bg-gray-200 text-gray-800";
          case "CHECKED":
            return "bg-yellow-200 text-yellow-800";
          case "RESPONDED":
            return "bg-green-200 text-green-800";
          default:
            return "bg-muted";
        }
      };

      const getStatusLabel = (status: string) => {
        switch (status) {
          case "UN_CHECKED":
            return "Chưa Kiểm Tra";
          case "CHECKED":
            return "Đã Kiểm Tra";
          default:
            return status;
        }
      };

      return (
        <Badge className={getStatusColor(status)}>
          {getStatusLabel(status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Chức Năng",
    cell: ({ row }) => {
      const support = row.original as Support;
      return <SupportDetailDialog support={support} />;
    },
  },
];
