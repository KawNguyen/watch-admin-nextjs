"use client";
import React from "react";
import { columns } from "./columns";
import DataTable from "./data-table";
import { useWatchData } from "@/hooks/useWatch";
// const data: Watch[] = [
//   {
//     id: "string",
//     name: "prx",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSvJDhvtes6TVRO7eYz6JKeY2e0vZjbMSjSw&s",
//     brand: "b",
//     price: 1,
//     gender: Gender.Unisex,
//   },
// ];
const WatchPage = () => {
  const { data, isLoading } = useWatchData();
  return (
    <div>
      <DataTable columns={columns} isLoading={isLoading} data={data} />
    </div>
  );
};

export default WatchPage;
