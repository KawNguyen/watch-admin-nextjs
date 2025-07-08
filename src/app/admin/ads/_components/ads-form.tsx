'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { useIsMutating, useMutation } from '@tanstack/react-query';
import {
  CalendarIcon,
  CloudUpload,
  Eye,
  Loader2,
  Pencil,
  Plus,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { queryClient } from '@/components/provider/provider';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroupItem } from '@/components/ui/radio-group';
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
import { cn } from '@/lib/utils';
import { advertisementSchema } from '@/schema/advertisement';
import { advertisementApi } from '@/services/ads';
import { cloudinaryApi } from '@/services/cloudinary';

interface AdsFormProps {
  mode: 'create' | 'edit' | 'view';
  adsId?: string;
  adsData?: any;
}
type AdsFormValues = z.infer<typeof advertisementSchema>;
export default function AdvertisementForm({ mode, adsData }: AdsFormProps) {
  const isMutating = useIsMutating();
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = mode === 'edit';
  const isViewMode = mode === 'view';
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
      title: isEditMode && adsData ? adsData.title : '',
      content: isEditMode && adsData ? adsData.content : '',
      imageUrl: [],
      link: isEditMode && adsData ? adsData.link : '',
      isActive: isEditMode && adsData ? adsData.isActive : false,
      startDate:
        isEditMode && adsData ? new Date(adsData.startDate) : new Date(),
      endDate: isEditMode && adsData ? new Date(adsData.endDate) : new Date(),
    },
  });

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
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
      console.error('Error uploading files:', error);
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
            `${isEditMode ? 'Edit successfully' : 'Created successfully'}`
          );
          queryClient.invalidateQueries({ queryKey: ['advertisements'] });
          setIsOpen(false);
        },
        onError: (error) => {
          console.error('Error creating advertisement:', error);
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
            Create Advertisement
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="hide-scrollbar sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? 'Edit Advertisement'
              : isViewMode
                ? 'View Advertisement'
                : 'Create Advertisement'}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? 'Edit the details of the advertisement.'
              : isViewMode
                ? 'View the details of the advertisement.'
                : 'Fill in the details to create a new advertisement.'}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments</FormLabel>
                  <FormControl>
                    <FileUpload
                      accept="image/*"
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024}
                      multiple={false}
                      onFileReject={(_, message) => {
                        form.setError('imageUrl', {
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
                  <FormDescription>Upload 1 image up to 5MB.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Advertisement title"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-12 gap-x-4">
              <div className="col-span-7">
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
                          placeholder="Advertisement link"
                          {...field}
                          disabled={isViewMode}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-5">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Active</FormLabel>
                      <FormControl>
                        <RadioGroup
                          className="flex space-x-4"
                          onValueChange={(val) =>
                            field.onChange(val === 'true')
                          }
                          value={field.value.toString()}
                        >
                          <FormItem className="mt-2 flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Active
                            </FormLabel>
                          </FormItem>
                          <FormItem className="mt-2 flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              No Active
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
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
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                            variant={'outline'}
                          >
                            {field.value
                              ? field.value.toLocaleDateString('vi-VN')
                              : 'Choose Date'}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          disabled={(date) => date < new Date('1900-01-01')}
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
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                            variant={'outline'}
                          >
                            {field.value
                              ? field.value.toLocaleDateString('vi-VN')
                              : 'Choose Date'}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          disabled={(date) => date < new Date('1900-01-01')}
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
                    Content <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Advertisement content"
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
