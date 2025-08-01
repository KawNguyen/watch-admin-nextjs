"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, Scroll } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props {
  data: any[];
}

export default function LowStockTable({ data }: Props) {
  return (
    <Card className="max-h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-7 w-7 text-orange-500" /> Sản phẩm sắp hết
          hàng
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-2">Hình</div>
                <div className="col-span-8">Tên</div>
                <div className="col-span-2">Số lượng</div>
              </div>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ScrollArea className="h-[250px]">
              {data?.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="grid grid-cols-12 items-center gap-2">
                      <div className="col-span-2">
                        <Image
                          src={p.watch.images[0].absolute_url}
                          alt={p.watch.name}
                          width={500}
                          height={500}
                          className="size-16 object-cover"
                        />
                      </div>
                      <div className="col-span-8">
                        <div className=" font-medium">{p.watch.name}</div>
                      </div>
                      <span
                        className={cn(
                          p.lowStockThreshold <= 5
                            ? "text-red-500"
                            : "text-green-700"
                        )}
                      >
                        {p.quantity}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </ScrollArea>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
