"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart } from "lucide-react";
import CountUp from "@/components/count-up";

interface Props {
  data: any;
}

export default function DashboardTabs({ data }: Props) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Doanh Thu</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold">
                <CountUp
                  to={data?.totalRevenue || 0}
                  duration={1}
                  formatAsCurrency
                />
              </span>
              <span className="text-xs text-muted-foreground">
                Tổng số doanh thu trong kỳ
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Tổng đơn hàng
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold">
                <CountUp to={data?.totalOrders || 0} separator="." />
                {/* {data?.totalOrders || 0} */}
              </span>
              <span className="text-xs text-muted-foreground">
                Số đơn hàng đã bán
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Số món bán ra
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold">
                <CountUp to={data?.totalItemsSold || 0} separator="." />
                {/* {data?.totalItemsSold || 0} */}
              </span>
              <span className="text-xs text-muted-foreground">
                Tổng số sản phẩm đã bán
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* <StatusPieChart data={data} /> */}
    </>
  );
}
