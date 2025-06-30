"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useWatches } from "@/queries/use-watches";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

export default function WatchesDataTable() {
  const { data, isFetching } = useWatches();
  const watches = data?.data?.items || [];

  if (isFetching) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-[300px]" />
        <div className="rounded-md border">
          <div className="h-16 border-b bg-muted/50 px-4 flex items-center">
            <Skeleton className="h-4 w-[250px]" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-16 border-b last:border-b-0 px-4 flex items-center space-x-4"
            >
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-12 w-8" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={watches}
      searchKey="name"
    />
  );
}
