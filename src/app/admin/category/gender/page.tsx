"use client";
import { useGenderData } from "@/hooks/useGender";
import { columns } from "./columns";
import DataTable from "./data-table";

export default function CategoryPage() {
  const { data,isLoading } = useGenderData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} isLoading={isLoading} data={data || []} />
    </div>
  );
}
