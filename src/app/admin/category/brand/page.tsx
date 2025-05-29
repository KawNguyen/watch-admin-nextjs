"use client";
import { useBrandData } from "@/hooks/use-Brand";
import { columns } from "./columns";
import DataTable from "./data-table";

export default function BrandPage() {
  const { data, isLoading } = useBrandData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} isLoading={isLoading} data={data || []} />
    </div>
  );
}
