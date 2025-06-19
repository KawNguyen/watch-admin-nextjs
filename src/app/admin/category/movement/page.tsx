"use client";
import { useMovements } from "@/queries/use-movement";
import { columns } from "./columns";
import DataTable from "./data-table";

export default function MovementPage() {
  const { data, isLoading } = useMovements();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} isLoading={isLoading} data={data || []} />
    </div>
  );
}
