import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import WatchForm from './_components/watch-form';
import WatchesDataTable from './_components/watches-data-table';

export const metadata: Metadata = {
  title: 'Admin | Watches',
  description: 'Manage watches in the admin panel',
};

export default async function WatchesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['watches'],
    queryFn: () =>
      import('@/queries/use-watches').then((mod) => mod.useWatches()),
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle>Watches</CardTitle>
            <CardDescription>Manage watches</CardDescription>
          </div>

          <WatchForm mode="create" />
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <WatchesDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
