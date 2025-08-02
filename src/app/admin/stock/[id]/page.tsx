"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Package,
  UserIcon,
  DollarSign,
  Copy,
  CornerDownLeft,
  Notebook,
} from "lucide-react";
import Link from "next/link";
import { useStockEntryById } from "@/queries/use-stock-entry";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { formatMoney } from "@/lib";
import { Metadata } from "next";


interface DetailStockPageProps {
  params: {
    id: string;
  };
}

const DetailStockPage = ({ params }: DetailStockPageProps) => {
  const { data } = useStockEntryById(params.id);
  const [isCopied, setIsCopied] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCopy = async (text: string) => {
    try {
      await window.navigator.clipboard.writeText(text);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link
        className="mb-4 flex items-center gap-1 underline"
        href="/admin/stock/"
      >
        <CornerDownLeft className="size-5" /> Trở về
      </Link>
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Package className="h-6 w-6" />
                Chi tiết nhập hàng
              </CardTitle>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {data?.data.item?.entryCode}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Tổng giá trị</p>
                  <p className="font-semibold text-lg">
                    {formatMoney(data?.data?.item.totalPrice)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Thời gian nhập
                  </p>
                  <p className="text-sm">
                    {formatDate(data?.data?.item.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <UserIcon className="h-4 w-4" />
                Nhập Bởi
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {data?.data.item.user.lastName}
                    {data?.data.item.user.firstName}
                  </span>
                  <Badge variant="outline">{data?.data.item.user.email}</Badge>
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                  ID: {data?.data.item.user.id}
                </p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <Package className="h-4 w-4" />
                Các sản phẩm
              </h3>
              <div className="space-y-4">
                {data?.data.item.stockItems.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 bg-muted/30"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Sản phẩm #{index + 1}</h4>
                      <Badge variant="secondary">
                        Số lượng: {item.quantity}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">ID sản phẩm</p>
                        <Tooltip open={isCopied}>
                          <TooltipTrigger>
                            <div
                              onClick={() => handleCopy(item.watchId)}
                              className="flex items-center gap-2 group hover:cursor-pointer"
                            >
                              <Copy className="size-4 text-muted-foreground flex-shrink-0" />
                              <p className="font-mono line-clamp-1">
                                {item.watchId}
                              </p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Copied!</TooltipContent>
                        </Tooltip>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Giá gốc</p>
                        <p className="font-semibold">
                          {formatMoney(item.costPrice)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Số lượng</p>
                        <p className="font-semibold">{item.quantity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tổng Tiền</p>
                        <p className="font-semibold">
                          {formatMoney(item.quantity * item.costPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Notebook className="size-4" />
                    Ghi chú
                  </h4>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {data?.data.item.notes || (
                      <span className="text-sm">Không có ghi chú</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4">Tóm tắt</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">
                    {data?.data.item.stockItems.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Tổng Sản Phẩm</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">
                    {data?.data.item.stockItems.reduce(
                      (sum: any, item: any) => sum + item.quantity,
                      0
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">Tổng Số Lượng</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">
                    {formatMoney(data?.data.item.totalPrice || 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Tổng Giá Trị</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailStockPage;
