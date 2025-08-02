"use client";

import { Edit, Mail, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CustomerEditModal from "./customer-edit-modal";
import type { CustomerInfo } from "@/types/order";
import { useProvinces } from "@/queries/use-address";
import { userInfoSchema } from "@/schema/user-info";

interface ExtendedCustomerInfo extends CustomerInfo {
  street: string;
  province: string;
  district: string;
  ward: string;
  provinceName?: string;
  districtName?: string;
  wardName?: string;
}

interface CustomerInfoProps {
  customerInfo: ExtendedCustomerInfo;
  setCustomerInfo: (info: any) => void;
}

export default function CustomerInfoComp({
  customerInfo,
  setCustomerInfo,
}: CustomerInfoProps) {
  const { data: provinces = [] } = useProvinces();
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const form = useForm<ExtendedCustomerInfo>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: customerInfo,
  });

  const handleOpenModal = () => {
    form.reset(customerInfo);
    setIsCustomerModalOpen(true);
  };

  const handleCloseModal = () => {
    form.reset();
    setIsCustomerModalOpen(false);
  };

  const handleSaveCustomer = (info: ExtendedCustomerInfo) => {
    setCustomerInfo(info);
    setIsCustomerModalOpen(false);
  };

  const formatAddress = (info: ExtendedCustomerInfo): string => {
    const addressParts = [
      info.street,
      info.wardName,
      info.districtName,
      info.provinceName,
    ].filter(Boolean);
    return addressParts.length > 0 ? addressParts.join(", ") : "Chưa cung cấp";
  };

  const formatFullName = (info: ExtendedCustomerInfo): string => {
    const fullName = `${info.firstName || ""} ${info.lastName || ""}`.trim();
    return fullName || "Chưa cung cấp";
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Thông Tin Khách Hàng
            <Button onClick={handleOpenModal} size="icon" variant="ghost">
              <Edit className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <User className="size-4" />
                  Tên
                </div>
                <p className="font-medium">{formatFullName(customerInfo)}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Mail className="size-4" />
                  Email
                </div>
                <p className="font-medium">
                  {customerInfo.email || "Chưa cung cấp"}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Phone className="size-4" />
                Số Điện Thoại
              </div>
              <p className="font-medium">
                {customerInfo.phone || "Chưa cung cấp"}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <MapPin className="size-4" />
                Địa Chỉ
              </div>
              <p className="font-medium">{formatAddress(customerInfo)}</p>
            </div>
          </div>

          <div className="space-y-1">
            <Label>Ghi Chú:</Label>
            <Textarea
              className="w-full resize-none rounded-md p-2 bg-gray-50"
              placeholder="Ghi chú thông tin liên quan đến đơn hàng"
              rows={5}
            />
          </div>
        </CardContent>
      </Card>

      <CustomerEditModal
        form={form}
        provinces={provinces}
        isOpen={isCustomerModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCustomer}
      />
    </div>
  );
}
