// "use client";

// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   Search,
//   Package,
//   DollarSign,
//   ChevronDown,
//   ChevronRight,
//   User,
//   FileText,
// } from "lucide-react";
// import Image from "next/image";
// import { useMe } from "@/queries/use-session";
// import Link from "next/link";
// const stockData = {
//   status: "success",
//   message: "Fetch all stock entries successfully",
//   data: {
//     items: [
//       {
//         id: "4f5db3ad-fa7e-463b-a31a-afa6a161eb79",
//         entryCode: "STEC0DC999",
//         totalPrice: 4,
//         createdBy: "a0b8da9e-6b71-48af-bb31-4d72117c242b",
//         notes: "á打算打算·",
//         createdAt: "2025-07-05T04:48:32.348Z",
//         updatedAt: "2025-07-05T04:48:32.348Z",
//         deletedAt: null,
//         user: {
//           id: "a0b8da9e-6b71-48af-bb31-4d72117c242b",
//           email: "tranhailoc7@gmail.com",
//           firstName: "Hải",
//         },
//         stockItems: [
//           {
//             id: "8d26aadc-8631-4ecb-a42d-111882271a92",
//             quantity: 1,
//             costPrice: 2,
//             stockEntryId: "4f5db3ad-fa7e-463b-a31a-afa6a161eb79",
//             watchId: "c6d43612-560f-46c6-8b98-a487c199b5a1",
//             createdAt: "2025-07-05T04:48:32.348Z",
//             updatedAt: "2025-07-05T04:48:32.348Z",
//             deletedAt: null,
//             watch: {
//               id: "c6d43612-560f-46c6-8b98-a487c199b5a1",
//               name: "dsjnskjdvnjsfdnvjdnvjdn",
//               images: [
//                 {
//                   id: "ee844964-3738-49cc-ad87-3d108db322fd",
//                   public_id: "aead6usckq26j0iyeuyk",
//                   absolute_url:
//                     "https://res.cloudinary.com/dhuniu3mt/image/upload/v1751557990/aead6usckq26j0iyeuyk.png",
//                   watchId: "c6d43612-560f-46c6-8b98-a487c199b5a1",
//                   createdAt: "2025-07-03T15:53:13.291Z",
//                   updatedAt: "2025-07-03T15:53:13.291Z",
//                   deletedAt: null,
//                 },
//               ],
//             },
//           },
//           {
//             id: "9429fd32-9533-4645-a458-001bca92e3ec",
//             quantity: 1,
//             costPrice: 2,
//             stockEntryId: "4f5db3ad-fa7e-463b-a31a-afa6a161eb79",
//             watchId: "cd576164-2aad-4359-9c29-f0bc67610d6d",
//             createdAt: "2025-07-05T04:48:32.348Z",
//             updatedAt: "2025-07-05T04:48:32.348Z",
//             deletedAt: null,
//             watch: {
//               id: "cd576164-2aad-4359-9c29-f0bc67610d6d",
//               name: "1",
//               images: [
//                 {
//                   id: "190d04de-4d73-4b9e-ba5b-e022f877c208",
//                   public_id: "s0mtv9bofibv5yygeugf",
//                   absolute_url:
//                     "https://res.cloudinary.com/dhuniu3mt/image/upload/v1751555965/s0mtv9bofibv5yygeugf.jpg",
//                   watchId: "cd576164-2aad-4359-9c29-f0bc67610d6d",
//                   createdAt: "2025-07-03T15:26:20.214Z",
//                   updatedAt: "2025-07-03T15:26:20.214Z",
//                   deletedAt: null,
//                 },
//               ],
//             },
//           },
//         ],
//       },
//       {
//         id: "5f6db3ad-fa7e-463b-a31a-afa6a161eb80",
//         entryCode: "STEC0DC998",
//         totalPrice: 8,
//         createdBy: "b1c8da9e-6b71-48af-bb31-4d72117c242c",
//         notes: "Second entry for testing",
//         createdAt: "2025-07-04T04:48:32.348Z",
//         updatedAt: "2025-07-04T04:48:32.348Z",
//         deletedAt: null,
//         user: {
//           id: "b1c8da9e-6b71-48af-bb31-4d72117c242c",
//           email: "john.doe@example.com",
//           firstName: "John",
//         },
//         stockItems: [
//           {
//             id: "7d26aadc-8631-4ecb-a42d-111882271a93",
//             quantity: 2,
//             costPrice: 4,
//             stockEntryId: "5f6db3ad-fa7e-463b-a31a-afa6a161eb80",
//             watchId: "d7d43612-560f-46c6-8b98-a487c199b5a2",
//             createdAt: "2025-07-04T04:48:32.348Z",
//             updatedAt: "2025-07-04T04:48:32.348Z",
//             deletedAt: null,
//             watch: {
//               id: "d7d43612-560f-46c6-8b98-a487c199b5a2",
//               name: "Premium Watch Model",
//               images: [
//                 {
//                   id: "ff844964-3738-49cc-ad87-3d108db322fe",
//                   public_id: "premium_watch_001",
//                   absolute_url: "/placeholder.svg?height=100&width=100",
//                   watchId: "d7d43612-560f-46c6-8b98-a487c199b5a2",
//                   createdAt: "2025-07-02T15:53:13.291Z",
//                   updatedAt: "2025-07-02T15:53:13.291Z",
//                   deletedAt: null,
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     ],
//   },
//   meta: {
//     limit: 10,
//     page: 1,
//     totalItems: 2,
//     totalPages: 1,
//   },
// };

