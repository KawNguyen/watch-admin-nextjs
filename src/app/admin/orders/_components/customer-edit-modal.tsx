import { memo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CustomerInfo } from "@/types/order";
interface ExtendedCustomerInfo extends CustomerInfo {
  street: string;
  province: string;
  district: string;
  ward: string;
  provinceName?: string;
  districtName?: string;
  wardName?: string;
}
import { useDistricts, useWards } from "@/queries/use-address";
import type { District, Province, Ward } from "@/types/address";

interface CustomerEditModalProps {
  form: UseFormReturn<ExtendedCustomerInfo>;
  provinces: Province[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (info: ExtendedCustomerInfo) => void;
}

function CustomerEditModal({
  form,
  provinces,
  isOpen,
  onClose,
  onSave,
}: CustomerEditModalProps) {
  const provinceCode = form.watch("province");
  const districtCode = form.watch("district");
  const { data: districts = [] } = useDistricts(provinceCode);
  const { data: wards = [] } = useWards(districtCode);

  const handleSubmit = async (data: ExtendedCustomerInfo) => {
    const provinceName =
      provinces?.find((p) => p.code.toString() === data.province)?.name || "";
    const districtName =
      districts?.districts?.find(
        (d: District) => d.code.toString() === data.district
      )?.name || "";
    const wardName =
      wards?.wards?.find((w: Ward) => w.code.toString() === data.ward)?.name ||
      "";

    const result = {
      ...data,
      provinceName,
      districtName,
      wardName,
    };

    onSave(result);
  };

  const handleProvinceChange = (value: string) => {
    form.setValue("province", value);
    form.setValue("district", "");
    form.setValue("ward", "");
  };

  const handleDistrictChange = (value: string) => {
    form.setValue("district", value);
    form.setValue("ward", "");
  };

  const handleWardChange = (value: string) => {
    form.setValue("ward", value);
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Cập Nhật Thông Tin Khách Hàng</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="grid grid-cols-2 gap-x-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ</FormLabel>
                    <FormControl>
                      <Input placeholder="Họ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số Điện Thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="0909..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số Nhà</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh / Thành Phố</FormLabel>
                    <Select
                      onValueChange={handleProvinceChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tỉnh / Thành Phố" />
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
                    <FormLabel>Quận / Huyện</FormLabel>
                    <Select
                      disabled={!form.watch("province")}
                      onValueChange={handleDistrictChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Quận / Huyện" />
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
                    <FormLabel>Phường / Xã</FormLabel>
                    <Select
                      disabled={!form.watch("district")}
                      onValueChange={handleWardChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Phường / Xã" />
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
            </div>

            <DialogFooter>
              <Button onClick={onClose} type="button" variant="outline">
                Hủy
              </Button>
              <Button type="submit">Lưu Thông Tin</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(CustomerEditModal);
