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
import MovementsDataTable from './_components/movement-data-table';
import MovementForm from './_components/movement-form';

export default async function MovementsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['movements'],
    queryFn: () =>
      import('@/queries/use-movement').then((mod) => mod.useMovements()),
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle>Movement</CardTitle>
            <CardDescription>Manage movements</CardDescription>
          </div>

          <MovementForm mode="create" />
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MovementsDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
