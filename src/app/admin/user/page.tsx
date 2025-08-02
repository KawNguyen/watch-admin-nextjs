import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UsersDataTable from "./_components/users-data-table";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin | Quản Lý Tài Khoản",
};
export default async function UsersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: () => import("@/queries/use-user").then((mod) => mod.useUser()),
  });
  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle>Quản Lý Tài Khoản</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UsersDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
