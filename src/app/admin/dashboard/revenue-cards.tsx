"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart } from "lucide-react";
import { formatMoney } from "@/lib";
import React from "react";
import { Separator } from "@/components/ui/separator";

interface Props {
  data: any;
}

export default function RevenueCards({ data }: Props) {
  return (
    <div className="grid gap-4 grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Doanh Thu</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">
              {formatMoney(data?.totalRevenue || 0)}
            </span>
            <span className="text-xs">Tổng số doanh thu trong kỳ</span>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium"> Hóa Đơn</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">{data?.totalOrders || 0}</span>
            <span className="text-xs">Tổng số đơn hàng đã bán</span>
          </div>

          <Separator />

          <div className="flex justify-around text-gray-500">
            {data?.orderStatusCounts?.map((p: any) => (
              <div key={p.status}>
                {p.status === "COMPLETED" ? "Hoàn Thành" : "Hủy"}:{" "}
                {p._count._all || 0}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
