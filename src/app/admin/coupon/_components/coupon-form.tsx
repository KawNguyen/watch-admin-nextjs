"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CalendarIcon, Eye, Loader2, Pencil, Plus } from "lucide-react";
import { useState } from "react";
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
  SheetDescription,
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
      code: isEditMode ? couponData.code : "",
      description: isEditMode ? couponData.description : "",
      discountType: isEditMode ? couponData.discountType : "",
      discountValue: isEditMode ? couponData.discountValue : 1,
      minOrderValue: isEditMode ? couponData.minOrderValue : 1,
      count: isEditMode ? couponData.count : 1,
      isActive: isEditMode ? couponData.isActive : false,
      startDate: isEditMode ? new Date(couponData.startDate) : new Date(),
      endDate: isEditMode ? new Date(couponData.endDate) : new Date(),
    },
  });

  const onSubmit = async (data: CouponFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["coupons"] });
        setIsOpen(false);
        toast.success(
          isEditMode
            ? "Coupon updated successfully!"
            : "Coupon created successfully!"
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
            <Plus /> Create Coupon
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="hide-scrollbar sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? "Edit Coupon"
              : isViewMode
              ? "View Coupon"
              : "Create Coupon"}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "Edit coupon details."
              : isViewMode
              ? "View coupon details."
              : "Fill in the details to create a new coupon."}
          </SheetDescription>
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
                      placeholder="Enter coupon code"
                      {...field}
                      value={couponData?.code || field.value}
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isViewMode}
                      placeholder="Enter description"
                      {...field}
                      value={couponData?.description || field.value}
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
                    <FormLabel>Discount Type</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isViewMode}
                        onValueChange={field.onChange}
                        value={couponData?.discountType || field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select discount type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERCENT">Percent</SelectItem>
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
                    <FormLabel>Discount Value</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isViewMode}
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={couponData?.discountValue || field.value}
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
                    <FormLabel>Min Order Value</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isViewMode}
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={couponData?.minOrderValue || field.value}
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
                    <FormLabel>Coupon Usage Count</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isViewMode}
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={couponData?.count || field.value}
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
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            variant={"outline"}
                          >
                            {couponData?.startDate
                              ? new Date(
                                  couponData?.startDate
                                ).toLocaleDateString("vi-VN")
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
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            variant={"outline"}
                          >
                            {couponData?.startDate
                              ? new Date(
                                  couponData?.endDate
                                ).toLocaleDateString("vi-VN")
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
                          selected={couponData?.endDate || field.value}
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
                      Status <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={couponData?.isActive || field.value}
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
                      Update
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create
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
