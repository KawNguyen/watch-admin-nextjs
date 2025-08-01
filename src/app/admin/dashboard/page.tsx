"use client";
import DashboardTabs from "./dashboard-tabs";
import { useDashboard } from "@/queries/use-dashboard";
import LowStockTable from "./low-stock-table";
import TopProductsTable from "./top-products-table";
import WorstProductsTable from "./worst-products-table";
import NoSoldProducts from "./no-sold-products-table";

import { DatePickerWithRange } from "./calendar";
import { TodayStatisticCard } from "./_components/today-statistic-card";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";

export default function Dashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: subDays(new Date(), 1),
  });
  const { data: dashboard } = useDashboard();

  const fromDate = date?.from ? format(date.from, "yyyy-MM-dd") : undefined;
  const toDate = date?.to ? format(date.to, "yyyy-MM-dd") : undefined;

  console.log(fromDate, toDate);

  return (
    <main className="flex flex-col gap-4 p-4">
      <DatePickerWithRange
        className="w-fit"
        defaultType="month"
        onDateChange={(dateRange) => {
          setDate(dateRange);
        }}
      />

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <DashboardTabs data={dashboard} />
        </div>

        <div className="col-span-1">
          <TodayStatisticCard />
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
