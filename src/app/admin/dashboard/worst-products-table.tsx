"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingDown } from "lucide-react";
import { formatMoney } from "@/lib";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  data: any[];
}

export default function WorstProductsTable({ data }: Props) {
  return (
    <Card className="max-h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-7 w-7 text-red-500" /> Sản phẩm bán ít
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <div>
                <div className="grid grid-cols-12 items-center gap-2">
                  <div className="col-span-2">Hình</div>
                  <div className="col-span-6">Tên</div>
                  <div className="col-span-2">Giá</div>
                  <div className="col-span-2">Số lượng bán ra</div>
                </div>
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                          src={
                            p.images[0]?.absolute_url ||
                            "https://placehold.co/500x500/png"
                          }
=======
                          src={p.images[0]?.absolute_url}
>>>>>>> Stashed changes
=======
                          src={p.images[0]?.absolute_url}
>>>>>>> Stashed changes
                          alt={p.name}
                          width={500}
                          height={500}
                          className="size-16 object-cover"
                        />
                      </div>
                      <div className="col-span-6">
                        <span className="font-medium">{p.name}</span>
                      </div>
                      <div className="col-span-2">{formatMoney(p.price)}</div>
                      <div className="col-span-2">{p.totalSoldQuantity}</div>
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
