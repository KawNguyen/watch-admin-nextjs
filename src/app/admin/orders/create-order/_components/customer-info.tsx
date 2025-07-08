'use client';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CustomerEditModal from './customer-edit-modal';
import type { CustomerInfo } from '@/types/order';

import { useProvinces } from '@/queries/use-address';

// Mở rộng CustomerInfo để bao gồm tên
interface ExtendedCustomerInfo extends CustomerInfo {
  provinceName?: string;
  districtName?: string;
  wardName?: string;
}

export default function CustomerInfoComp() {
  const { data: provinces = [] } = useProvinces();

  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<ExtendedCustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    province: '',
    district: '',
    ward: '',
    provinceName: '',
    districtName: '',
    wardName: '',
  });

  const saveCustomer = (info: ExtendedCustomerInfo) => {
    setCustomerInfo(info);
    setIsCustomerModalOpen(false);
    return true;
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Customer&#39;s Info
            <Button
              onClick={() => setIsCustomerModalOpen(true)}
              size="sm"
              variant="ghost"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <Label className="font-medium text-sm">First Name:</Label>
              <Input
                className="mt-1"
                disabled
                value={customerInfo.firstName || 'Not specified'}
              />
            </div>
            <div className="col-span-1">
              <Label className="font-medium text-sm">Last Name:</Label>
              <Input
                className="mt-1"
                disabled
                value={customerInfo.lastName || 'Not specified'}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <Label className="font-medium text-sm">Email</Label>
              <Input
                className="mt-1"
                disabled
                value={customerInfo.email || 'Not specified'}
              />
            </div>
            <div className="col-span-1">
              <Label className="font-medium text-sm">Phone</Label>
              <Input
                className="mt-1"
                disabled
                value={customerInfo.phone || 'Not specified'}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-medium text-sm">Street:</Label>
              <Input
                className="mt-1"
                disabled
                value={customerInfo.street || 'Not specified'}
              />
            </div>
            <div>
              <Label className="font-medium text-sm">Province:</Label>
              <Input
                className="mt-1"
                disabled
                value={customerInfo.provinceName || 'Not specified'}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-medium text-sm">District:</Label>
              <Input
                className="mt-1"
                disabled
                value={customerInfo.districtName || 'Not specified'}
              />
            </div>
            <div>
              <Label className="font-medium text-sm">Ward:</Label>
              <Input
                className="mt-1"
                disabled
                value={customerInfo.wardName || 'Not specified'}
              />
            </div>
          </div>
          <div>
            <Label>Notes:</Label>
            <Textarea
              className="h-20 w-full resize-none rounded-md border p-3"
              placeholder="Add notes or special instructions…"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
      <CustomerEditModal
        provinces={provinces}
        customerInfo={customerInfo}
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSave={saveCustomer}
      />
    </div>
  );
}
