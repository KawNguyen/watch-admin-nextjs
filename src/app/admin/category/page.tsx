"use client";
import React from "react";
import { columns, Gender, Category } from "./columns";
import DataTable from "./data-table";
const data: Category[] = [
  {
    id: "1",
    name: "John Doe",
    gender: Gender.Men,
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
