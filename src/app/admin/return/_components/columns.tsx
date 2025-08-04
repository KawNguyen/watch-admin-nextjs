import type { ColumnDef } from "@tanstack/react-table";
import { Return } from "@/types/return";
import { Badge } from "@/components/ui/badge";
import { ReturnDetailDialog } from "./detail-return-request";

export const columns: ColumnDef<Return>[] = [
  {
    accessorKey: "orderId",
    header: "Mã Đơn Hàng",
  },
  {
    header: "Khách Hàng",
    cell: ({ row }: { row: any }) => {
      const fullName = `${row.original.user?.firstName} ${row.original.user?.lastName}`;
      return <span>{fullName}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Trạng Thái",
    cell: ({ row }: { row: any }) => {
      const status = row.original.status;

      const statusMap: Record<string, { label: string; color: string }> = {
        PENDING: {
          label: "Chờ Xét Duyệt",
          color: "bg-yellow-100 text-yellow-800",
        },
        APPROVED: {
          label: "Đã Duyệt",
          color: "bg-green-100 text-green-800",
        },
        REJECTED: {
          label: "Từ Chối",
          color: "bg-red-100 text-red-800",
        },
        COMPLETED: {
          label: "Hoàn Thành",
          color: "bg-green-100 text-green-800",
        },
      };

      const { label, color } = statusMap[status] || {
        label: "Không Rõ",
        color: "bg-gray-100 text-gray-800",
      };

      return <Badge className={color}>{label}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    header: "Chức Năng",
    cell: ({ row }: { row: any }) => {
      const returnData = row.original;
      return <ReturnDetailDialog data={returnData} />;
    },
  },
];
