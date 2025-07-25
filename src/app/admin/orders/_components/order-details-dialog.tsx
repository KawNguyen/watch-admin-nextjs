"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, User, MapPin, CreditCard, Clock } from "lucide-react";
import { orderApi } from "@/services/create-order";
import { toast } from "sonner";
import { formatMoney } from "@/lib";

interface WalkinInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  provinceName: string;
  districtName: string;
  wardName: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  orderId: string;
  watchId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  watch?: {
    id: string;
    name: string;
    price: number;
    brand: string;
    model: string;
  };
}

interface OrderDetail {
  id: string;
  totalPrice: number;
  status: string;
  originalPrice: number;
  paymentMethod: string;
  shippingNotes: string | null;
  cancellationReason: string | null;
  userId: string | null;
  addressId: string | null;
  walkinInformation: string | null;
  couponId: string | null;
  deliveryAddress: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: any;
  orderItems: OrderItem[];
  coupon: any;
}

interface OrderDetailDialogProps {
  orderId: string;
  children: React.ReactNode;
}

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({
  orderId,
  children,
}) => {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await orderApi.getOrderById(orderId);
        setOrder(response.data.item);
      } catch {
        toast.error("Failed to fetch");
      }
    };

    if (open) {
      fetchOrderDetail();
    }
  }, [open, orderId]);

  const parseDeliveryAddress = (
    address: string | null
  ): {
    street: string;
    provinceName: string;
    districtName: string;
    wardName: string;
  } | null => {
    if (!address) return null;
    try {
      return JSON.parse(address);
    } catch {
      return null;
    }
  };

  const parseWalkinInformation = (
    walkinInfo: string | null
  ): WalkinInformation | null => {
    if (!walkinInfo) return null;
    try {
      return JSON.parse(walkinInfo);
    } catch {
      return null;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "SHIPPING":
        return "bg-indigo-100 text-indigo-800";
      case "DELIVERED":
        return "bg-purple-100 text-purple-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Details -<Badge variant="default">{orderId}</Badge>
          </DialogTitle>
        </DialogHeader>

        {order && (
          <div className="space-y-6">
            <div className="grid grid-cols-12">
              <div className="col-span-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <h3 className="text-lg font-semibold">Status</h3>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
              <Separator orientation="vertical" className="ml-10" />
              <div className="col-span-3 space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <h3 className=" w-full   text-lg font-semibold">
                    Payment Method
                  </h3>
                </div>
                <span className="flex place-content-center font-medium ">
                  {order.paymentMethod === "COD" ? (
                    <Badge variant="outline">Cash on Delivery</Badge>
                  ) : (
                    <Badge variant="momo">MOMO</Badge>
                  )}
                </span>
              </div>
              <Separator orientation="vertical" className="ml-2" />
              <div className="col-span-6 space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-semibold">
                    Customer Information
                  </h3>
                </div>
                {(() => {
                  const walkinInfo = parseWalkinInformation(
                    order.walkinInformation
                  );
                  return walkinInfo ? (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="grid grid-cols-12">
                        <div className="col-span-3">
                          <span className="text-sm text-gray-600">Name:</span>
                          <div className="font-medium">
                            {walkinInfo.firstName} {walkinInfo.lastName}
                          </div>
                        </div>
                        <div className="col-span-6">
                          <span className="text-sm text-gray-600">Email:</span>
                          <div className="font-medium">{walkinInfo.email}</div>
                        </div>
                        <div className="col-span-3">
                          <span className="text-sm text-gray-600">Phone:</span>
                          <div className="font-medium">{walkinInfo.phone}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500">No customer information</div>
                  );
                })()}
              </div>
            </div>

            <Separator />

            <div className=" space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-semibold">Shipping Address</h3>
              </div>
              {(() => {
                const parsedAddress = parseDeliveryAddress(
                  order.deliveryAddress
                );
                return parsedAddress ? (
                  <div className="p-4">
                    <Badge className="text-md font-semibold">
                      {parsedAddress.street}, {parsedAddress.wardName},{" "}
                      {parsedAddress.districtName}, {parsedAddress.provinceName}
                    </Badge>
                  </div>
                ) : (
                  <div className="text-gray-500">No address information</div>
                );
              })()}
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Order Items</h3>
              <div className="space-y-2">
                {order?.orderItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="font-medium">{item.watch?.name}</div>
                      {item.watch && (
                        <div className="text-sm text-gray-600">
                          {item.watch.model}
                        </div>
                      )}
                      <div className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {formatMoney(item.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                {order.originalPrice !== order.totalPrice && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Original Price:</span>
                    <span className="text-gray-600 line-through">
                      {formatMoney(order.originalPrice)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total Price:</span>
                  <span>{formatMoney(order.totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
