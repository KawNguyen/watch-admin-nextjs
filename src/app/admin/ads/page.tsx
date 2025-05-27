"use client";
import React from "react";
import { columns } from "./columns";
import DataTable from "./data-table";
import { useAds } from "@/hooks/useAds";
const WatchPage = () => {
  const { data, isLoading } = useAds();
  return (
    <div>
      <DataTable columns={columns} isLoading={isLoading} data={data} />
    </div>
  );
};

export default WatchPage;
