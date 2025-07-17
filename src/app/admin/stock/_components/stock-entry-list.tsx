"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronRight,
  DollarSign,
  FileText,
  Package,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMe } from "@/queries/use-session";
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

  const totalEntries = stockEntries?.data?.items?.length || 0;
  const totalValue =
    stockEntries?.data?.items?.reduce(
      (sum: number, entry: any) => sum + entry.totalPrice,
      0
    ) || 0;
  const totalItems =
    stockEntries?.data?.items?.reduce(
      (sum: number, entry: any) => sum + (entry.stockItems?.length || 0),
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
      <div className="container mx-auto space-y-6 p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Skeleton className="h-9 w-[200px]" />
            <Skeleton className="mt-2 h-4 w-[300px]" />
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
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-bold text-3xl">Stock Entries</h1>
          <p className="text-muted-foreground">
            Manage your stock entries and view detailed items
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/admin/stock/create"
          >
            Create Stock Entry
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
            <Input
              className="pl-10"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by entry code, creator, notes, or item name..."
              value={searchTerm}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Entries</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalEntries}</div>
            <p className="text-muted-foreground text-xs">Stock entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalItems}</div>
            <p className="text-muted-foreground text-xs">Individual items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">${totalValue}</div>
            <p className="text-muted-foreground text-xs">Inventory value</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <Package className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">No entries found</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry: any) => (
            <Card className="overflow-hidden" key={entry.id}>
              <Collapsible
                onOpenChange={() => toggleExpanded(entry.id)}
                open={expandedEntries.has(entry.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer transition-colors hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {expandedEntries.has(entry.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <Badge className="font-mono" variant="outline">
                            {entry.entryCode}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold text-lg">
                            ${entry.totalPrice}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">
                          {entry.stockItems?.length} items
                        </Badge>
                        <div className="text-muted-foreground text-sm">
                          {formatDate(entry.createdAt)}
                        </div>
                      </div>
                    </div>
                    {entry.notes && (
                      <div className="mt-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground text-sm">
                          {entry.notes}
                        </span>
                      </div>
                    )}
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="border-t pt-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-medium text-sm">
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
                            {entry.stockItems?.map((item: any) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
                                    {item.watch.images.length > 0 ? (
                                      <Image
                                        alt={item.watch.name}
                                        className="object-cover"
                                        fill
                                        src={
                                          item.watch.images[0].absolute_url ||
                                          "/placeholder.svg"
                                        }
                                      />
                                    ) : (
                                      <div className="flex h-full w-full items-center justify-center">
                                        <Package className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">
                                    {item.watch.name}
                                  </div>
                                  <div className="text-muted-foreground text-sm">
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

                      <div className="mt-4 rounded-lg bg-muted/30 p-4">
                        <h5 className="mb-2 font-medium text-sm">
                          Entry Information
                        </h5>
                        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
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
