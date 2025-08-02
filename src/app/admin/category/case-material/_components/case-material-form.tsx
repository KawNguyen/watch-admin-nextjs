"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, Loader2, Pencil, Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
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
import { caseMaterialSchema } from "@/schema/case-material";
import { materialApi } from "@/services/material";
import { toast } from "sonner";

interface CaseMaterialFormProps {
  mode: "create" | "edit" | "view";
  caseMaterialData?: any;
}
type CaseMaterialFormValues = z.infer<typeof caseMaterialSchema>;
export default function CaseMaterialForm({
  mode,
  caseMaterialData,
}: CaseMaterialFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const mutation = useMutation({
    mutationFn: isEditMode
      ? (data: CaseMaterialFormValues) =>
          materialApi.updateMaterial(caseMaterialData.id, data)
      : materialApi.createMaterial,
  });

  const form = useForm<CaseMaterialFormValues>({
    resolver: zodResolver(caseMaterialSchema),
    defaultValues: {
      name: "",
    },
  });

  React.useEffect(() => {
    if (isOpen && caseMaterialData) {
      form.reset({
        name: caseMaterialData.name || "",
      });
    }
  }, [isOpen, caseMaterialData, form]);

  const onSubmit = async (data: CaseMaterialFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["materials"] });
        setIsOpen(false);
        toast.success(
          isEditMode
            ? "Cập nhật thành công chất liệu vỏ"
            : "Tạo thành công chất liệu vỏ"
        );
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
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
            <Plus />
            Chất Liệu Vỏ
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="hide-scrollbar sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? "Cập Nhật Chất Liệu Dây"
              : isViewMode
              ? "Xem Chi Tiết Chất Liệu Dây"
              : "Tạo Chất Liệu Dây"}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Thép"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              {!isViewMode && (
                <Button disabled={mutation.isPending} type="submit">
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : isEditMode ? (
                    <>
                      <Pencil />
                      Cập Nhật
                    </>
                  ) : (
                    <>
                      <Plus />
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
