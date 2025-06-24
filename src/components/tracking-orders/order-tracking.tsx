"use client";
import React, { useState } from "react";
import {
  SearchIcon,
  PackageIcon,
  TruckIcon,
  CheckCircleIcon,
  ClipboardCheckIcon,
} from "lucide-react";
import Image from "next/image";
export const orders: Order[] = [
  {
    id: "o1",
    orderNumber: "001",
    orderDate: "2023-11-15",
    status: "Delivered",
    statusHistory: [
      {
        status: "Order Confirmed",
        date: "2023-11-15T10:00:00Z",
        note: "Order confirmed and payment received",
      },
      {
        status: "Processing",
        date: "2023-11-16T14:30:00Z",
        note: "Order is being processed in our warehouse",
      },
      {
        status: "Shipped",
        date: "2023-11-17T09:15:00Z",
        note: "Order has been shipped via Express Delivery",
      },
      {
        status: "Delivered",
        date: "2023-11-20T15:45:00Z",
        note: "Order has been delivered successfully",
      },
    ],
    items: [
      {
        name: "Wireless Headphones",
        quantity: 1,
        price: 100,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
      },
      {
        name: "Smart Watch",
        quantity: 1,
        price: 100,
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80",
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    estimatedDelivery: "2023-11-20",
  },
  {
    id: "o2",
    orderNumber: "002",
    orderDate: "2023-11-18",
    status: "Shipped",
    statusHistory: [
      {
        status: "Order Confirmed",
        date: "2023-11-18T11:20:00Z",
        note: "Order confirmed and payment received",
      },
      {
        status: "Processing",
        date: "2023-11-19T13:45:00Z",
        note: "Order is being processed in our warehouse",
      },
      {
        status: "Shipped",
        date: "2023-11-20T10:30:00Z",
        note: "Order has been shipped via Standard Delivery",
      },
    ],
    items: [
      {
        name: "Mechanical Keyboard",
        quantity: 1,
        price: 100,
        image:
          "https://images.unsplash.com/photo-1601445638532-3c6f6c3282ba?w=200&q=80",
      },
    ],
    shippingAddress: "456 Oak Ave, San Francisco, CA 94101",
    estimatedDelivery: "2023-11-23",
  },
  {
    id: "o3",
    orderNumber: "003",
    orderDate: "2023-11-20",
    status: "Processing",
    statusHistory: [
      {
        status: "Order Confirmed",
        date: "2023-11-20T09:00:00Z",
        note: "Order confirmed and payment received",
      },
      {
        status: "Processing",
        date: "2023-11-20T14:20:00Z",
        note: "Order is being processed in our warehouse",
      },
    ],
    items: [
      {
        name: "Gaming Mouse",
        quantity: 1,
        price: 100,
        image:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&q=80",
      },
      {
        name: "Mousepad",
        quantity: 2,
        price: 100,
        image:
          "https://images.unsplash.com/photo-1616071358910-0f0c5c90d62e?w=200&q=80",
      },
      {
        name: "USB Hub",
        quantity: 1,
        price: 100,
        image:
          "https://images.unsplash.com/photo-1636389733682-8056b3110c85?w=200&q=80",
      },
    ],
    shippingAddress: "789 Pine St, Seattle, WA 98101",
    estimatedDelivery: "2023-11-25",
  },
];
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}
interface StatusHistory {
  status: string;
  date: string;
  note: string;
}
interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: string;
  statusHistory: StatusHistory[];
  items: OrderItem[];
  shippingAddress: string;
  estimatedDelivery: string;
}
export const OrderTracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const order = orders.find(
      (o) => o.orderNumber.toLowerCase() === searchQuery.toLowerCase(),
    );
    if (order) {
      setSelectedOrder(order);
      setError("");
    } else {
      setError("Order not found");
      setSelectedOrder(null);
    }
  };
  const updateStatus = (newStatus: string) => {
    setSelectedOrder((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        status: newStatus,
        statusHistory: [
          ...prev.statusHistory,
          {
            status: newStatus,
            date: new Date().toISOString(),
            note: `Order ${newStatus}`,
          },
        ],
      };
    });
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Order Confirmed":
        return <ClipboardCheckIcon className="h-6 w-6" />;
      case "Processing":
        return <PackageIcon className="h-6 w-6" />;
      case "Shipped":
        return <TruckIcon className="h-6 w-6" />;
      case "Delivered":
        return <CheckCircleIcon className="h-6 w-6" />;
      default:
        return <ClipboardCheckIcon className="h-6 w-6" />;
    }
  };
  return (
    <div className="w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Tracking</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter Order ID (eg: 001)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
      {/* Order Details */}
      {selectedOrder && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Order #{selectedOrder.orderNumber}
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on{" "}
                  {new Date(selectedOrder.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <select
                  onChange={(e) => updateStatus(e.target.value)}
                  value={selectedOrder.status}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Order Confirmed">Order Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
            {/* Timeline */}
            <div className="relative pb-8">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              {selectedOrder.statusHistory.map((status, index) => (
                <div key={index} className="relative flex items-start mb-6">
                  <div className="absolute left-0 mt-1">
                    <span
                      className={`flex items-center justify-center w-8 h-8 bg-white rounded-full ring-8 ring-white ${
                        index === selectedOrder.statusHistory.length - 1
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    >
                      {getStatusIcon(status.status)}
                    </span>
                  </div>
                  <div className="ml-12">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {status.status}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(status.date).toLocaleString()}
                    </p>
                    {status.note && (
                      <p className="mt-1 text-sm text-gray-600">
                        {status.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Order Items */}
            <div className="border-t border-gray-200 mt-6 pt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Order Items
              </h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24">
                        <Image
                          className="object-cover w-full h-full"
                          src={item.image}
                          alt={item.name}
                          width={100}
                          height={100}
                        />
                      </div>
                      <span className="ml-3 text-lg text-gray-700">
                        {item.name}
                      </span>
                    </div>
                    <span className="ml-12 text-lg text-gray-700">
                      ${item.price}
                    </span>
                    <span className="text-gray-500 text-lg">
                      x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Delivery Details */}
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-900">Delivery Address</p>
                  <p className="text-gray-500">
                    {selectedOrder.shippingAddress}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    Estimated Delivery
                  </p>
                  <p className="text-gray-500">
                    {new Date(
                      selectedOrder.estimatedDelivery,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
