"use client";
import React, { useCallback, useState } from "react";
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

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "./provider/provider";
import { CloudUpload, Edit, X } from "lucide-react";
import { Brand } from "@/app/admin/category/brand/columns";
import { brandAPI } from "@/services/brand";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().min(1, "Image is required"),
  country: z.string().min(1, "Country is required"),
});

interface SheetBrandProps {
  brandId?: string;
  initialData?: Brand;
  mode?: "create" | "update";
}
const SheetBrand = ({ mode, brandId, initialData }: SheetBrandProps) => {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (mode === "create") {
        return brandAPI.createBrand(data);
      }
      return brandAPI.updateBrand(brandId!, data);
    },
    onSuccess: () => {
      toast.success(
        mode === "create"
          ? "Brand created successfully"
          : "Brand updated successfully"
      );
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["brand"] });
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
            image: "",
            country: "",
          }
        : {
            name: initialData?.name || "",
            image: initialData?.image || "",
            country: initialData?.country || "",
          },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  const [preview, setPreview] = useState<string | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        form.setValue("image", imageUrl);
      }
    },
    [form]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });
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
          <SheetTitle>Brand</SheetTitle>
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
                    <Input placeholder="Enter brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Country <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Image <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                        ${
                          isDragActive
                            ? "border-primary bg-primary/10"
                            : "border-gray-300"
                        }`}
                    >
                      <input {...getInputProps()} />
                      <CloudUpload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Drag & drop an image here, or click to select
                      </p>
                    </div>
                  </FormControl>
                  {preview && (
                    <div className="relative mt-2 w-32 h-32">
                      <Image
                        src={preview}
                        alt="Preview"
                        width={32}
                        height={32}
                        className="rounded-md object-cover w-full h-full"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          field.onChange("");
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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
export default SheetBrand;
