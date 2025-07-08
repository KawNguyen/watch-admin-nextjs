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
import { useBrands } from '@/queries/use-brand';
import BrandsDataTable from './_components/brand-data-table';
import BrandForm from './_components/brand-form';

export const metadata: Metadata = {
  title: 'Admin | Brands',
  description: 'Manage brands in the admin panel',
};

export default async function BrandsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['brands'],
    queryFn: useBrands,
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle>Brands</CardTitle>
            <CardDescription>Manage brands</CardDescription>
          </div>

          <BrandForm mode="create" />
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <BrandsDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
