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
import { useAdvertisement } from "@/queries/use-advertisement";
import AdsDataTable from "./_components/ads-data-table";
import AdvertisementForm from "./_components/ads-form";

export const metadata: Metadata = {
  title: "Admin | Quảng Cáo",
};

export default async function AdsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["advertisements"],
    queryFn: useAdvertisement,
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle>Quảng Cáo</CardTitle>
            <CardDescription>Thêm quảng cáo thu hút khách hàng</CardDescription>
          </div>

          <AdvertisementForm mode="create" />
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AdsDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
