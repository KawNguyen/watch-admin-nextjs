"use client";
import React from "react";
import { columns, Role, User } from "./columns";
import DataTable from "./data-table";
const data: User[] = [
  {
    email: "abc",
    password: "123",
    role: Role.User,
    createdAt: "1/1/2021",
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
