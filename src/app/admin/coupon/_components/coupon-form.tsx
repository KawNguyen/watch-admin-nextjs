"use client"
import React from "react";
import { queryClient } from "@/components/provider/provider";
import { Button } from "@/components/ui/button";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { couponSchema } from "@/schema/coupon";
import { couponApi } from "@/services/coupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, Loader2, Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CouponFormProps {
  mode: "create" | "edit" | "view";
  couponData?: any;
}

export default function CouponForm({
  mode,
  couponData,
}: CouponFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";

  // Log coupon data when in edit mode to verify the ID is present
  React.useEffect(() => {
    if (isEditMode && couponData) {
      console.log("Edit mode coupon data:", couponData);
      console.log("Coupon ID:", couponData.id);
    }
  }, [isEditMode, couponData]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      try {
        if (!data.startDate || !data.endDate) {
          toast.error("Start date and end date are required");
          return Promise.reject("Start date and end date are required");
        }

        const startDate = data.startDate instanceof Date ? data.startDate.toISOString() : data.startDate;
        const endDate = data.endDate instanceof Date ? data.endDate.toISOString() : data.endDate;

        const transformedData = {
          code: data.code,
          description: data.description,
          discountType: data.discountType,
          discountValue: Number(data.discountValue),
          minOrderValue: Number(data.minOrderValue),
          count: Number(data.count),
          isActive: Boolean(data.isActive),
          startDate,
          endDate,
        };

        // Only add usedCount for create operations (not for updates)
        if (!isEditMode) {
          transformedData.usedCount = 0;
        }

        // Remove undefined values
        Object.keys(transformedData).forEach(key =>
          transformedData[key] === undefined && delete transformedData[key]
        );

        if (isEditMode) {
          if (!couponData?.id) {
            console.error("Cannot update: Missing coupon ID");
            toast.error("Cannot update: Missing coupon ID");
            return Promise.reject("Missing coupon ID");
          }

          console.log(`Updating coupon ${couponData.id} with data:`, transformedData);
          return couponApi.updateCoupon(couponData.id, transformedData);
        } else {
          console.log("Creating new coupon with data:", transformedData);
          return couponApi.createCoupon(transformedData);
        }
      } catch (error) {
        console.error("Mutation error:", error);
        return Promise.reject(error);
      }
    },
    onSuccess: () => {
      // Show success toast
      toast.success(isEditMode ? "Coupon updated successfully!" : "Coupon created successfully!");
      
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      
      // Close the sheet
      setIsOpen(false);
    },
    onError: (error: any) => {
      console.error("API error:", error);
      
      // Show detailed error message
      if (error?.response?.data?.message) {
        if (Array.isArray(error.response.data.message)) {
          // Handle array of error messages
          toast.error(`Error: ${error.response.data.message.join(', ')}`);
        } else {
          // Handle single error message
          toast.error(`Error: ${error.response.data.message}`);
        }
      } else if (error?.message) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error(isEditMode ? "Failed to update coupon" : "Failed to create coupon");
      }
    }
  });

  const form = useForm({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: couponData?.code || "",
      description: couponData?.description || "",
      discountType: couponData?.discountType ?? "PERCENT",
      discountValue: couponData?.discountValue ?? 1,
      minOrderValue: couponData?.minOrderValue ?? 1,
      endDate: couponData?.endDate ? new Date(couponData.endDate) : new Date(new Date().setDate(new Date().getDate() + 30)),
      count: couponData?.count ?? 1,
      usedCount: couponData?.usedCount ?? 0,
      isActive: couponData?.isActive ?? true,
      startDate: couponData?.startDate ? new Date(couponData.startDate) : new Date(),
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Reset form when couponData changes (for edit mode)
  React.useEffect(() => {
    if (isEditMode && couponData) {
      form.reset({
        code: couponData.code || "",
        description: couponData.description || "",
        discountType: couponData.discountType || "PERCENT",
        discountValue: couponData.discountValue ?? 1,
        minOrderValue: couponData.minOrderValue ?? 1,
        endDate: couponData.endDate ? new Date(couponData.endDate) : new Date(new Date().setDate(new Date().getDate() + 30)),
        count: couponData.count ?? 1,
        usedCount: couponData.usedCount ?? 0,
        isActive: couponData.isActive ?? true,
        startDate: couponData.startDate ? new Date(couponData.startDate) : new Date(),
      });
    }
  }, [couponData, isEditMode, form]);

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name && (name === 'startDate' || name === 'endDate')) {
        console.log(`Field ${name} changed to:`, value[name]);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (data: any) => {
    console.log("Form submitted with raw data:", data);
    console.log("startDate type:", typeof data.startDate, data.startDate instanceof Date ? "Date object" : "Not Date object");
    console.log("endDate type:", typeof data.endDate, data.endDate instanceof Date ? "Date object" : "Not Date object");

    if (isEditMode) {
      console.log("Update operation for coupon ID:", couponData?.id);
    }

    mutation.mutate(data);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {isEditMode ? (
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        ) : isViewMode ? (
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
            <Eye className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg hide-scrollbar">
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
              ? "Edit the details of the coupon."
              : isViewMode
                ? "View the details of the coupon."
                : "Fill in the details to create a new coupon."}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      placeholder="Code"
                      {...field}
                      disabled={isViewMode}
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
                    <Input
                      placeholder="Description"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={isViewMode}
                      className="input w-full border rounded px-2 py-1"
                    >
                      <option value="PERCENT">PERCENT</option>
                      <option value="AMOUNT">AMOUNT</option>
                    </select>
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
                      type="number"
                      placeholder="Discount Value"
                      value={field.value}
                      onChange={e => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minOrderValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Order Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Min Order Value"
                      value={field.value}
                      onChange={e => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                      disabled={isViewMode}
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
                  <FormLabel>Count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Count"
                      value={field.value}
                      onChange={e => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : typeof field.value === 'string' && field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""}
                      onChange={e => {
                        const dateValue = e.target.value ? new Date(e.target.value) : undefined;
                        field.onChange(dateValue);
                        console.log("Start date changed to:", dateValue);
                      }}
                      disabled={isViewMode}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : typeof field.value === 'string' && field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""}
                      onChange={e => {
                        const dateValue = e.target.value ? new Date(e.target.value) : undefined;
                        field.onChange(dateValue);
                        console.log("End date changed to:", dateValue);
                      }}
                      disabled={isViewMode}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={e => field.onChange(e.target.checked)}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              {!isViewMode && (
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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