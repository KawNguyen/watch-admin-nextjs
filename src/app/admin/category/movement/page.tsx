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
import MovementsDataTable from "./_components/movement-data-table";
import MovementForm from "./_components/movement-form";

export const metadata: Metadata = {
  title: "Admin | Watches",
  description: "Manage watches in the admin panel",
};

export default async function MovementsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movements"],
    queryFn: () =>
      import("@/queries/use-movement").then((mod) => mod.useMovements()),
  });

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div>
            <CardTitle>Watches</CardTitle>
            <CardDescription>Manage watches</CardDescription>
          </div>

          <MovementForm mode="create" />
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MovementsDataTable/>
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
