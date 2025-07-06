import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import PriceEditPopover from "./price-edit-popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductSearchModal from "./product-search-modal";
import { useWatches } from "@/queries/use-watches";
import { Product } from "@/types/order";
interface ShowSelectedListProps {
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
const ShowSelectedList = ({
  selectedProducts,
  setSelectedProducts,
}: ShowSelectedListProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: products = [] } = useWatches();
  const updateQuantity = (id: number, qty: number) =>
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, qty) } : p))
    );
  const updatePrice = (id: number, newPrice: number) =>
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: newPrice } : p))
    );
  const removeProduct = (id: number) =>
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  const handleProductSelect = (products: Product[]) => {
    const withQty = products.map((p) => ({
      ...p,
      quantity: 1,
      originalPrice: p.price,
    }));
    setSelectedProducts(withQty);
    setIsSearchOpen(false);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Show All Selected Products
            {selectedProducts.length > 0 && (
              <Badge variant="secondary">
                {selectedProducts.length} item
                {selectedProducts.length > 1 && "s"}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {selectedProducts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No products selected yet.</p>
              <p className="text-sm">
                Click the search button to add products.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {selectedProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 p-4 border rounded-lg bg-white"
                >
                  <Image
                    src={p.images[0]?.absolute_url || "/placeholder.png"}
                    alt={p.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.code}</p>
                  </div>
                  {/* Price */}
                  <div className="w-36 flex items-center gap-1 text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    <PriceEditPopover
                      price={p.price}
                      originalPrice={p.originalPrice}
                      onPriceChange={(price) => updatePrice(p.id, price)}
                    />
                  </div>
                  <div className="w-36 flex items-center gap-1 text-sm">
                    <span className="text-muted-foreground">Qty:</span>
                    <Input
                      type="number"
                      min={1}
                      value={p.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          p.id,
                          Number.parseInt(e.target.value) || 1
                        )
                      }
                      className="w-16 h-8"
                    />
                  </div>{" "}
                  <div className="w-28 text-right font-semibold text-green-600 text-sm">
                    ${(p.price * p.quantity).toFixed(2)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProduct(p.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <ProductSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        selectedProducts={selectedProducts}
        onProductSelect={handleProductSelect}
      />
    </div>
  );
};

export default ShowSelectedList;
