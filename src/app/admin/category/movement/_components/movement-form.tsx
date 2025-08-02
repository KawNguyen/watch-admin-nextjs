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
import { movementSchema } from "@/schema/movement";
import { movementApi } from "@/services/movement";
import { toast } from "sonner";

interface MovementFormProps {
  mode: "create" | "edit" | "view";
  movementData?: any;
}
type MovementFormValues = z.infer<typeof movementSchema>;
export default function MovementForm({
  mode,
  movementData,
}: MovementFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const mutation = useMutation({
    mutationFn: isEditMode
      ? (data: MovementFormValues) =>
          movementApi.updateMovement(movementData.id, data)
      : movementApi.createMovement,
  });

  const form = useForm<MovementFormValues>({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      name: "",
    },
  });

  React.useEffect(() => {
    if (isOpen && movementData) {
      form.reset({
        name: movementData.name || "",
      });
    }
  }, [isOpen, movementData, form]);

  const onSubmit = async (data: MovementFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["movements"] });
        toast.success(
          isEditMode
            ? "Cập nhật chuyển động thành công"
            : "Thêm chuyển động thành công"
        );
        setIsOpen(false);
      },
      onError: (error: any) => {
        console.log(error);
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
            Chuyển Động
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="hide-scrollbar sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? "Cập Nhật Chuyển Động"
              : isViewMode
              ? "Xem Chi Tiết Chuyển Động"
              : "Thêm Chuyển Động"}
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
                      placeholder="Automatic"
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
