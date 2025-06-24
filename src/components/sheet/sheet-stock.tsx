"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { v4 as uuidv4 } from "uuid";
import { StockDetail } from "@/app/admin/stock/columns";
import { StockAPI } from "@/services/stock";

const formSchema = z.object({
  productId: z.string().min(1, "Product selection is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
});

const SheetStock = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="ml-4">
        <Button>Add Stock</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-8">
          <SheetTitle>Add Stock Entry</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Product <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Watch 1</SelectItem>
                      <SelectItem value="2">Watch 2</SelectItem>
                      <SelectItem value="3">Watch 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quantity <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Enter quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type="submit">Add to Stock</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetStock;

// const [stockItems, setStockItems] = useState<StockDetail[]>([]);
// const [totalPrice, setTotalPrice] = useState(0);
// const [stockId, setStockId] = useState("");
// const [createdAt, setCreatedAt] = useState("");

// const handleAddToStock = () => {
//   const newStockId = uuidv4();
//   setStockId(newStockId);
//   setCreatedAt(new Date().toISOString());
//   const total = stockItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
//   setTotalPrice(total);
// };

// const handleSave = async () => {
//   await StockAPI.createStock({
//     stockId,
//     totalPrice,
//     createdAt,
//     stockDetail: stockItems.map(item => ({
//       productId: item.productId,
//       quantity: item.quantity,
//       price: item.price
//     }))
//   });
// };
