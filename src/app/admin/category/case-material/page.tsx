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
import CaseMaterialsDataTable from "./_components/case-material-data-table";
import CaseMaterialForm from "./_components/case-material-form";


export const metadata: Metadata = {
  title: "Admin | Watches",
  description: "Manage watches in the admin panel",
};

export default async function CaseMaterialsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["materials"],
    queryFn: () =>
      import("@/queries/use-material").then((mod) => mod.useMaterials()),
  });

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div>
            <CardTitle>Watches</CardTitle>
            <CardDescription>Manage watches</CardDescription>
          </div>

          <CaseMaterialForm mode="create" />
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CaseMaterialsDataTable/>
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
