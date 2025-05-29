"use client";
import { columns } from "./columns";
import DataTable from "./data-table";
import { useMovementData } from "@/hooks/use-Movement";

export default function MovementPage() {
  const { data,isLoading } = useMovementData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} isLoading={isLoading} data={data || []} />
    </div>
  );
}
