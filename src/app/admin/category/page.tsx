"use client";
import { columns } from "./columns";
import DataTable from "./data-table";
import { useCategoryData } from "@/hooks/useCategory";

export default function CategoryPage() {
  const { data,isLoading } = useCategoryData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} isLoading={isLoading} data={data || []} />
    </div>
  );
}
