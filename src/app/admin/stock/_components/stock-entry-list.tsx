"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Package,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/queries/use-session";
import { StockAPI } from "@/services/stock-entry";
import { formatDate, formatMoney } from "@/lib";

export default function StockEntryList() {
  const { data: user } = useMe();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(
    new Set()
  );

  const { data: stockEntries, isLoading } = useQuery({
    queryKey: ["stockEntries"],
    queryFn: StockAPI.getAllStockEntries,
  });

  const filteredEntries =
    stockEntries?.data?.items?.filter((entry: any) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        entry.entryCode.toLowerCase().includes(searchLower) ||
        entry.user?.firstName?.toLowerCase().includes(searchLower) ||
        entry.notes?.toLowerCase().includes(searchLower) ||
        entry.stockItems.some((item: any) =>
          item.watch?.entryCode.toLowerCase().includes(searchLower)
        )
      );
    }) || [];

  const totalEntries = stockEntries?.data?.items?.length || 0;

  const totalValue = stockEntries?.data?.items?.reduce(
    (sum: number, entry: any) => sum + entry.totalPrice,
    0
  );

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
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-bold text-3xl">Nhập Hàng</h1>
          <p className="text-muted-foreground">
            Nhập thêm sản phẩm và có thể xem chi tiết nhập hàng
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/admin/stock/create"
          >
            <Plus />
            Nhập Hàng
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
              placeholder="Tìm chi tiết nhập hàng (STE...)"
              value={searchTerm}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Tổng Lần Nhập</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalEntries}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Tổng Giá Trị</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{formatMoney(totalValue)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <Package className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Chưa có chi tiết nhập hàng
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry: any) => (
            <Link href={`/admin/stock/${entry.id}`}>
              <Card className="overflow-hidden" key={entry.id}>
                <Collapsible open={expandedEntries.has(entry.id)}>
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
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">
                            {entry.stockItems?.length} sản phẩm
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
                </Collapsible>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
