import { z } from "zod";

export const orderSchema = z.object({
  // addressId: z.string().min(1, 'Address Id is required'),
  couponId: z.string().optional(),
  shippingNotes: z.string().optional(),
  paymentMethod: z.string().min(1, "Payment is required"),
  totalPrice: z.number().min(1),
  orginalPrice: z.number().optional(),
  orderItems: z.array(
    z.object({
      watchId: z.string().min(1, "Watch ID is required"),
      quantity: z.number().int().min(1, "Quantity must be at least 1"),
      price: z.number().min(0, "Price must be a non-negative number"),
    })
  ),
  walkinInformation: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().min(1, "Phone is required"),
    street: z.string().min(1, "Street address is required"),
    province: z.string().min(1, "Province is required"),
    district: z.string().min(1, "District is required"),
    ward: z.string().min(1, "Ward is required"),
  }),
});
