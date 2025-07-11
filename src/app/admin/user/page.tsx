import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserForm from './_components/user-form';
import UsersDataTable from './_components/users-data-table';

export default async function UsersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: () => import('@/queries/use-user').then((mod) => mod.useUsers()),
  });
  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage users</CardDescription>
          </div>

          <UserForm mode="create" />
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
