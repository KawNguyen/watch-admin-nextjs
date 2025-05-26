"use client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { columns } from "./columns";
import DataTable from "./data-table";
import { useCategoryData } from "@/hooks/useCategory";

const queryClient = new QueryClient();
const dehydrateState = dehydrate(queryClient);

export default function CategoryPage() {
  const { data } = useCategoryData();
  return (
    <main className="container mx-auto py-10">
      <HydrationBoundary state={dehydrateState}>
        <DataTable columns={columns} data={data || []} />
      </HydrationBoundary>
    </main>
  );
}
