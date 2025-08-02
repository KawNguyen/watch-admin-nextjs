"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import {
  CalendarIcon,
  CloudUpload,
  Eye,
  Loader2,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { queryClient } from "@/components/provider/provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { advertisementSchema } from "@/schema/advertisement";
import { advertisementApi } from "@/services/ads";
import { cloudinaryApi } from "@/services/cloudinary";
import { Switch } from "@/components/ui/switch";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { formatDate } from "@/lib";

interface AdsFormProps {
  mode: "create" | "edit" | "view";
  adsId?: string;
  adsData?: any;
}
type AdsFormValues = z.infer<typeof advertisementSchema>;
export default function AdvertisementForm({ mode, adsData }: AdsFormProps) {
  const isMutating = useIsMutating();
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const WIDTH_IMAGE = 400,
    HEIGHT_IMAGE = 400;

  const mutation = useMutation({
    mutationFn: (data: any) =>
      isEditMode
        ? advertisementApi.updateAds(adsData.id, data)
        : advertisementApi.createAds(data),
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

  const form = useForm<AdsFormValues>({
    resolver: zodResolver(advertisementSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: [],
      link: "",
      isActive: false,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  React.useEffect(() => {
    if (isOpen && adsData) {
      form.reset({
        title: adsData.title || "",
        content: adsData.content || "",
        link: adsData.link || "",
        isActive: adsData.isActive || "",
        startDate: adsData.startDate || "",
        endDate: adsData.endDate || "",
      });
    }
  }, [isOpen, adsData, form]);

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
      console.error("Error uploading files:", error);
    }
  };

  const onSubmit = async (values: AdsFormValues) => {
    const { imageUrl, ...adsData } = values;

    const uploadImage = await handleUpload(imageUrl);
    console.log(uploadImage);
    mutation.mutate(
      {
        ...adsData,
        imageUrl: uploadImage.secure_url,
      },
      {
        onSuccess: () => {
          form.reset();

          toast.success(
            `${
              isEditMode
                ? "Cập nhật quảng cáo thành công"
                : "Thêm quảng cáo thành công"
            }`
          );
          queryClient.invalidateQueries({ queryKey: ["advertisements"] });
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
            Quảng Cáo
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="hide-scrollbar sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? "Cập Nhật Quảng Cáo"
              : isViewMode
              ? "Xem Chi Tiết Quảng Cáo"
              : "Thêm Quảng Cáo"}
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tệp đính kèm</FormLabel>
                  <FormControl>
                    <FileUpload
                      accept="image/*"
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024}
                      multiple={false}
                      onFileReject={(_, message) => {
                        form.setError("imageUrl", {
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
            {adsData?.imageUrl && (
              <div className="grid grid-cols-4 gap-4">
                <AspectRatio className="relative" ratio={1}>
                  <Image
                    alt="Image"
                    fill
                    sizes="10vw"
                    src={adsData?.imageUrl || ""}
                  />
                </AspectRatio>
              </div>
            )}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tiêu Đề <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} disabled={isViewMode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-12 gap-x-4">
              <div className="col-span-10">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Link <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="link"
                          {...field}
                          disabled={isViewMode}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2 flex items-center">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-0 gap-y-4">
                      <FormLabel>Trạng Thái</FormLabel>
                      <FormControl>
                        <Switch
                          checked={adsData?.isActive || field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Từ Ngày</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            variant={"outline"}
                          >
                            {field.value
                              ? formatDate(field.value)
                              : "Choose Date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                          mode="single"
                          onSelect={field.onChange}
                          selected={field.value}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Đến Ngày</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            variant={"outline"}
                          >
                            {field.value
                              ? formatDate(field.value)
                              : "Choose Date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          disabled={(date) => date < new Date("1900-01-01")}
                          mode="single"
                          onSelect={field.onChange}
                          selected={field.value}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nội Dung <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="content"
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
