"use client";
import { useBrand } from "@/queries/use-brand";
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
