"use client";
import React from "react";
import { Ads, columns, Status } from "./columns";
import DataTable from "./data-table";
const data: Ads[] = [
  {
    id: "1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSvJDhvtes6TVRO7eYz6JKeY2e0vZjbMSjSw&s",
    status: Status.Active,
  },
];
const WatchPage = () => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default WatchPage;
