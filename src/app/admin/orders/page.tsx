"use client";
import React from "react";
import { columns, Order, Paid, Status } from "./columns";
import DataTable from "./data-table";
const data: Order[] = [
  {
    id: "1",
    name: "John Doe",
    price: 100,
    paid: Paid.Yes,
    status: Status.Pending,
    updatedAt: "2021-01-01",
  },
];
const UserPage = () => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default UserPage;
