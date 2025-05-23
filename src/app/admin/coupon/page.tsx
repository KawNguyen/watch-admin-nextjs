"use client";
import React from "react";
import {  columns, Coupon, Status } from "./columns";
import DataTable from "./data-table";
const data: Coupon[] = [
  {
    id: "1",
  code: "xxx",
  discount: 10,
  startDate: "2021-01-01",
  endDate: "2021-01-01",
  status: Status.Active,
  },
];
const CouponPage = () => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CouponPage;
