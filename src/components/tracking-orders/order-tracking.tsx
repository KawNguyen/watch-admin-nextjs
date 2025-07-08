'use client';
import {
  CheckCircleIcon,
  ClipboardCheckIcon,
  PackageIcon,
  SearchIcon,
  TruckIcon,
} from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';
export const orders: Order[] = [
  {
    id: 'o1',
    orderNumber: '001',
    orderDate: '2023-11-15',
    status: 'Delivered',
    statusHistory: [
      {
        status: 'Order Confirmed',
        date: '2023-11-15T10:00:00Z',
        note: 'Order confirmed and payment received',
      },
      {
        status: 'Processing',
        date: '2023-11-16T14:30:00Z',
        note: 'Order is being processed in our warehouse',
      },
      {
        status: 'Shipped',
        date: '2023-11-17T09:15:00Z',
        note: 'Order has been shipped via Express Delivery',
      },
      {
        status: 'Delivered',
        date: '2023-11-20T15:45:00Z',
        note: 'Order has been delivered successfully',
      },
    ],
    items: [
      {
        name: 'Wireless Headphones',
        quantity: 1,
        price: 100,
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
      },
      {
        name: 'Smart Watch',
        quantity: 1,
        price: 100,
        image:
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80',
      },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    estimatedDelivery: '2023-11-20',
  },
  {
    id: 'o2',
    orderNumber: '002',
    orderDate: '2023-11-18',
    status: 'Shipped',
    statusHistory: [
      {
        status: 'Order Confirmed',
        date: '2023-11-18T11:20:00Z',
        note: 'Order confirmed and payment received',
      },
      {
        status: 'Processing',
        date: '2023-11-19T13:45:00Z',
        note: 'Order is being processed in our warehouse',
      },
      {
        status: 'Shipped',
        date: '2023-11-20T10:30:00Z',
        note: 'Order has been shipped via Standard Delivery',
      },
    ],
    items: [
      {
        name: 'Mechanical Keyboard',
        quantity: 1,
        price: 100,
        image:
          'https://images.unsplash.com/photo-1601445638532-3c6f6c3282ba?w=200&q=80',
      },
    ],
    shippingAddress: '456 Oak Ave, San Francisco, CA 94101',
    estimatedDelivery: '2023-11-23',
  },
  {
    id: 'o3',
    orderNumber: '003',
    orderDate: '2023-11-20',
    status: 'Processing',
    statusHistory: [
      {
        status: 'Order Confirmed',
        date: '2023-11-20T09:00:00Z',
        note: 'Order confirmed and payment received',
      },
      {
        status: 'Processing',
        date: '2023-11-20T14:20:00Z',
        note: 'Order is being processed in our warehouse',
      },
    ],
    items: [
      {
        name: 'Gaming Mouse',
        quantity: 1,
        price: 100,
        image:
          'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&q=80',
      },
      {
        name: 'Mousepad',
        quantity: 2,
        price: 100,
        image:
          'https://images.unsplash.com/photo-1616071358910-0f0c5c90d62e?w=200&q=80',
      },
      {
        name: 'USB Hub',
        quantity: 1,
        price: 100,
        image:
          'https://images.unsplash.com/photo-1636389733682-8056b3110c85?w=200&q=80',
      },
    ],
    shippingAddress: '789 Pine St, Seattle, WA 98101',
    estimatedDelivery: '2023-11-25',
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const order = orders.find(
      (o) => o.orderNumber.toLowerCase() === searchQuery.toLowerCase()
    );
    if (order) {
      setSelectedOrder(order);
      setError('');
    } else {
      setError('Order not found');
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
      case 'Order Confirmed':
        return <ClipboardCheckIcon className="h-6 w-6" />;
      case 'Processing':
        return <PackageIcon className="h-6 w-6" />;
      case 'Shipped':
        return <TruckIcon className="h-6 w-6" />;
      case 'Delivered':
        return <CheckCircleIcon className="h-6 w-6" />;
      default:
        return <ClipboardCheckIcon className="h-6 w-6" />;
    }
  };
  return (
    <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-bold text-2xl text-gray-900">Order Tracking</h1>
      <form className="mb-8" onSubmit={handleSearch}>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Order ID (eg: 001)"
              type="text"
              value={searchQuery}
            />
          </div>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Search
          </button>
        </div>
        {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
      </form>
      {/* Order Details */}
      {selectedOrder && (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="font-medium text-gray-900 text-lg">
                  Order #{selectedOrder.orderNumber}
                </h2>
                <p className="text-gray-500 text-sm">
                  Placed on{' '}
                  {new Date(selectedOrder.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <select
                  className="block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  onChange={(e) => updateStatus(e.target.value)}
                  value={selectedOrder.status}
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
              <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200" />
              {selectedOrder.statusHistory.map((status, index) => (
                <div className="relative mb-6 flex items-start" key={index}>
                  <div className="absolute left-0 mt-1">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full bg-white ring-8 ring-white ${
                        index === selectedOrder.statusHistory.length - 1
                          ? 'text-blue-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {getStatusIcon(status.status)}
                    </span>
                  </div>
                  <div className="ml-12">
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900 text-lg">
                        {status.status}
                      </h3>
                    </div>
                    <p className="mt-1 text-gray-500 text-sm">
                      {new Date(status.date).toLocaleString()}
                    </p>
                    {status.note && (
                      <p className="mt-1 text-gray-600 text-sm">
                        {status.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Order Items */}
            <div className="mt-6 border-gray-200 border-t pt-6">
              <h3 className="mb-2 font-medium text-gray-900 text-sm">
                Order Items
              </h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div
                    className="flex items-center justify-between text-sm"
                    key={index}
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24">
                        <Image
                          alt={item.name}
                          className="h-full w-full object-cover"
                          height={100}
                          src={item.image}
                          width={100}
                        />
                      </div>
                      <span className="ml-3 text-gray-700 text-lg">
                        {item.name}
                      </span>
                    </div>
                    <span className="ml-12 text-gray-700 text-lg">
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
            <div className="mt-6 border-gray-200 border-t pt-6">
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
                      selectedOrder.estimatedDelivery
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
