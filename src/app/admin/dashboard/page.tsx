"use client";
import DashboardTabs from "./dashboard-tabs";
import { useDashboard } from "@/queries/use-dashboard";
import LowStockTable from "./low-stock-table";
import TopProductsTable from "./top-products-table";
import WorstProductsTable from "./worst-products-table";
import NoSoldProducts from "./no-sold-products-table";

import { DatePickerWithRange } from "./calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";
import RevenueChart from "./revenue-chart";
import { StatusPieChart } from "./_components/status-cards";

export default function Dashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: subDays(new Date(), 1),
  });

  const fromDate = date?.from ? format(date.from, "yyyy-MM-dd") : undefined;
  const toDate = date?.to ? format(date.to, "yyyy-MM-dd") : undefined;

  const { data: dashboard } = useDashboard({
    startDate: fromDate,
    endDate: toDate,
  });

  return (
    <main className="flex flex-col gap-4 p-4">
      <DatePickerWithRange
        date={date}
        setDate={setDate}
        className="w-fit"
        defaultType="month"
        onDateChange={(dateRange) => {
          setDate(dateRange);
        }}
      />

      <DashboardTabs data={dashboard} />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <RevenueChart data={dashboard} />
        </div>
        <div className="col-span-4">
          <StatusPieChart data={dashboard} />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2">
        <LowStockTable data={dashboard?.lowStockProducts} />
        <NoSoldProducts data={dashboard?.zeroSold} />
        <TopProductsTable data={dashboard?.mostSold} />
        <WorstProductsTable data={dashboard?.leastSold} />
      </div>
    </main>
  );
}
