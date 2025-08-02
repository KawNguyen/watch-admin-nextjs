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
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { bandMaterialSchema } from "@/schema/band-materials";
import { caseMaterialSchema } from "@/schema/case-material";
import { bandmaterialApi } from "@/services/band-material";
import { toast } from "sonner";

interface BandMaterialFormProps {
  mode: "create" | "edit" | "view";
  bandMaterialData?: any;
}
type BandMaterialFormValues = z.infer<typeof bandMaterialSchema>;
export default function BandMaterialForm({
  mode,
  bandMaterialData,
}: BandMaterialFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const mutation = useMutation({
    mutationFn: isEditMode
      ? (data: BandMaterialFormValues) =>
          bandmaterialApi.updateBandMaterial(bandMaterialData.id, data)
      : bandmaterialApi.createBandMaterial,
  });

  const form = useForm<BandMaterialFormValues>({
    resolver: zodResolver(caseMaterialSchema),
    defaultValues: {
      name: "",
    },
  });

  React.useEffect(() => {
    if (isOpen && bandMaterialData) {
      form.reset({
        name: bandMaterialData.name || "",
      });
    }
  }, [isOpen, bandMaterialData, form]);

  const onSubmit = async (data: BandMaterialFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["bandMaterials"] });
        setIsOpen(false);
        toast.success(
          isEditMode
            ? "Cập nhật thành công chất liệu dây"
            : "Tạo thành công chất liệu dây"
        );
      },
      onError: (error: any) => {
        toast.error(
          isEditMode
            ? `${error.response.data.message}`
            : `${error.response.data.message}`
        );
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
            Chất Liệu Dây
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
              : "Thêm Chất Liệu Dây"}
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
