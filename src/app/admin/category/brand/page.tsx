"use client";
import { useBrand } from "@/hooks/use-brand";
import { columns } from "./columns";
import DataTable from "./data-table";

export default function BrandPage() {
  const {data, isLoading} =  useBrand()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} isLoading={isLoading} data={data || []} />
    </div>
  );
}
