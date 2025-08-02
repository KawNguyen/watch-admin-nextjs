import React from "react";
import StockForm from "./_components/stock-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin | Nhập Hàng",
};
export default function CreatePage() {
  return <StockForm />;
}
