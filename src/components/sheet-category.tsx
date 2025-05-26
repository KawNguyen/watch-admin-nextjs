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

import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
// import {
//   FileInput,
//   FileUploader,
//   FileUploaderContent,
//   FileUploaderItem,
// } from "./ui/file-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useMutation } from "@tanstack/react-query";
import { categoryAPI } from "@/services/category";

// Add this enum near the top of the file after imports
export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  UNISEX = "Unisex"
}

// Update the formSchema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.nativeEnum(Gender, {
    required_error: "Please select a gender",
  }),
});

const SheetCategory = () => {
  const mutateCreate = useMutation({
    mutationFn: async (data: any) =>  categoryAPI.createCategory(data),
    onSuccess: () => {
      console.log("success") 
    },
    onError: () => {
      console.log("error") 
    }
    
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    //maybe làm toast ở đây
    mutateCreate.mutate(values)
  }
  return (
    <Sheet>
      <SheetTrigger asChild className="ml-4">
        <Button>Create</Button>
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
                    <Input placeholder="" {...field} />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            {/* <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select File</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className="relative bg-background rounded-lg p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex items-center justify-center flex-col p-8 w-full ">
                          <CloudUpload className="text-gray-500 w-10 h-10" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent className="flex-row gap-2 overflow-x-auto w-[300px]">
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => {
                            const imageUrl = URL.createObjectURL(file);
                            return (
                              <FileUploaderItem key={i} index={i}>
                                <div className="relative w-20 h-20">
                                  <img
                                    src={imageUrl}
                                    alt={file.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                  />
                                  <button
                                    type="button"
                                    className="absolute top-0 right-0 text-white bg-red-500 p-1 rounded-full"
                                    onClick={() => {
                                      const newFiles = files.filter(
                                        (_, index) => index !== i,
                                      );
                                      setFiles(newFiles);
                                    }}
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </FileUploaderItem>
                            );
                          })}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormDescription>Select a file to upload.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <SheetFooter>
              <Button type="submit">Submit</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetCategory;
