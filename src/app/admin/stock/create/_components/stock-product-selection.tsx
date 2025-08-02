"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface StockProductSelectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedIds: number[];
  onToggle: (id: number) => void;
  onSelectAll: () => void;
  onApply: () => void;
}

export function StockProductSelection({
  open,
  onOpenChange,
  products,
  searchQuery,
  setSearchQuery,
  selectedIds,
  onToggle,
  onSelectAll,
  onApply,
}: StockProductSelectionProps) {
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[80vh] max-w-6xl">
        <DialogHeader>
          <DialogTitle>Chọn Sản Phẩm</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
            <Input
              className="pl-10"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên..."
              value={searchQuery}
            />
          </div>

          <div className="rounded-lg border">
            <div className="flex items-center border-b bg-muted/30 p-4">
              <Checkbox
                checked={
                  selectedIds.length === filteredProducts.length &&
                  filteredProducts.length > 0
                }
                className="mr-3 h-5 w-5"
                onClick={onSelectAll}
              />
              <div className="flex-1 font-medium text-sm">
                Chọn hết ({selectedIds.length} trong {filteredProducts.length}{" "}
                được chọn)
              </div>
            </div>
            <div className="max-h-96 divide-y divide-border overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  className="grid cursor-pointer grid-cols-12 gap-4 p-4"
                  key={product.id}
                  onClick={() => onToggle(product.id)}
                >
                  <Checkbox
                    checked={selectedIds.includes(product.id)}
                    className="col-span-1 h-5 w-5 items-center self-center justify-self-start"
                    onChange={() => onToggle(product.id)}
                  />
                  <div className="col-span-6 flex items-center gap-4">
                    <Image
                      alt={product.name}
                      className="rounded-md object-cover"
                      height={80}
                      src={
                        product.images[0]?.absolute_url || "/placeholder.png"
                      }
                      width={80}
                    />
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-muted-foreground text-sm">
                        Code: {product.code}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-5 flex items-center justify-end gap-x-32">
                    <div className="flex flex-col items-center space-y-2 ">
                      <span className="text-wrap">Thương Hiệu</span>
                      <span>
                        <Badge variant="default">{product.brand?.name}</Badge>
                      </span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 ">
                      <span>Số Lượng</span>
                      <span>
                        {product.inventory.quantity >
                        product.inventory.lowStockThreshold ? (
                          <Badge variant="success">
                            {product.inventory.quantity}
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            {product.inventory.quantity}
                          </Badge>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="text-muted-foreground text-sm">
              {selectedIds.length} được chọn
            </div>
            <div className="flex gap-2">
              <Button onClick={() => onOpenChange(false)} variant="outline">
                Hủy
              </Button>
              <Button disabled={selectedIds.length === 0} onClick={onApply}>
                Chọn
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
