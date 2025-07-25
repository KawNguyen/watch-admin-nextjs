import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersDataTable from "./_components/users-data-table";

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
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage users</CardDescription>
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
