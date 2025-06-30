"use client";

import { queryClient } from "@/components/provider/provider";
import { Button } from "@/components/ui/button";
import {
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
import { UserGender } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, Loader2, Pencil, Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { UserRole } from "@/types/user";

interface UserFormProps {
  mode: "create" | "edit" | "view";
  userId?: string;
  userData?: any;
}
type UserFormValues = z.infer<typeof userSchema>;

export default function UserForm({ mode, userData }: UserFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: userApi.createUser,
  });
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: isEditMode && userData ? userData.email : "",
      role: isEditMode && userData ? userData.role : UserRole.CUSTOMER,
      phone: isEditMode && userData ? userData.phone : "",
      gender: isEditMode && userData ? userData.gender : UserGender.MALE,
      firstname: isEditMode && userData ? userData.firstName : "",
      lastname: isEditMode && userData ? userData.lastName : "",
      avatar: isEditMode && userData ? userData.avatar : "",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setIsOpen(false);
      },
      onError: (error: any) => {
        console.error("Error creating watch:", error);
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {isEditMode ? (
          <Button variant="ghost" size="icon">
            <Pencil />
          </Button>
        ) : isViewMode ? (
          <Button variant="ghost" size="icon">
            <Eye />
          </Button>
        ) : (
          <Button>
            <Plus />
            Create
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg hide-scrollbar">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? "Edit Watch"
              : isViewMode
              ? "View Watch"
              : "Create Watch"}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "Edit the details of the watch."
              : isViewMode
              ? "View the details of the watch."
              : "Fill in the details to create a new watch."}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="abc@gmail.com"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0123456789"
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
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name <span className="text-red-500">*</span>
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
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name <span className="text-red-500">*</span>
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
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Avatar <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="..." {...field} disabled={isViewMode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              {!isViewMode && (
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : isEditMode ? (
                    <>
                      <Pencil />
                      Update
                    </>
                  ) : (
                    <>
                      <Plus />
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
