"use client";
import React from "react";
import {  columns } from "./columns";
import DataTable from "./data-table";
import { useCouponData } from "@/hooks/useCoupon";
// const data: Coupon[] = [
//   {
//     id: "1",
//   code: "xxx",
//   discount: 10,
//   startDate: "2021-01-01",
//   endDate: "2021-01-01",
//   status: Status.Active,
//   },
// ];
const CouponPage = () => {
  const{data,isLoading}=useCouponData();
  return (
    <div>
      <DataTable columns={columns} isLoading={isLoading} data={data} />
    </div>
  );
};

export default CouponPage;
