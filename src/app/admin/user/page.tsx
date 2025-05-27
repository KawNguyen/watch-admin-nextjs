"use client";
import { useUserData } from "@/hooks/useUser";
import { columns } from "./columns";
import DataTable from "./data-table";

export default function UserPage() {
  const { data,isLoading } = useUserData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns}  isLoading={isLoading}  data={data || []} />
    </div>
  );
}
