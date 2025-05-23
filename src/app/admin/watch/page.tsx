"use client";
import React from "react";
import { columns, Gender, Watch } from "./columns";
import DataTable from "./data-table";
const data: Watch[] = [
  {
    id: "string",
    name: "prx",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSvJDhvtes6TVRO7eYz6JKeY2e0vZjbMSjSw&s",
    brand: "b",
    price: 1,
    gender: Gender.Unisex,
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
