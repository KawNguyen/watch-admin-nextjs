import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import StockDataTable from "./_components/stock-data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin | Stock",
  description: "Manage stock in the admin panel",
};

export default async function StocksPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["stockEntries"],
    queryFn: () =>
      import("@/queries/use-stock-entry").then((mod) => mod.useStockEntry()),
  });

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div>
            <CardTitle>Stock List</CardTitle>
            <CardDescription>Manage import</CardDescription>
          </div>
          <Link
            href="/admin/stock/create"
            className={buttonVariants({ variant: "default" })}
          >
            Create Stock Entry
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <StockDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
