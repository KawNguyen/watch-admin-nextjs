import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import CustomerEditModal from "./customer-edit-modal";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
interface CustomerInfo {
  street: string;
  province: string;
  district: string;
  ward: string;
}
export default function CustomerInfo() {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    street: "",
    province: "",
    district: "",
    ward: "",
  });

  const saveCustomer = async (info: CustomerInfo): Promise<boolean> => {
    setCustomerInfo(info);
    setIsCustomerModalOpen(false);
    return true;
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Customer&#39;s Info
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsCustomerModalOpen(true)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Street:</Label>
            <div className="mt-1 p-2 border rounded-md bg-gray-50 min-h-[40px]">
              {customerInfo.street || "Not specified"}
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Ward:</Label>
            <div className="mt-1 p-2 border rounded-md bg-gray-50 h-8 flex items-center">
              {customerInfo.ward || "Not specified"}
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">District:</Label>
            <div className="mt-1 p-2 border rounded-md bg-gray-50 h-8 flex items-center">
              {customerInfo.ward || "Not specified"}
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Province:</Label>
            <div className="mt-1 p-2 border rounded-md bg-gray-50 h-8 flex items-center">
              {customerInfo.province || "Not specified"}
            </div>
          </div>
          <div>
            <Label>Notes:</Label>
            <Textarea
              placeholder="Add notes or special instructions…"
              className="w-full h-20 p-3 border rounded-md"
            />
          </div>
        </CardContent>
      </Card>
      <CustomerEditModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        customerInfo={customerInfo}
        onSave={saveCustomer}
      />
    </div>
  );
}
