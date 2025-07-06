"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  ward: z.string().min(1, "Ward is required"),
});

interface CustomerInfo {
  street: string;
  province: string;
  district: string;
  ward: string;
}

interface CustomerEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerInfo: CustomerInfo;
  onSave: (info: CustomerInfo) => Promise<boolean>;
}

const provinces = ["Ho Chi Minh City", "Hanoi", "Da Nang"];

const districts = {
  "Ho Chi Minh City": ["District 1", "District 3", "District 5", "District 7"],
  Hanoi: ["Ba Dinh", "Hoan Kiem", "Dong Da", "Tay Ho"],
  "Da Nang": ["Hai Chau", "Thanh Khe", "Son Tra", "Ngu Hanh Son"],
};

const wards = {
  "District 1": ["Ben Nghe", "Ben Thanh", "Nguyen Thai Binh"],
  "District 3": ["Vo Thi Sau", "Ward 2", "Ward 3"],
  "District 5": ["Ward 1", "Ward 2", "Ward 3"],
  "District 7": ["Tan Phong", "Phu My", "Binh Thuan"],
  "Ba Dinh": ["Phuc Xa", "Truc Bach", "Vinh Phuc"],
  "Hoan Kiem": ["Hang Bac", "Hang Dao", "Hang Gai"],
  "Dong Da": ["Khuong Thuong", "Lang Ha", "O Cho Dua"],
  "Tay Ho": ["Quang An", "Tu Lien", "Xuan La"],
  "Hai Chau": ["Hai Chau 1", "Hai Chau 2", "Thanh Binh"],
  "Thanh Khe": ["Thanh Khe Tay", "Thanh Khe Dong", "Xuan Ha"],
  "Son Tra": ["An Hai Bac", "An Hai Dong", "Man Thai"],
  "Ngu Hanh Son": ["Hoa Hai", "Khue My", "My An"],
};

export default function CustomerEditModal({
  isOpen,
  onClose,
  customerInfo,
  onSave,
}: CustomerEditModalProps) {
  const form = useForm<CustomerInfo>({
    resolver: zodResolver(formSchema),
    defaultValues: customerInfo,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedProvince = form.watch("province");
  const selectedDistrict = form.watch("district");

  useEffect(() => {
    if (isOpen) {
      form.reset(customerInfo);
    }
  }, [isOpen, customerInfo, form]);
  useEffect(() => {
    if (selectedProvince && selectedProvince !== customerInfo.province) {
      form.setValue("district", "");
      form.setValue("ward", "");
    }
  }, [selectedProvince, form, customerInfo.province]);

  const handleSubmit = async (data: CustomerInfo) => {
    setIsSubmitting(true);
    try {
      const success = await onSave(data);
      if (success) {
        toast.error("Failed to update customer information");
        onClose();
      } else {
        toast.success("Updated successfully");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  const availableDistricts = selectedProvince
    ? districts[selectedProvince as keyof typeof districts] || []
    : [];

  const availableWards = selectedDistrict
    ? wards[selectedDistrict as keyof typeof wards] || []
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Customer Information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
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
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("ward", "");
                    }}
                    value={field.value}
                    defaultValue={field.value}
                    disabled={!selectedProvince}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
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
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ward</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    disabled={!selectedDistrict}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ward" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableWards.map((ward) => (
                        <SelectItem key={ward} value={ward}>
                          {ward}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
