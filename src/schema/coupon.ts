import { z } from "zod";

export const couponSchema = z.object({
    code:z.string().min(1, "Coupon code is required"),
    description:z.string().min(5, "Description is required"),
    discountType:z.enum(["PERCENT", "AMOUNT"], { 
        errorMap: () => ({ message: "Discount type must be PERCENT or AMOUNT" })
    }),
    discountValue:z.number().min(1, "Discount value must be positive"),
    minOrderValue:z.number().min(1, "Minimum order value must be positive"), 
    count:z.number().min(1, "Count must be positive"),
    usedCount:z.number().min(0, "Used count must be non-negative"),
    startDate:z.date().optional(),
    endDate:z.date().optional(),
    isActive:z.boolean().default(true),
})