// export default function StockEntryList() {
//   const { data: user } = useMe();
//   const fullName = `${user?.data?.item.firstName ?? ""} ${
//     user?.data?.item.lastName ?? ""
//   }`;
//   const [searchTerm, setSearchTerm] = useState("");
//   const [expandedEntries, setExpandedEntries] = useState<Set<string>>(
//     new Set()
//   );

//   const toggleExpanded = (entryId: string) => {
//     const newExpanded = new Set(expandedEntries);
//     if (newExpanded.has(entryId)) {
//       newExpanded.delete(entryId);
//     } else {
//       newExpanded.add(entryId);
//     }
//     setExpandedEntries(newExpanded);
//   };

//   // Filter entries based on search
//   const filteredEntries = stockData.data.items.filter((entry) => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       entry.entryCode.toLowerCase().includes(searchLower) ||
//       entry.user.firstName.toLowerCase().includes(searchLower) ||
//       entry.notes.toLowerCase().includes(searchLower) ||
//       entry.stockItems.some((item) =>
//         item.watch.name.toLowerCase().includes(searchLower)
//       )
//     );
//   });

//   // Calculate summary statistics
//   const totalEntries = stockData.data.items.length;
//   const totalValue = stockData.data.items.reduce(
//     (sum, entry) => sum + entry.totalPrice,
//     0
//   );
//   const totalItems = stockData.data.items.reduce(
//     (sum, entry) => sum + entry.stockItems.length,
//     0
//   );

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">Stock Entries</h1>
//           <p className="text-muted-foreground">
//             Manage your stock entries and view detailed items
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Link
//             href="/admin/stockv2/create"
//             className={buttonVariants({ variant: "default" })}
//           >
//             Create Stock Entry
//           </Link>
//         </div>
//       </div>
//       {/* Search */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by entry code, creator, notes, or item name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Stock Entries List */}
//       <div className="space-y-4">
//         {filteredEntries.length === 0 ? (
//           <Card>
//             <CardContent className="text-center py-8">
//               <div className="flex flex-col items-center gap-2">
//                 <Package className="h-8 w-8 text-muted-foreground" />
//                 <p className="text-muted-foreground">No entries found</p>
//               </div>
//             </CardContent>
//           </Card>
//         ) : (
//           filteredEntries.map((entry) => (
//             <Card key={entry.id} className="overflow-hidden">
//               <Collapsible
//                 open={expandedEntries.has(entry.id)}
//                 onOpenChange={() => toggleExpanded(entry.id)}
//               >
//                 <CollapsibleTrigger asChild>
//                   <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-2">
//                           {expandedEntries.has(entry.id) ? (
//                             <ChevronDown className="h-4 w-4" />
//                           ) : (
//                             <ChevronRight className="h-4 w-4" />
//                           )}
//                           <Badge variant="outline" className="font-mono">
//                             {entry.entryCode}
//                           </Badge>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <DollarSign className="h-4 w-4 text-muted-foreground" />
//                           <span className="text-lg font-semibold">
//                             {entry.totalPrice}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <Badge variant="secondary">
//                           {entry.stockItems.length} items
//                         </Badge>
//                         <div className="text-sm text-muted-foreground">
//                           {formatDate(entry.createdAt)}
//                         </div>
//                       </div>
//                     </div>
//                     {entry.notes && (
//                       <div className="flex items-center gap-2 mt-2">
//                         <FileText className="h-4 w-4 text-muted-foreground" />
//                         <span className="text-sm text-muted-foreground">
//                           {entry.notes}
//                         </span>
//                       </div>
//                     )}
//                   </CardHeader>
//                 </CollapsibleTrigger>

