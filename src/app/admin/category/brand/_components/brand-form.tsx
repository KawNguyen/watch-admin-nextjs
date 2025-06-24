import { brandSchema } from "@/schema/brand";
import { brandApi } from "@/services/brand";
import { useMutation } from "@tanstack/react-query";
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
  const mutation = useMutation({
    mutationFn: brandApi.createBrand,
  });
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const form = useForm<BrandFormValues>({
    defaultValues: {
      name: isEditMode && brandData ? brandData.name : "",
      country: isEditMode && brandData ? brandData.country : "",
      logo: isEditMode && brandData ? brandData.logo : "",
    },
  });

  return <div></div>;
}
