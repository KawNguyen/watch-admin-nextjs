"use client";

import React, { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { brandAPI } from "@/services/brand";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BrandTypes } from "@/types/brand";
import { Edit } from "lucide-react";
import ImageDropzone from "../image-dropzone";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  country: z.string().min(1, "Country is required"),
});

type SheetBrandProps = {
  mode: "create" | "edit";
  initialData?: BrandTypes;
  brandId?: string;
  logoData?: string;
};

const SheetBrand = ({
  mode,
  initialData,
  brandId,
  logoData,
}: SheetBrandProps) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(logoData || null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "create"
        ? {
            name: "",
            country: "",
          }
        : {
            name: initialData?.name || "",
            country: initialData?.country || "",
          },
  });

  const mutation = useMutation({
    mutationFn: async (data: { name: string; country: string }) => {
      if (mode === "create") {
        if (!logo) throw new Error("Logo is required");
        return brandAPI.createBrand(data, logo);
      }
      if (!brandId) throw new Error("Brand ID is required");
      return brandAPI.updateBrand(brandId, data, logo || undefined);
    },
    onSuccess: () => {
      toast.success(
        mode === "create"
          ? "Brand created successfully"
          : "Brand updated successfully"
      );
      form.reset();
      setLogo(null);
      setPreview(null);
    },
    onError: () => toast.error("Something went wrong"),
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setLogo(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    maxFiles: 1,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {mode === "create" ? (
          <Button>Create Brand</Button>
        ) : (
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[500px]">
        <SheetHeader>
          <SheetTitle>Create New Brand</SheetTitle>
        </SheetHeader>
        <Card className="p-4 mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Brand name" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Input placeholder="Country" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ImageDropzone
                preview={preview}
                onDrop={(file) => {
                  const imageUrl = URL.createObjectURL(file);
                  setPreview(imageUrl);
                  setLogo(file);
                }}
                onRemove={() => {
                  setPreview(null);
                  setLogo(null);
                }}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Creating..." : "Create Brand"}
              </Button>
            </form>
          </Form>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default SheetBrand;
