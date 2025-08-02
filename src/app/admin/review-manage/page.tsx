import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReview } from "@/queries/use-review";
import ReviewDataTable from "./_components/review-data-table";

export const metadata: Metadata = {
  title: "Admin | Đánh Giá",
};

export default async function ReviewPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["reviews"],
    queryFn: useReview,
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle>Đánh Giá</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ReviewDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
