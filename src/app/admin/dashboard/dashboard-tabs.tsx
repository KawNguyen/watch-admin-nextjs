"use client";
import RevenueCards from "./revenue-cards";
import RevenueChart from "./revenue-chart";


interface Props {
  data: any[];
}

export default function DashboardTabs({ data }: Props) {
  return (
    <div className="space-y-4">
      
      <RevenueCards data={data} />

      <RevenueChart data={data} />
      {/* <OrdersChart data={data} /> */}
    </div>
  );
}
