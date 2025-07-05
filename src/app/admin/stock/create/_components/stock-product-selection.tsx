// components/ProductSelectionModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMemo } from "react";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Products</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="border rounded-lg">
            <div className="flex items-center p-4 border-b bg-muted/30">
              <Checkbox
                checked={
                  selectedIds.length === filteredProducts.length &&
                  filteredProducts.length > 0
                }
                onClick={onSelectAll}
                className="mr-3 h-5 w-5"
              />
              <div className="flex-1 font-medium text-sm">
                Select All ({selectedIds.length} of {filteredProducts.length}{" "}
                selected)
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto divide-y divide-border">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-12 gap-4 p-4 cursor-pointer"
                  onClick={() => onToggle(product.id)}
                >
                  <Checkbox
                    checked={selectedIds.includes(product.id)}
                    onChange={() => onToggle(product.id)}
                    className="h-5 w-5 items-center col-span-1 self-center justify-self-start"
                  />
                  <div className="col-span-9 flex items-center gap-4">
                    <Image
                      src={
                        product.images[0]?.absolute_url || "/placeholder.png"
                      }
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Code: {product.code}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-10">
                    <div className="flex flex-col items-center space-y-2 ">
                      <span>Brand</span>
                      <span>{product.brand?.name}</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 ">
                      <span>Stock</span>
                      <span> {product.currentStock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {selectedIds.length} selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={onApply} disabled={selectedIds.length === 0}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