//                 <CollapsibleContent>
//                   <CardContent className="pt-0">
//                     <div className="border-t pt-4">
//                       <div className="flex items-center justify-between mb-4">
//                         <h4 className="text-sm font-medium">
//                           Stock Items Details
//                         </h4>
//                       </div>

//                       <div className="rounded-md border">
//                         <Table>
//                           <TableHeader>
//                             <TableRow>
//                               <TableHead className="w-[80px]">Image</TableHead>
//                               <TableHead>Product Name</TableHead>
//                               <TableHead>Quantity</TableHead>
//                               <TableHead>Cost Price</TableHead>
//                               <TableHead>Total Value</TableHead>
//                               <TableHead>Date Added</TableHead>
//                             </TableRow>
//                           </TableHeader>
//                           <TableBody>
//                             {entry.stockItems.map((item) => (
//                               <TableRow key={item.id}>
//                                 <TableCell>
//                                   <div className="w-12 h-12 relative rounded-md overflow-hidden bg-muted">
//                                     {item.watch.images.length > 0 ? (
//                                       <Image
//                                         src={
//                                           item.watch.images[0].absolute_url ||
//                                           "/placeholder.svg"
//                                         }
//                                         alt={item.watch.name}
//                                         fill
//                                         className="object-cover"
//                                       />
//                                     ) : (
//                                       <div className="w-full h-full flex items-center justify-center">
//                                         <Package className="h-4 w-4 text-muted-foreground" />
//                                       </div>
//                                     )}
//                                   </div>
//                                 </TableCell>
//                                 <TableCell>
//                                   <div className="font-medium">
//                                     {item.watch.name}
//                                   </div>
//                                   <div className="text-sm text-muted-foreground">
//                                     ID: {item.watch.id}
//                                   </div>
//                                 </TableCell>
//                                 <TableCell>
//                                   <Badge variant="secondary">
//                                     {item.quantity}
//                                   </Badge>
//                                 </TableCell>
//                                 <TableCell className="font-medium">
//                                   ${item.costPrice}
//                                 </TableCell>
//                                 <TableCell className="font-medium">
//                                   ${item.quantity * item.costPrice}
//                                 </TableCell>
//                                 <TableCell className="text-muted-foreground">
//                                   {formatDate(item.createdAt)}
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                       </div>

//                       <div className="mt-4 p-4 bg-muted/30 rounded-lg">
//                         <h5 className="text-sm font-medium mb-2">
//                           Entry Information
//                         </h5>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                           <div className="flex items-center gap-2">
//                             <User className="h-4 w-4 text-muted-foreground" />
//                             <span className="font-medium">Created by:</span>
//                             <span>
//                               {fullName} <span>({entry.user.email})</span>
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Package className="h-4 w-4 text-muted-foreground" />
//                             <span className="font-medium">Entry ID:</span>
//                             <span className="font-mono text-xs">
//                               {entry.id}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </CollapsibleContent>
//               </Collapsible>
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Search,
  Package,
  DollarSign,
  ChevronDown,
  ChevronRight,
  User,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { useMe } from "@/queries/use-session";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { StockAPI } from "@/services/stock-entry";

