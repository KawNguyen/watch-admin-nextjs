import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CouponsDataTable from "./_components/coupon-data-table";
import CouponForm from "./_components/coupon-form";

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
            <CardTitle>Coupon</CardTitle>
            <CardDescription>Manage coupons</CardDescription>
          </div>
          <CouponForm mode="create" />
        </div>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CouponsDataTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
