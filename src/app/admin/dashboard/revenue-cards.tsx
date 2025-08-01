"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart } from "lucide-react";
import { formatMoney } from "@/lib";
import React from "react";
import { DatePickerWithRange } from "./calendar";

interface Props {
  data: any;
}

export default function RevenueCards({ data }: Props) {
  return (
    <div className="grid gap-4 grid-cols-3">
      <Card>
        <DatePickerWithRange
          defaultType="month"
          onDateChange={(dateRange, type) => {
            console.log(dateRange);
            console.log(type);
          }}
        />
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium"> Doanh Thu</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">
            {formatMoney(data?.totalPrice)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium"> Hóa Đơn</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">
            Trong ngày: {data?.totalOrders}
          </div>
          <div className="flex justify-around text-gray-500">
            {data?.totalOrderByStatus.map((p: any) => (
              <div key={p.status}>
                {p.status === "COMPLETED" ? "Hoàn Thành" : "Hủy"}:{" "}
                {p._count._all}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
