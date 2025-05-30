"use client";
import { useBandMaterialData } from "@/hooks/use-BandMaterial";
import { columns } from "./columns";
import DataTable from "./data-table";

export default function BandMaterialPage() {
  const { data,isLoading } = useBandMaterialData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} isLoading={isLoading} data={data || []} />
    </div>
  );
}
