"use client";
import DashboardTabs from "./dashboard-tabs";
import { useDashboard } from "@/queries/use-dashboard";
import LowStockTable from "./low-stock-table";
import TopProductsTable from "./top-products-table";
import WorstProductsTable from "./worst-products-table";
import NoSoldProducts from "./no-sold-products-table";

export default function Dashboard() {
  const { data: dashboard } = useDashboard();

  return (
    <main className="flex flex-col gap-4 p-4">
      <DashboardTabs data={dashboard} />
      <div className="grid gap-4 grid-cols-2">
        <LowStockTable data={dashboard?.totalLowStockProducts} />
        <NoSoldProducts data={dashboard?.zeroSold} />
        <TopProductsTable data={dashboard?.mostSold} />
        <WorstProductsTable data={dashboard?.leastSold} />
      </div>
    </main>
  );
}
