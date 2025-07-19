"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";
import { orderApi } from "@/services/create-order";
import OrderDetailDialog from "./_components/order-details-dialog";
import OrderStatusUpdateDialog from "./_components/order-status-update-dialog";

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
}

interface Order {
  id: string;
  totalPrice: number;
  status: string;
  originalPrice: number;
  paymentMethod: string;
  shippingNotes: string | null;
  cancellationReason: string | null;
  userId: string | null;
  addressId: string | null;
  couponId: string | null;
  walkinInformation: string | null;
  deliveryAddress: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: any;
  orderItems: OrderItem[];
  address: any;
  coupon: any;
}

interface OrderResponse {
  data: {
    items: Order[];
  };
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response: OrderResponse = await orderApi.getAllOrder();
      setOrders(response.data.items);
    } catch (err) {
      setError("Failed to fetch orders");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "PENDING";
      case "PROCESSING":
        return "PROCESSING";
      case "SHIPPING":
        return "SHIPPING";
      case "DELIVERED":
        return "DELIVERED";
      case "COMPLETED":
        return "COMPLETED";
      case "CANCELED":
        return "CANCELED";
      default:
        return status;
    }
  };

  const handleStatusUpdated = () => {
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="container mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/admin/orders/create-order"
          >
            Create Order
          </Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/admin/orders/create-order"
          >
            Create Order
          </Link>
        </div>
        <div className="text-red-600 text-center py-8">
          {error}
          <div className="mt-4">
            <Button onClick={fetchOrders} variant="outline">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/admin/orders/create-order"
        >
          Create Order
        </Link>
      </div>

      {/* Orders Table */}
      <div className="container mx-auto bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => {
                const walkinInfo = parseWalkinInformation(
                  order.walkinInformation
                );

                const parsedAddress = parseDeliveryAddress(
                  order.deliveryAddress
                );

                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.id.slice(0, 8)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {walkinInfo ? (
                          <div>
                            <div className="font-medium">
                              {walkinInfo.firstName} {walkinInfo.lastName}
                            </div>
                            <div className="text-gray-500">
                              {walkinInfo.email}
                            </div>
                            <div className="text-gray-500">
                              {walkinInfo.phone}
                            </div>
                          </div>
                        ) : order.user ? (
                          <div>
                            <div className="font-medium">
                              {order.user.firstName} {order.user.lastName}
                            </div>
                            <div className="text-gray-500">
                              {order.user.email}
                            </div>
                            <div className="text-gray-500">
                              {order.user.phone}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500">Not provided</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {parsedAddress ? (
                          <div>
                            <div>{parsedAddress.street}</div>
                            <div className="text-gray-500">
                              {parsedAddress.wardName},{" "}
                              {parsedAddress.districtName}
                            </div>
                            <div className="text-gray-500">
                              {parsedAddress.provinceName}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500">Not found</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.totalPrice.toLocaleString("vi-VN")} USD
                      </div>
                      {order.originalPrice !== order.totalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          {order.originalPrice.toLocaleString("vi-VN")} USD
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.paymentMethod === "COD" ? "COD" : "MOMO"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-medium text-gray-900">
                        {order.orderItems.length}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <OrderDetailDialog orderId={order.id}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </OrderDetailDialog>

                        <OrderStatusUpdateDialog
                          orderId={order.id}
                          currentStatus={order.status}
                          onStatusUpdated={handleStatusUpdated}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                        </OrderStatusUpdateDialog>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No orders found</div>
          <div className="mt-4">
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/admin/orders/create-order"
            >
              Create Order
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
