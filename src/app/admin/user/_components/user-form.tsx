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
import { userSchema } from "@/schema/user";
import { userApi } from "@/services/user";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface UserFormProps {
  mode: "edit" | "view";
  userId?: string;
  userData?: any;
}
type UserFormValues = z.infer<typeof userSchema>;

export default function UserForm({ mode, userData }: UserFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: (data: UserFormValues) => userApi.updateUser(userData.id, data),
  });
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      phone: "",
      firstName: "",
      lastName: "",
    },
  });

  React.useEffect(() => {
    if (isOpen && userData) {
      form.reset({
        phone: userData.phone || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
      });
    }
  }, [isOpen, userData, form]);

  const onSubmit = async (data: UserFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("Cập nhật thành công tài khoản");
        setIsOpen(false);
      },
      onError: (error: any) => {
        toast.error("Cập nhật thất bại" + error.message);
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
        ) : (
          isViewMode && (
            <Button size="icon" variant="ghost">
              <Eye />
            </Button>
          )
        )}
      </SheetTrigger>
      <SheetContent className="hide-scrollbar sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="mb-4">
            {isEditMode ? "Cập nhật tài khoản" : "Xem chi tiết tài khoản"}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <Label>
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="abc@gmail.com"
                value={userData.email}
                disabled={isViewMode || isEditMode}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Số điện thoại <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} disabled={isViewMode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Họ <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
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
                  ) : (
                    isEditMode && (
                      <>
                        <Pencil />
                        Cập nhật
                      </>
                    )
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
