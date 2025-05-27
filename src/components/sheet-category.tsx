"use client";
import React, { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { categoryAPI } from "@/services/category";
import { Category } from "@/app/admin/category/columns";
import { toast } from "sonner";
import { queryClient } from "./provider/provider";
import { Edit } from "lucide-react";
import { Gender } from "@/types";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.nativeEnum(Gender, {
    required_error: "Please select a gender",
  }),
});

interface SheetCategoryProps {
  categoryId?: number;
  initialData?: Category;
  mode?: "create" | "update";
}
const SheetCategory = ({
  mode,
  categoryId,
  initialData,
}: SheetCategoryProps) => {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (mode === "create") {
        return categoryAPI.createCategory(data);
      }
      return categoryAPI.updateCategory(categoryId!, data);
    },
    onSuccess: () => {
      toast.success(
        mode === "create"
          ? "Category created successfully"
          : "Category updated successfully"
      );
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onSettled: () => {
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "create"
        ? {
            name: "",
            gender: Gender.Male,
          }
        : {
            name: initialData?.name || "",
            gender: (initialData?.gender as Gender) || Gender.Male,
          },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {mode === "create" ? (
          <Button>Create</Button>
        ) : (
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-8">
          <SheetTitle>Category</SheetTitle>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
