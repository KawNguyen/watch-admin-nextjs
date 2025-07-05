import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import StockForm from "./create/stock-form";
import StockDataTable from "./_components/stock-data-table";
import { Button } from "@/components/ui/button";
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
        <div className="w-full flex justify-end">
          <Link href="/admin/stock/create">
            <Button
              className="mt-4 w-full p-4 bg-black text-white"
              variant="link"
            >
              Create Stock Entry
            </Button>
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
