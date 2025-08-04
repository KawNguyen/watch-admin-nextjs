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
import { useReturn } from "@/queries/use-return";
import ReturnDataTable from "./_components/return-data-table";

export const metadata: Metadata = {
  title: "Admin | Đổi Trả Sản Phẩm",
};

export default async function AdsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["returns"],
    queryFn: useReturn,
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle>Đổi Trả Sản Phẩm</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ReturnDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
