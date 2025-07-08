'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMutating, useMutation } from '@tanstack/react-query';
import {
  CloudUpload,
  Cog,
  DollarSign,
  Droplets,
  Eye,
  Info,
  Loader2,
  Pencil,
  Plus,
  Shield,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { queryClient } from '@/components/provider/provider';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/ui/file-upload';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useBandMaterials } from '@/queries/use-bandMaterial';
import { useBrands } from '@/queries/use-brand';
import { useMaterials } from '@/queries/use-material';
import { useMovements } from '@/queries/use-movement';
import { watchSchema } from '@/schema/watch';
import { cloudinaryApi } from '@/services/cloudinary';
import { watchApi } from '@/services/watch';
import { Gender } from '@/types';
import type { BandMaterial } from '@/types/band-material';
import type { Brand } from '@/types/brand';
import type { Material } from '@/types/material';
import type { Movement } from '@/types/movement';

interface WatchFormProps {
  mode: 'create' | 'edit' | 'view';
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

  const isEditMode = mode === 'edit';
  const isViewMode = mode === 'view';

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
      name: isEditMode && watchData ? watchData.name : '',
      description: '',
      gender: isEditMode && watchData ? watchData.gender : Gender.MEN,
      diameter: isEditMode && watchData ? watchData.diameter : 0,
      waterResistance: isEditMode && watchData ? watchData.waterResistance : 0,
      warranty: isEditMode && watchData ? watchData.warranty : 0,
      price: isEditMode && watchData ? watchData.price : 0,
      brandId: isEditMode && watchData ? watchData.brandId : '',
      materialId: isEditMode && watchData ? watchData.materialId : '',
      bandMaterialId: isEditMode && watchData ? watchData.bandMaterialId : '',
      movementId: isEditMode && watchData ? watchData.movementId : '',
      videoUrl: isEditMode && watchData ? watchData.videoUrl : '',
      files: [],
    },
  });

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
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
      console.error('Error uploading files:', error);
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
          toast.success(
            `${isEditMode ? 'Edit successfully' : 'Created successfully'}`
          );
          queryClient.invalidateQueries({ queryKey: ['watches'] });
          setIsOpen(false);
        },
        onError: (error) => {
          console.error('Error creating watch:', error);
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
            Create
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="hide-scrollbar sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? 'Edit Watch'
              : isViewMode
                ? 'View Watch'
                : 'Create Watch'}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? 'Edit the details of the watch.'
              : isViewMode
                ? 'View the details of the watch.'
                : 'Fill in the details to create a new watch.'}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments</FormLabel>
                  <FormControl>
                    <FileUpload
                      accept="image/*"
                      maxFiles={8}
                      // onUpload={handleUpload}
                      maxSize={5 * 1024 * 1024}
                      multiple
                      onFileReject={(_, message) => {
                        form.setError('files', {
                          message,
                        });
                      }}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                        <CloudUpload className="size-4" />
                        Drag and drop or
                        <FileUploadTrigger asChild>
                          <Button className="p-0" size="sm" variant="link">
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
                                className="size-7"
                                size="icon"
                                variant="ghost"
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
                    <AspectRatio className="relative" key={index} ratio={1}>
                      <Image
                        alt="Image"
                        fill
                        sizes="10vw"
                        src={image.absolute_url}
                      />
                    </AspectRatio>
                  )
                )}
              </div>
            )}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-x-2 font-bold">
                  <Info className="size-6" />
                  <h1 className="text-xl">Basic information</h1>
                </div>
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
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Gender <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          defaultValue={field.value}
                          disabled={isViewMode}
                          onValueChange={field.onChange}
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
                          defaultValue={field.value}
                          disabled={isViewMode}
                          onValueChange={field.onChange}
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
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-x-2 font-bold">
                  <Cog className="size-6" />
                  <h1 className="text-xl">Techincal Specifications</h1>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="materialId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Material <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          defaultValue={field.value}
                          disabled={isViewMode}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Material" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {materials?.data?.items.map(
                              (material: Material) => (
                                <SelectItem
                                  key={material.id}
                                  value={material.id}
                                >
                                  {material.name}
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
                    name="bandMaterialId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Band Material <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          defaultValue={field.value}
                          disabled={isViewMode}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Band Material" />
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
                          defaultValue={field.value}
                          disabled={isViewMode}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Movement" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {movements?.data?.items.map(
                              (movement: Movement) => (
                                <SelectItem
                                  key={movement.id}
                                  value={movement.id}
                                >
                                  {movement.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="diameter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diameter (mm)</FormLabel>
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
                        <FormLabel className="flex items-center gap-x-1">
                          <Droplets className="size-4" /> Water Resistance
                        </FormLabel>
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
                        <FormLabel className="flex items-center gap-x-1">
                          <Shield className="size-4" />
                          Warranty
                        </FormLabel>
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
                        <FormLabel className="flex items-center gap-x-1">
                          <DollarSign className="size-4" />
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
                <div className="grid grid-cols-1">
                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Video Url <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Watch's video url"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Watch description"
                            {...field}
                            disabled={isViewMode}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <SheetFooter>
              {!isViewMode && (
                <Button disabled={isMutating > 0} type="submit">
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
