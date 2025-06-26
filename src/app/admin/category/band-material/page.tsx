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
import BandMaterialForm from "./_components/band-material-form";
import BandMaterialsDataTable from "./_components/band-material-data-table";


export const metadata: Metadata = {
  title: "Admin | Watches",
  description: "Manage watches in the admin panel",
};

export default async function BandMaterialsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["bandMaterials"],
    queryFn: () =>
      import("@/queries/use-bandMaterial").then((mod) => mod.useBandMaterials()),
  });

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div>
            <CardTitle>Band Material</CardTitle>
            <CardDescription>Manage band material</CardDescription>
          </div>

          <BandMaterialForm mode="create" />
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <BandMaterialsDataTable/>
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
