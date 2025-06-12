"use client"

import { DataTable } from "@/components/data-table/data-table";
import { useWatches } from "@/queries/use-watches";
import { columns } from "./columns";

export default function WatchesDataTable() {
    const { data, isLoading } = useWatches();
    const watches = data?.data?.items || []

    if (isLoading) return "Loading..."

    return <DataTable columns={columns} data={watches} searchKey="name" />

}