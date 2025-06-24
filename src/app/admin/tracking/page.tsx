// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useState } from "react";
// import { Package2, CheckCircle2, Truck, MapPin, Clock } from "lucide-react";

// interface TrackingStep {
//   status: string;
//   date: string;
//   location: string;
//   completed: boolean;
// }

// export default function TrackingPage() {
//   const [trackingNumber, setTrackingNumber] = useState("");

//   const trackingSteps: TrackingStep[] = [
//     {
//       status: "Order Confirmed",
//       date: "2024-01-20 09:00",
//       location: "Online Store",
//       completed: true,
//     },
//     {
//       status: "Processing",
//       date: "2024-01-20 10:30",
//       location: "Warehouse",
//       completed: true,
//     },
//     {
//       status: "Shipped",
//       date: "2024-01-21 14:15",
//       location: "Distribution Center",
//       completed: true,
//     },
//     {
//       status: "Out for Delivery",
//       date: "2024-01-22 08:45",
//       location: "Local Delivery Center",
//       completed: false,
//     },
//     {
//       status: "Delivered",
//       date: "",
//       location: "Customer Address",
//       completed: false,
//     },
//   ];

//   const handleTrack = () => {
//     console.log("Tracking number:", trackingNumber);
//   };

//   return (
//     <div className="container mx-auto py-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Order Tracking</CardTitle>
//           <CardDescription>Track your order status and location</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex gap-4 mb-8">
//             <Input
//               placeholder="Enter tracking number"
//               value={trackingNumber}
//               onChange={(e) => setTrackingNumber(e.target.value)}
//             />
//             <Button onClick={handleTrack}>Track Order</Button>
//           </div>

//           <div className="relative">
//             {trackingSteps.map((step, index) => (
//               <div key={index} className="flex mb-8 relative">
//                 {index < trackingSteps.length - 1 && (
//                   <div
//                     className={`absolute left-6 top-8 w-0.5 h-full ${
//                       step.completed ? "bg-primary" : "bg-gray-200"
//                     }`}
//                   />
//                 )}
//                 <div className="flex items-center gap-4">
//                   <div
//                     className={`rounded-full p-3 ${
//                       step.completed
//                         ? "bg-primary text-white"
//                         : "bg-gray-100 text-gray-400"
//                     }`}
//                   >
//                     {index === 0 && <Package2 className="h-6 w-6" />}
//                     {index === 1 && <CheckCircle2 className="h-6 w-6" />}
//                     {index === 2 && <Truck className="h-6 w-6" />}
//                     {index === 3 && <MapPin className="h-6 w-6" />}
//                     {index === 4 && <Clock className="h-6 w-6" />}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold">{step.status}</h3>
//                     <div className="text-sm text-gray-500">
//                       {step.date && (
//                         <p>{new Date(step.date).toLocaleString()}</p>
//                       )}
//                       <p>{step.location}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { OrderTracking } from "@/components/TrackingOrders/OrderTracking";
import React from "react";

const TrackingPage = () => {
  return (
    <div>
      <OrderTracking />
    </div>
  );
};

export default TrackingPage;
