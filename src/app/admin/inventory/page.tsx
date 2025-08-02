import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InventoryDataTable from "./_components/inventory-data-table";
import { useInventory } from "@/queries/use-inventory";

export const metadata: Metadata = {
  title: "Admin | Kho",
};

export default async function InventoryPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["inventories"],
    queryFn: useInventory,
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle>Kho</CardTitle>
            <CardDescription>Quản lý số lượng tồn của sản phẩm</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <InventoryDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
