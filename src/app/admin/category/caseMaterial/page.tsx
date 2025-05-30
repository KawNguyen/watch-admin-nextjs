"use client";
import { useCaseMaterialData } from "@/hooks/use-CaseMaterial";
import { columns } from "./columns";
import DataTable from "./data-table";

export default function CaseMaterialPage() {
  const { data, isLoading } = useCaseMaterialData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} isLoading={isLoading} data={data || []} />
    </div>
  );
}
