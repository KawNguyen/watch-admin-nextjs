import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CaseMaterialsDataTable from "./_components/case-material-data-table";
import CaseMaterialForm from "./_components/case-material-form";

export const metadata: Metadata = {
  title: "Admin | Chất Liệu Vỏ",
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
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle>Chất Liệu Vỏ</CardTitle>
          </div>
          <CaseMaterialForm mode="create" />
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CaseMaterialsDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
