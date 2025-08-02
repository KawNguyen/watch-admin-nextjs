"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, User, CreditCard, Clock, MapPin } from "lucide-react";

import { formatMoney } from "@/lib";
import { useOrder } from "@/queries/use-order";
import { data } from "@/constants";

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

interface OrderDetailDialogProps {
  orderId: string;
  children: React.ReactNode;
}

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({
  orderId,
  children,
}) => {
  // const [order, setOrder] = useState<OrderDetail | null>(null);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const fetchOrderDetail = async () => {
  //     try {
  //       const response = await orderApi.getOrderById(orderId);
  //       setOrder(response.data.item);
  //     } catch {
  //       toast.error("Load thất bại");
  //     }
  //   };

  //   if (open) {
  //     fetchOrderDetail();
  //   }
  // }, [open, orderId]);

  // const parseDeliveryAddress = (
  //   address: string | null
  // ): {
  //   street: string;
  //   provinceName: string;
  //   districtName: string;
  //   wardName: string;
  // } | null => {
  //   if (!address) return null;
  //   try {
  //     return JSON.parse(address);
  //   } catch {
  //     return null;
  //   }
  // };

  const { data: order } = useOrder(orderId);

  const parseDeliveryAddress = (address: string | null) => {
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

  const walkinInfo = parseWalkinInformation(order?.walkinInformation);

  const getStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Chờ Duyệt";
      case "PROCESSING":
        return "Đang Xử Lý";
      case "SHIPPING":
        return "Đang Giao";
      case "DELIVERED":
        return "Đã Giao";
      case "COMPLETED":
        return "Hoàn Thành";
      case "CANCELED":
        return "Bị Hủy";
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
            Chi Tiết Hóa Đơn -<Badge variant="default">{orderId}</Badge>
          </DialogTitle>
        </DialogHeader>

        {order && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl shadow-sm border space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <h3 className="text-base font-semibold">Trạng Thái</h3>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {getStatus(order.status)}
                </Badge>
              </div>

              <div className="p-4 bg-white rounded-xl shadow-sm border space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <h3 className="text-base font-semibold">
                    Phương Thức Thanh Toán
                  </h3>
                </div>
                <Badge
                  variant={order.paymentMethod === "COD" ? "outline" : "momo"}
                >
                  {order.paymentMethod === "COD"
                    ? "Thanh toán khi nhận hàng"
                    : "MOMO"}
                </Badge>
              </div>

              <div className="p-4 bg-white rounded-xl shadow-sm border space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <h3 className="text-base font-semibold">
                    Thông Tin Khách Hàng
                  </h3>
                </div>

                {order?.user || walkinInfo ? (
                  <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Tên</p>
                      <p className="font-medium">
                        {walkinInfo ? (
                          <>
                            {walkinInfo.firstName} {walkinInfo.lastName}
                          </>
                        ) : (
                          <>
                            {order.user.firstName} {order.user.lastName}
                          </>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">
                        {walkinInfo ? walkinInfo.email : order.user?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Số Điện Thoại</p>
                      <p className="font-medium">
                        {walkinInfo ? walkinInfo.phone : order.user?.phone}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">Chưa có thông tin</div>
                )}
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-semibold">Địa Chỉ Giao Hàng</h3>
              </div>

              {(() => {
                const walkin = parseWalkinInformation(order.walkinInformation);
                const delivery = parseDeliveryAddress(order.deliveryAddress);

                if (walkin && walkin.street) {
                  return (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {walkin.street}, {walkin.wardName}, {walkin.districtName},{" "}
                      {walkin.provinceName}
                    </div>
                  );
                }

                if (delivery) {
                  return (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {delivery.street}, {delivery.wardName},{" "}
                      {delivery.districtName}, {delivery.provinceName}
                    </div>
                  );
                }

                return (
                  <div className="text-gray-500">Chưa có thông tin địa chỉ</div>
                );
              })()}
            </div>

            <Separator />
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Vật Phẩm</h3>
              <div className="space-y-2">
                {order?.orderItems?.map((item: OrderItem) => (
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
                        Số Lượng: {item.quantity}
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
              <h3 className="text-lg font-semibold">Tóm Tắt</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                {order.originalPrice !== order.totalPrice && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Giá Gốc:</span>
                    <span className="text-gray-600 line-through">
                      {formatMoney(order.originalPrice)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Tổng Tiền:</span>
                  <span>{formatMoney(order.totalPrice)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
