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
import CouponForm from "./_components/coupon-form";
import CouponDataTable from './_components/coupon-data-table';
export const metadata: Metadata = {
  title: "Admin | Watches",
  description: "Manage watches in the admin panel",
};

export default async function CouponsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["coupons"],
    queryFn: () =>
      import("@/queries/use-coupon").then((mod) => mod.useCoupon()),
  });


  return (
    <Card>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div>
            <CardTitle>Watches</CardTitle>
            <CardDescription>Manage watches</CardDescription>
          </div>

          <CouponForm mode="create" />
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CouponDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
