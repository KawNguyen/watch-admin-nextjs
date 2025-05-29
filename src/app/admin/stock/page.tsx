"use client";
import React from "react";
import { columns } from "./columns";
import DataTable from "./data-table";
import { useStockData } from "@/hooks/useStock";
// const data: Stock[] = [
//   {
//     id: "1",
//     totalPrice: 1,
//     createdAt: "1/1/2021",
//   },
// ];
const StockPage = () => {
  const{data,isLoading}=useStockData();
  return (
    <div>
      <DataTable columns={columns} isLoading={isLoading} data={data} />
    </div>
  );
};

export default StockPage;
