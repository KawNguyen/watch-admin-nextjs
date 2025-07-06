"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/order";



interface ProductSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: any[];
  selectedProducts: Product[];
  onProductSelect: (products: Product[]) => void;
}

export default function ProductSearchModal({
  isOpen,
  onClose,
  products,
  selectedProducts,
  onProductSelect,
}: ProductSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [tempSelectedProducts, setTempSelectedProducts] =
    useState<Product[]>(selectedProducts);

  // Reset temp selection when modal opens
  useState(() => {
    if (isOpen) {
      setTempSelectedProducts(selectedProducts);
    }
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleProductToggle = (product: Product) => {
    setTempSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleSubmit = () => {
    onProductSelect(tempSelectedProducts);
  };

  const handleCancel = () => {
    setTempSelectedProducts(selectedProducts);
    setSearchTerm("");
    setSelectedCategory("all");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Products
            {tempSelectedProducts.length > 0 && (
              <Badge variant="secondary">
                {tempSelectedProducts.length} selected
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          {/* Product List */}
          <div className="max-h-96 overflow-y-auto border rounded-lg">
            {filteredProducts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2" />
                <p>No products found.</p>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {filteredProducts.map((product) => {
                  const isSelected = tempSelectedProducts.some(
                    (p) => p.id === product.id
                  );
                  return (
                    <div
                      key={product.id}
                      className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-blue-50 border-blue-200"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => handleProductToggle(product)}
                    >
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleProductToggle(product)}
                        className="pointer-events-none"
                      />
                      <Image
                        src={
                          product.images[0]?.absolute_url || "/placeholder.png"
                        }
                        alt={product.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Code: {product.code}
                        </div>
                      </div>

                      <div className="w-28 text-center flex flex-col justify-center items-center">
                        <div className="text-sm text-muted-foreground">
                          Brand
                        </div>
                        <div className="font-medium">{product.brand?.name}</div>
                      </div>

                      <div className="w-24 text-center flex flex-col justify-center items-center">
                        <div className="text-sm text-muted-foreground">
                          Stock
                        </div>
                        <div className="font-medium">
                          {product.currentStock}
                        </div>
                      </div>

                      <div className="w-24 text-center">
                        {isSelected && (
                          <div className="text-blue-600 font-medium">
                            Selected
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel} className="h-10">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={tempSelectedProducts.length === 0}
                className="bg-black text-white px-6"
                size="lg"
              >
                Submit ({tempSelectedProducts.length})
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
