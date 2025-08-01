"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PackageX } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  data: any[];
}

export default function NoSoldProducts({ data }: Props) {
  return (
    <Card className="max-h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PackageX className="h-7 w-7 text-red-500" /> Sản phẩm không bán được
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-2">Hình</div>
                <div className="col-span-8">Tên</div>
                <div className="col-span-2">Giá</div>
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
                          src={p.images[0].absolute_url}
                          alt={p.name}
                          width={500}
                          height={500}
                          className="size-16 object-cover"
                        />
                      </div>
                      <div className="col-span-8">
                        <div className=" font-medium">{p.name}</div>
                      </div>
                      <div className="col-span-2">
                        <div className=" font-medium">
                          {formatMoney(p.price)}
                        </div>
                      </div>
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
