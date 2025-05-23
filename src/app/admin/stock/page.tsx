"use client";
import React from "react";
import { columns, Stock } from "./columns";
import DataTable from "./data-table";
const data: Stock[] = [
  {
    id: "1",
    totalPrice: 1,
    createdAt: "1/1/2021",
  },
];
const StockPage = () => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default StockPage;
