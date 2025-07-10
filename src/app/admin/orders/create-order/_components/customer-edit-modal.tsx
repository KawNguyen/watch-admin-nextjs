import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
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
import type { CustomerInfo } from '@/types/order';
import { useDistricts, useWards } from '@/queries/use-address';
import { userInfoSchema } from '@/schema/user-info';
import type { District, Province, Ward } from '@/types/address';

interface CustomerEditModalProps {
  provinces: Province[];
  isOpen: boolean;
  onClose: () => void;
  customerInfo: CustomerInfo;
  onSave: (info: CustomerInfo) => void;
}

export default function CustomerEditModal({
  provinces,
  isOpen,
  onClose,
  customerInfo,
  onSave,
}: CustomerEditModalProps) {
  const form = useForm<CustomerInfo>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      street: '',
      province: '',
      district: '',
      ward: '',
    },
  });

  const provinceCode = form.watch('province');
  const districtCode = form.watch('district');
  const { data: districts = [] } = useDistricts(provinceCode);
  const { data: wards } = useWards(districtCode);

  useEffect(() => {
    if (isOpen) {
      form.reset(customerInfo);
    }
  }, [isOpen, customerInfo, form]);

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = async (data: CustomerInfo) => {
    const provinceName =
      provinces?.find((p) => p.code.toString() === data.province)?.name || '';
    const districtName =
      districts?.districts?.find((d:any) => d.code.toString() === data.district)
        ?.name || '';
    const wardName =
      wards?.wards?.find((w:any) => w.code.toString() === data.ward)?.name || '';

    const customerData = {
      ...data,
      provinceName,
      districtName,
      wardName,
    };

    await onSave(customerData);
    onClose();
  };

  return (
    <Dialog onOpenChange={handleCancel} open={isOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Customer Information</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="grid grid-cols-2 gap-x-4">
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces?.map((province: Province) => (
                        <SelectItem
                          key={province.code}
                          value={province.code.toString()}
                        >
                          {province.name}
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
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue('ward', '');
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts?.districts?.map((district: District) => (
                        <SelectItem
                          key={district.code}
                          value={district.code.toString()}
                        >
                          {district.name}
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
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ward" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wards?.wards?.map((ward: Ward) => (
                        <SelectItem
                          key={ward.code}
                          value={ward.code.toString()}
                        >
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button onClick={handleCancel} type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}