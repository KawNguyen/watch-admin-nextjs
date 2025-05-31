"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Watch } from "@/app/admin/watch/columns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, Edit, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { watchAPI } from "@/services/watch";
import { queryClient } from "../provider/provider";
import { toast } from "sonner";
import { Gender } from "@/types";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().min(1, "Image URL is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.string().min(0, "Price must be positive"),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Please select a valid gender" }),
  }),
  description: z.string().optional(),
});

interface SheetWatchProps {
  watchId?: string;
  initialData?: Watch;
  mode?: "create" | "update";
}
const SheetWatch = ({ watchId, initialData, mode }: SheetWatchProps) => {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (mode === "create") {
        return watchAPI.createWatch(data);
      }
      return watchAPI.updateWatch(watchId!, data);
    },
    onSuccess: () => {
      toast.success(
        mode === "create"
          ? "Watch created successfully"
          : "Watch updated successfully"
      );
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["watch"] });
    },
    onSettled: () => {
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "create"
        ? {
            name: "",
            image: "",
            brand: "",
            price: "",
            description: "",
            gender: Gender.Unisex,
          }
        : {
            name: initialData?.name || "",
            image: initialData?.image || "",
            brand: initialData?.brand || "",
            price: initialData?.price || "",
            gender: initialData?.gender || Gender.Unisex,
            description: initialData?.description || "",
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
      <SheetTrigger asChild className="ml-4">
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
          <SheetTitle>Watch</SheetTitle>
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
                    <Input placeholder="Watch name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Brand <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Price <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Gender).map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Watch description" {...field} />
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
              <Button type="submit">Add Watch</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetWatch;
