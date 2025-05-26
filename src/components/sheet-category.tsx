"use client";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryAPI } from "@/services/category";
import { Category } from "@/app/admin/category/columns";
import { toast } from "sonner";

export enum Gender {
  MEN = "MEN",
  WOMEN = "WOMEN",
  UNISEX = "UNISEX",
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.nativeEnum(Gender, {
    required_error: "Please select a gender",
  }),
});

interface SheetCategoryProps {
  mode?: "create" | "update";
  initialData: Category;
  trigger?: React.ReactNode;
}

const SheetCategory = ({ mode = "create", initialData, trigger }: SheetCategoryProps) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: Gender.MEN, // Set default gender
    },
  });

  const createMutation = useMutation({
    mutationFn: categoryAPI.createCategory,
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["category"] });
      form.reset();
    },
    onError: () => {
      toast.error("Failed to create category");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { name: string; gender: Gender } }) =>
      categoryAPI.updateCategory(id, data),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: () => {
      toast.error("Failed to update category");
    },
  });

  useEffect(() => {
    if (initialData && mode === "update") {
      form.reset({
        name: initialData.name,
        gender: initialData.gender as Gender
      });
    }
  }, [initialData, form, mode]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (mode === "update" && initialData.id) {
      updateMutation.mutate({
        id: initialData.id,
        data: values,
      });
    } else {
      createMutation.mutate(values);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || <Button className="ml-4">Create</Button>}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-8">
          <SheetTitle>{mode === "create" ? "Create Category" : "Update Category"}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gender <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Gender).map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit">
                {mode === "create" ? "Create" : "Update"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetCategory;
