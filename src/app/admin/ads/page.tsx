import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import AdvertisementForm from "./_components/ads-form";
import AdsDataTable from "./_components/ads-data-table";
import { useAdvertisement } from "@/queries/use-advertisement";

export const metadata: Metadata = {
  title: "Admin | Adsvertisements",
  description: "Manage advertisements in the admin panel",
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
        <div className="w-full flex items-center justify-between">
          <div>
            <CardTitle>Advertisment</CardTitle>
            <CardDescription>Manage advertisement</CardDescription>
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
