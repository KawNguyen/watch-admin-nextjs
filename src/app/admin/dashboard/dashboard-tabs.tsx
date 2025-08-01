"use client";
import RevenueCards from "./revenue-cards";
import RevenueChart from "./revenue-chart";
import OrdersChart from "./orders-chart";
import { Card } from "@/components/ui/card";

interface Props {
  data: any[];
}

export default function DashboardTabs({ data }: Props) {
  return (
    <div className="space-y-4">
      <RevenueCards data={data} />
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <RevenueChart data={data} />
          <OrdersChart data={data} />
        </div>
      </Card>
    </div>
  );
}
