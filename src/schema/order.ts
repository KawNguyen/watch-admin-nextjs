import { z } from "zod";

export const orderSchema = z.object({
  couponId: z.string().optional(),
  shippingNotes: z.string().optional(),
  paymentMethod: z
    .string()
    .min(1, "Phương thức thanh toán không được bỏ trống"),
  totalPrice: z.number().min(1),
  originalPrice: z.number().optional(),
  orderItems: z.array(
    z.object({
      watchId: z.string().min(1, "ID đồng hồ không được bỏ trống"),
      quantity: z.number().int().min(1, "Số lượng ít nhất là 1"),
      price: z.number().min(0, "Giá tiền phải là một số lớn hơn 0"),
    })
  ),
  walkinInformation: z.object({
    firstName: z.string().min(1, "Tên không được bỏ trống"),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().min(1, "Số điện thoại không được bỏ trống"),
  }),
  deliveryAddress: z.object({
    street: z.string().min(1, "Số nhà không được bỏ trống"),
    provinceName: z.string().optional(),
    districtName: z.string().optional(),
    wardName: z.string().optional(),
  }),
});
