"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { z } from "zod";
import type { orderSchema } from "@/schema/order";
import { orderApi } from "@/services/create-order";
import OrderForm from "../_components/order-form";

type OrderFormValues = z.infer<typeof orderSchema>;

export default function CreateOrderPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: OrderFormValues) => orderApi.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Tạo đơn hàng thành công");
      router.push("/admin/orders");
    },
    onError: (err) => {
      toast.error("Tạo đơn hàng thất bại");
      console.log(err);
    },
  });

  const handleSubmit = (data: OrderFormValues) => {
    mutation.mutate(data);
  };

  return (
    <OrderForm
      mode="create"
      onSubmit={handleSubmit}
      isLoading={mutation.isPending}
    />
  );
}
