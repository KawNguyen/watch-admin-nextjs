"use client";
import { queryClient } from "@/components/provider/provider";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormDescription,
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
import { instanceAxios } from "@/lib/instantceAxios";
import { brandSchema } from "@/schema/brand";
import { brandApi } from "@/services/brand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CloudUpload, Eye, Loader2, Pencil, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface BrandFormProps {
  mode: "create" | "edit" | "view";
  brandId?: string;
  brandData?: any;
}
type BrandFormValues = z.infer<typeof brandSchema>;
export default function BrandForm({ mode, brandData }: BrandFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [brandImage, setBrandImage] = useState({});
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";

  const mutation = useMutation({
    mutationFn: (data: any) =>
      isEditMode
        ? brandApi.updateBrand(brandData.id, data)
        : brandApi.createBrand(data),
  });
  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: isEditMode && brandData ? brandData.name : "",
      country: isEditMode && brandData ? brandData.country : "",
      image: [],
    },
  });
  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await instanceAxios.post(
        `/cloudinary/upload-single?width=${400}&height=${400}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBrandImage(response.data.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  const onSubmit = async (values: BrandFormValues) => {
    const { image, ...brandData } = values;

    void image;

    mutation.mutate(
      {
        ...brandData,
        image: brandImage,
      },
      {
        onSuccess: () => {
          form.reset();
          setBrandImage([]);
          queryClient.invalidateQueries({ queryKey: ["brands"] });
          setIsOpen(false);
        },
        onError: (error) => {
          console.error("Error creating brand:", error);
        },
      }
    );
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
            Create Brand
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg hide-scrollbar">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? "Edit Brand"
              : isViewMode
              ? "View Brand"
              : "Create Brand"}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "Edit the details of the brand."
              : isViewMode
              ? "View the details of the brand."
              : "Fill in the details to create a new brand."}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onValueChange={field.onChange}
                      onUpload={handleUpload}
                      accept="image/*"
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024}
                      onFileReject={(_, message) => {
                        form.setError("image", {
                          message,
                        });
                      }}
                      multiple={false}
                    >
                      <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                        <CloudUpload className="size-4" />
                        Drag and drop or
                        <FileUploadTrigger asChild>
                          <Button variant="link" size="sm" className="p-0">
                            choose file
                          </Button>
                        </FileUploadTrigger>
                        to upload
                      </FileUploadDropzone>
                      <FileUploadList>
                        {field.value.map((image, index) => (
                          <FileUploadItem key={index} value={image}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                              >
                                <X />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </FileUploadItemDelete>
                          </FileUploadItem>
                        ))}
                      </FileUploadList>
                    </FileUpload>
                  </FormControl>
                  <FormDescription>Upload 1 image up to 5MB.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brand name"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="grid grid-cols-3 gap-4"> */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Country <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brand country"
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
