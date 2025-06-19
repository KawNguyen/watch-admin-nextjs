"use client";
import { useMaterials } from "@/queries/use-material";
import { columns } from "./columns";
import DataTable from "./data-table";

export default function CaseMaterialPage() {
  const { data, isLoading } = useMaterials();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} isLoading={isLoading} data={data || []} />
    </div>
  );
}
