"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import { StockEntry, StockEntryDetail } from "@/types/stock-entry";
import { useMe } from "@/queries/use-session";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

export default function StockDetailDialog({
  data,
}: {
  data: StockEntryDetail;
}) {
  const [open, setOpen] = useState(false);
  const { data: user } = useMe();
  const name = `${user?.data?.item.firstName ?? ""} ${
    user?.data?.item.lastName ?? ""
  }`;

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Eye className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Stock Entry Detail</DialogTitle>
          </DialogHeader>

          <div className="space-y- text-md">
            <div>
              Added By: <span className="font-semibold">{name}</span>
            </div>

            <div>
              <strong>Stock Items:</strong>
              <div className="flex flex-col gap-4 mt-2">
                {data.stockItems.map((item, index) => (
                  <div
                    key={index}
                    className="border p-3 rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24">
                        <AspectRatio ratio={1} className="relative">
                          <Image
                            src={
                              item.watch?.images?.[0]?.absolute_url ??
                              "/placeholder.png"
                            }
                            alt={item.watch?.name}
                            fill
                            sizes="5vw"
                            className="object-cover rounded "
                          />
                        </AspectRatio>
                      </div>
                      <div className="w-60 line-clamp-2 font-medium">
                        <span>{item.watch?.name}</span>
                      </div>
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-sm">
                        Quantity: {item.quantity}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-sm">
                        Cost Price: ${item.costPrice}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}