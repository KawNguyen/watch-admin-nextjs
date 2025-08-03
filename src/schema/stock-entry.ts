import { z } from "zod";

export const StockSchema = z.object({
  createdBy: z.string().min(1, "ID người nhập không được bỏ trống"),
  stockItems: z.array(
    z.object({
      watchId: z.string().min(1, "ID đồng hồ không được bỏ trống"),
      quantity: z.number().int().min(1, "Số lượng ít nhất là 1"),
      costPrice: z.number().min(0, "Giá tiền phải là một số lớn hơn 0"),
    })
  ),
  notes: z.string().optional(),
});
