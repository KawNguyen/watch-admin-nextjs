"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import { CloudUpload, Eye, Loader2, Pencil, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
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
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { brandSchema } from "@/schema/brand";
import { brandApi } from "@/services/brand";
import { cloudinaryApi } from "@/services/cloudinary";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

interface BrandFormProps {
  mode: "create" | "edit" | "view";
  brandId?: string;
  brandData?: any;
}
type BrandFormValues = z.infer<typeof brandSchema>;
export default function BrandForm({ mode, brandData }: BrandFormProps) {
  const isMutating = useIsMutating();
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const WIDTH_IMAGE = 400,
    HEIGHT_IMAGE = 400;

  const mutation = useMutation({
    mutationFn: (data: any) =>
      isEditMode
        ? brandApi.updateBrand(brandData.id, data)
        : brandApi.createBrand(data),
  });

  const uploadMutation = useMutation({
    mutationFn: ({
      width,
      height,
      formData,
    }: {
      width: number;
      height: number;
      formData: FormData;
    }) => cloudinaryApi.singleFileUpload(width, height, formData),
  });

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      country: "",
      image: [],
    },
  });

  React.useEffect(() => {
    if (isOpen && brandData) {
      form.reset({
        name: brandData.name || "",
        country: brandData.country || "",
      });
    }
  }, [isOpen, brandData, form]);

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await uploadMutation.mutateAsync({
        width: WIDTH_IMAGE,
        height: HEIGHT_IMAGE,
        formData,
      });

      const uploadImage = {
        ...response.data.item,
        absolute_url: response.data.item.secure_url,
      };

      return uploadImage;
    } catch (error) {
      console.log("Tải ảnh bị lỗi");
    }
  };

  const onSubmit = async (values: BrandFormValues) => {
    const { image, ...brandData } = values;

    const uploadImage = await handleUpload(image);

    mutation.mutate(
      {
        ...brandData,
        image: uploadImage,
      },
      {
        onSuccess: () => {
          form.reset();

          toast.success(
            `${isEditMode ? "Cập nhật thương hiệu thành công" : "Thêm"}`
          );
          queryClient.invalidateQueries({ queryKey: ["brands"] });
          setIsOpen(false);
        },
        onError: (error: any) => {
          toast.error(`${error.response.data.message}`);
        },
      }
    );
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
            Thương Hiệu
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="hide-scrollbar sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? "Cập Nhật Thương Hiệu"
              : isViewMode
              ? "Xem Chi Tiết Thương Hiệu"
              : "Thêm Thương Hiệu"}
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tệp đính kèm</FormLabel>
                  <FormControl>
                    <FileUpload
                      accept="image/*"
                      maxFiles={1}
                      // onUpload={handleUpload}
                      maxSize={5 * 1024 * 1024}
                      multiple={false}
                      onFileReject={(_, message) => {
                        form.setError("image", {
                          message,
                        });
                      }}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                        <CloudUpload className="size-4" />
                        Kéo hay thả ảnh vào
                        <FileUploadTrigger asChild>
                          <Button className="p-0" size="sm" variant="link">
                            hoặc chọn thư mục
                          </Button>
                        </FileUploadTrigger>
                        để tải ảnh lên
                      </FileUploadDropzone>
                      <FileUploadList>
                        {field?.value?.map((image, index) => (
                          <FileUploadItem key={index} value={image}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                              <Button
                                className="size-7"
                                size="icon"
                                variant="ghost"
                              >
                                <X />
                                <span className="sr-only">Xóa</span>
                              </Button>
                            </FileUploadItemDelete>
                          </FileUploadItem>
                        ))}
                      </FileUploadList>
                    </FileUpload>
                  </FormControl>
                  <FormDescription>
                    Đăng 1 hình ảnh không quá 5MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {brandData?.image && (
              <div className="grid grid-cols-4 gap-4">
                <AspectRatio className="relative" ratio={1}>
                  <Image
                    alt="Image"
                    fill
                    sizes="10vw"
                    src={
                      brandData.image?.update?.absolute_url ||
                      brandData.image?.absolute_url ||
                      ""
                    }
                  />
                </AspectRatio>
              </div>
            )}

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
                      placeholder="Tên thương hiệu"
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nguồn gốc <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Viet Nam"
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
                <Button disabled={isMutating > 0} type="submit">
                  {isMutating ? (
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
