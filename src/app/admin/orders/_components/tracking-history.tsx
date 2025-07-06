"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";

interface TrackingEvent {
  id: number;
  status: string;
  description: string;
  timestamp: string;
  location: string;
  isCompleted: boolean;
}

const mockTrackingData: TrackingEvent[] = [
  {
    id: 1,
    status: "Order Placed",
    description: "Your order has been successfully placed",
    timestamp: "2024-01-15 10:30 AM",
    location: "Online",
    isCompleted: true,
  },
  {
    id: 2,
    status: "Payment Confirmed",
    description: "Payment has been processed successfully",
    timestamp: "2024-01-15 10:35 AM",
    location: "Payment Gateway",
    isCompleted: true,
  },
  {
    id: 3,
    status: "Preparing Order",
    description: "Your items are being prepared for shipment",
    timestamp: "2024-01-15 02:15 PM",
    location: "Warehouse - District 1",
    isCompleted: true,
  },
  {
    id: 4,
    status: "In Transit",
    description: "Package is on the way to delivery address",
    timestamp: "2024-01-16 09:00 AM",
    location: "Distribution Center - District 7",
    isCompleted: false,
  },
  {
    id: 5,
    status: "Out for Delivery",
    description: "Package is out for delivery",
    timestamp: "Expected: 2024-01-16 02:00 PM",
    location: "Local Delivery Hub",
    isCompleted: false,
  },
  {
    id: 6,
    status: "Delivered",
    description: "Package delivered successfully",
    timestamp: "Expected: 2024-01-16 05:00 PM",
    location: "Customer Address",
    isCompleted: false,
  },
];

const getStatusIcon = (status: string, isCompleted: boolean) => {
  const iconClass = `w-5 h-5 ${
    isCompleted ? "text-green-600" : "text-gray-400"
  }`;

  switch (status) {
    case "Order Placed":
      return <CheckCircle className={iconClass} />;
    case "Payment Confirmed":
      return <CheckCircle className={iconClass} />;
    case "Preparing Order":
      return <Package className={iconClass} />;
    case "In Transit":
      return <Truck className={iconClass} />;
    case "Out for Delivery":
      return <Truck className={iconClass} />;
    case "Delivered":
      return <CheckCircle className={iconClass} />;
    default:
      return <Clock className={iconClass} />;
  }
};

export default function TrackingHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Tracking History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTrackingData.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div
                  className={`p-2 rounded-full border-2 ${
                    event.isCompleted
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {getStatusIcon(event.status, event.isCompleted)}
                </div>
                {index < mockTrackingData.length - 1 && (
                  <div
                    className={`w-0.5 h-8 mt-2 ${
                      event.isCompleted ? "bg-green-200" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>

              {/* Event Details */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className={`font-semibold ${
                      event.isCompleted ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {event.status}
                  </h4>
                  <Badge variant={event.isCompleted ? "default" : "secondary"}>
                    {event.isCompleted ? "Completed" : "Pending"}
                  </Badge>
                </div>

                <p
                  className={`text-sm mb-2 ${
                    event.isCompleted ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {event.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.timestamp}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estimated Delivery */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900">Estimated Delivery</h4>
          </div>
          <p className="text-blue-800">
            January 16, 2024 between 2:00 PM - 5:00 PM
          </p>
          <p className="text-sm text-blue-600 mt-1">
            We'll send you updates via SMS and email when your package is out
            for delivery.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
