"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { watchSchema } from "@/schema/watch";
import { Gender } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, Eye, Pencil, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBrands } from "@/queries/use-brand";
import { Brand } from "@/types/brand";
import { useBandMaterials } from "@/queries/use-bandMaterial";
import { BandMaterial } from "@/types/band-material";
import { useMovements } from "@/queries/use-movement";
import { Movement } from "@/types/movement";
import { useMaterials } from "@/queries/use-material";
import { Material } from "@/types/material";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import { watchApi } from "@/services/watch";
import { Loader2 } from "lucide-react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemMetadata,
  FileUploadItemDelete,
} from "@/components/ui/file-upload";
import { queryClient } from "@/components/provider/provider";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cloudinaryApi } from "@/services/cloudinary";

interface WatchFormProps {
  mode: "create" | "edit" | "view";
  watchId?: string;
  watchData?: any;
}

type WatchFormValues = z.infer<typeof watchSchema>;

export default function WatchForm({ mode, watchData }: WatchFormProps) {
  const isMutating = useIsMutating();
  const [isOpen, setIsOpen] = useState(false);
  const { data: brands } = useBrands();
  const { data: materials } = useMaterials();
  const { data: bandMaterials } = useBandMaterials();
  const { data: movements } = useMovements();
  const WIDTH_IMAGE = 500,
    HEIGHT_IMAGE = 500;

  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";

  const mutation = useMutation({
    mutationFn: (data: any) =>
      isEditMode
        ? watchApi.update(watchData?.id as string, data)
        : watchApi.create(data),
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
    }) => cloudinaryApi.multipleFileUpload(width, height, formData),
  });

  const form = useForm<WatchFormValues>({
    resolver: zodResolver(watchSchema),
    defaultValues: {
      name: isEditMode && watchData ? watchData.name : "",
      description: "",
      gender: isEditMode && watchData ? watchData.gender : Gender.MEN,
      diameter: isEditMode && watchData ? watchData.diameter : 0,
      waterResistance: isEditMode && watchData ? watchData.waterResistance : 0,
      warranty: isEditMode && watchData ? watchData.warranty : 0,
      price: isEditMode && watchData ? watchData.price : 0,
      brandId: isEditMode && watchData ? watchData.brandId : "",
      materialId: isEditMode && watchData ? watchData.materialId : "",
      bandMaterialId: isEditMode && watchData ? watchData.bandMaterialId : "",
      movementId: isEditMode && watchData ? watchData.movementId : "",
      files: [],
    },
  });

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await uploadMutation.mutateAsync({
        width: WIDTH_IMAGE,
        height: HEIGHT_IMAGE,
        formData,
      });

      const uploadedImages = response.data.items.map((image: any) => ({
        ...image,
        absolute_url: image.secure_url,
      }));

      return uploadedImages;
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const onSubmit = async (values: WatchFormValues) => {
    const { files, ...watchData } = values;

    const uploadImages = await handleUpload(files);

    mutation.mutate(
      {
        ...watchData,
        images: uploadImages,
      },
      {
        onSuccess: () => {
          form.reset();
          queryClient.invalidateQueries({ queryKey: ["watches"] });
          setIsOpen(false);
        },
        onError: (error) => {
          console.error("Error creating watch:", error);
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
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onValueChange={field.onChange}
                      // onUpload={handleUpload}
                      accept="image/*"
                      maxFiles={8}
                      maxSize={5 * 1024 * 1024}
                      onFileReject={(_, message) => {
                        form.setError("files", {
                          message,
                        });
                      }}
                      multiple
                    >
                      <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                        <CloudUpload className="size-4" />
                        Drag and drop or
                        <FileUploadTrigger asChild>
                          <Button variant="link" size="sm" className="p-0">
                            choose files
                          </Button>
                        </FileUploadTrigger>
                        to upload
                      </FileUploadDropzone>
                      <FileUploadList>
                        {field.value.map((file, index) => (
                          <FileUploadItem key={index} value={file}>
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
                  <FormDescription>
                    Upload up to 8 images up to 5MB each.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchData?.images && watchData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {watchData.images.map(
                  (image: { absolute_url: string }, index: any) => (
                    <AspectRatio ratio={1} key={index} className="relative">
                      <Image
                        src={image.absolute_url}
                        alt="Image"
                        fill
                        sizes="10vw"
                      />
                    </AspectRatio>
                  )
                )}
              </div>
            )}

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
                      placeholder="Watch name"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
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
                      disabled={isViewMode}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Gender).map((gender, idx) => (
                          <SelectItem key={idx} value={gender}>
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
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Brand <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isViewMode}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands?.data?.items.map((brand: Brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
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
                name="materialId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Material <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isViewMode}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {materials?.data?.items.map((material: Material) => (
                          <SelectItem key={material.id} value={material.id}>
                            {material.name}
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
                name="bandMaterialId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Band Material <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isViewMode}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select band material" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bandMaterials?.data?.items.map(
                          (bandMaterial: BandMaterial) => (
                            <SelectItem
                              key={bandMaterial.id}
                              value={bandMaterial.id}
                            >
                              {bandMaterial.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="movementId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Movement <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isViewMode}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select movement" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {movements?.data?.items.map((movement: Movement) => (
                          <SelectItem key={movement.id} value={movement.id}>
                            {movement.name}
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
                name="diameter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diameter</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Diameter"
                        type="number"
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
                name="waterResistance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Water Resistance</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Water resistance"
                        type="number"
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
                name="warranty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warranty</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Warranty"
                        type="number"
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Price <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Price"
                        type="number"
                        {...field}
                        disabled={isViewMode}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Watch description"
                      {...field}
                      rows={3}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              {!isViewMode && (
                <Button type="submit" disabled={isMutating > 0}>
                  {isMutating ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Processing...
                    </>
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
