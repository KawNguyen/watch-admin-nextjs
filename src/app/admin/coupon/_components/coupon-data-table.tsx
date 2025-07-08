'use client';

import { DataTable } from '@/components/data-table/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { useCoupon } from '@/queries/use-coupon';
import { columns } from './columns';

export default function CouponsDataTable() {
  const { data, isLoading } = useCoupon();
  const coupons = data?.data?.items || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-[300px]" />
        <div className="rounded-md border">
          <div className="flex h-16 items-center border-b bg-muted/50 px-4">
            <Skeleton className="h-4 w-[250px]" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              className="flex h-16 items-center space-x-4 border-b px-4 last:border-b-0"
              key={i}
            >
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-12 w-8" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <DataTable columns={columns} data={coupons} searchKey="code" />;
}