export default function StockEntryList() {
  const { data: user } = useMe();
  const fullName = `${user?.data?.item.firstName ?? ""} ${
    user?.data?.item.lastName ?? ""
  }`;
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(
    new Set()
  );

  // Fetch stock entries using React Query
  const { data: stockEntries, isLoading } = useQuery({
    queryKey: ["stock-entries"],
    queryFn: StockAPI.getAllStockEntries,
  });

  const toggleExpanded = (entryId: string) => {
    const newExpanded = new Set(expandedEntries);
    if (newExpanded.has(entryId)) {
      newExpanded.delete(entryId);
    } else {
      newExpanded.add(entryId);
    }
    setExpandedEntries(newExpanded);
  };

  // Filter entries based on search
  const filteredEntries =
    stockEntries?.data?.items?.filter((entry: any) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        entry.entryCode.toLowerCase().includes(searchLower) ||
        entry.user?.firstName?.toLowerCase().includes(searchLower) ||
        entry.notes?.toLowerCase().includes(searchLower) ||
        entry.stockItems.some((item: any) =>
          item.watch.name.toLowerCase().includes(searchLower)
        )
      );
    }) || [];

  // Calculate summary statistics
  const totalEntries = stockEntries?.data?.items?.length || 0;
  const totalValue =
    stockEntries?.data?.items?.reduce(
      (sum: number, entry: any) => sum + entry.totalPrice,
      0
    ) || 0;
  const totalItems =
    stockEntries?.data?.items?.reduce(
      (sum: number, entry: any) => sum + entry.stockItems.length,
      0
    ) || 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-9 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-2" />
          </div>
          <Skeleton className="h-10 w-[180px]" />
        </div>

        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>

        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-[120px]" />
                  <Skeleton className="h-6 w-[60px]" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-[80px]" />
                  <Skeleton className="h-4 w-[120px]" />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Stock Entries</h1>
          <p className="text-muted-foreground">
            Manage your stock entries and view detailed items
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/stockv2/create"
            className={buttonVariants({ variant: "default" })}
          >
            Create Stock Entry
          </Link>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by entry code, creator, notes, or item name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEntries}</div>
            <p className="text-xs text-muted-foreground">Stock entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Individual items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue}</div>
            <p className="text-xs text-muted-foreground">Inventory value</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <div className="flex flex-col items-center gap-2">
                <Package className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">No entries found</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry: any) => (
            <Card key={entry.id} className="overflow-hidden">
              <Collapsible
                open={expandedEntries.has(entry.id)}
                onOpenChange={() => toggleExpanded(entry.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {expandedEntries.has(entry.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <Badge variant="outline" className="font-mono">
                            {entry.entryCode}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-lg font-semibold">
                            ${entry.totalPrice}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">
                          {entry.stockItems.length} items
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(entry.createdAt)}
                        </div>
                      </div>
                    </div>
                    {entry.notes && (
                      <div className="flex items-center gap-2 mt-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {entry.notes}
                        </span>
                      </div>
                    )}
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium">
                          Stock Items Details
                        </h4>
                      </div>

                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[80px]">Image</TableHead>
                              <TableHead>Product Name</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Cost Price</TableHead>
                              <TableHead>Total Value</TableHead>
                              <TableHead>Date Added</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {entry.stockItems.map((item: any) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <div className="w-12 h-12 relative rounded-md overflow-hidden bg-muted">
                                    {item.watch.images.length > 0 ? (
                                      <Image
                                        src={
                                          item.watch.images[0].absolute_url ||
                                          "/placeholder.svg"
                                        }
                                        alt={item.watch.name}
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Package className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">
                                    {item.watch.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    ID: {item.watch.id}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="secondary">
                                    {item.quantity}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">
                                  ${item.costPrice}
                                </TableCell>
                                <TableCell className="font-medium">
                                  ${item.quantity * item.costPrice}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {formatDate(item.createdAt)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-sm font-medium mb-2">
                          Entry Information
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Created by:</span>
                            <span>
                              {entry.user?.firstName || "Unknown"}{" "}
                              <span>({entry.user?.email || "No email"})</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Entry ID:</span>
                            <span className="font-mono text-xs">
                              {entry.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
