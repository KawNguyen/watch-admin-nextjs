"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CalendarIcon, Eye, Loader2, Pencil, Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { queryClient } from "@/components/provider/provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { couponSchema } from "@/schema/coupon";
import { couponApi } from "@/services/coupon";
import { Switch } from "@/components/ui/switch";

interface CouponFormProps {
  mode: "create" | "edit" | "view";
  couponData?: any;
}

type CouponFormValues = z.infer<typeof couponSchema>;

export default function CouponForm({ mode, couponData }: CouponFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";

  const mutation = useMutation({
    mutationFn: (data: any) =>
      isEditMode
        ? couponApi.updateCoupon(couponData.id, data)
        : couponApi.createCoupon(data),
  });

  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      description: "",
      discountType: "",
      discountValue: 1,
      minOrderValue: 1,
      count: 1,
      isActive: false,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      if (couponData) {
        form.reset({
          code: couponData.code || "",
          description: couponData.description || "",
          discountType: couponData.discountType || "",
          discountValue: couponData.discountValue || 1,
          minOrderValue: couponData.minOrderValue || 1,
          count: couponData.count || 1,
          isActive: couponData.isActive ?? false,
          startDate: couponData.startDate
            ? new Date(couponData.startDate)
            : new Date(),
          endDate: couponData.endDate
            ? new Date(couponData.endDate)
            : new Date(),
        });
      } else {
        form.reset();
      }
    }
  }, [isOpen, couponData, form]);

  const onSubmit = async (data: CouponFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["coupons"] });
        setIsOpen(false);
        toast.success(
          isEditMode
            ? "Cập nhật mã giảm giá thành công"
            : "Thêm mã giảm giá thành công"
        );
      },
      onError: (error: any) => {
        toast.error(`${error.response.data.message}`);
      },
    });
  };

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        {isEditMode ? (
          <Button size="icon" variant="ghost">
            <Pencil />
          </Button>
        ) : isViewMode ? (
          <Button size="icon" variant="ghost">
            <Eye />
          </Button>
        ) : (
          <Button>
            <Plus /> Mã Giảm Giá
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="hide-scrollbar sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? "Cập Nhật Mã Giảm Giá"
              : isViewMode
              ? "Xem Chi Tiết Mã Giảm Giá"
              : "Thêm Mã Giảm Giá"}
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Code <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isViewMode}
                      placeholder="code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô Tả</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isViewMode}
                      placeholder="..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="discountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại Giảm Giá</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isViewMode}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select discount type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERCENT">Phần Trăm</SelectItem>
                          <SelectItem value="FIXED">Fixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá Trị Giảm</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isViewMode}
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minOrderValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá Trị Tối Thiểu Đơn Hàng</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isViewMode}
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số Lượng Mã Giảm Giá</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isViewMode}
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-x-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Từ Ngày</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            variant="outline"
                          >
                            {field.value
                              ? new Date(field.value).toLocaleDateString(
                                  "vi-VN"
                                )
                              : "Choose Date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          disabled={(date) => date < new Date("1900-01-01")}
                          mode="single"
                          onSelect={field.onChange}
                          selected={couponData?.startDate || field.value}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Đến Ngày</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            variant="outline"
                          >
                            {field.value
                              ? new Date(field.value).toLocaleDateString(
                                  "vi-VN"
                                )
                              : "Choose Date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          disabled={(date) => date < new Date("1900-01-01")}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-0 gap-y-4">
                    <FormLabel>
                      Trạng Thái <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter>
              {!isViewMode && (
                <Button disabled={mutation.isPending} type="submit">
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : isEditMode ? (
                    <>
                      <Pencil className="mr-2 h-4 w-4" />
                      Cập Nhật
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm
                    </>
                  )}
                </Button>
              )}
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
