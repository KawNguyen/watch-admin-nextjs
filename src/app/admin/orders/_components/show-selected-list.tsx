import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useWatches } from "@/queries/use-watches";
import type { Product } from "@/types/order";
import PriceEditPopover from "./price-edit-popover";
import ProductSearchModal from "./product-search-modal";
import { formatMoney } from "@/lib";

interface ShowSelectedListProps {
  selectedProducts: any[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

const ShowSelectedList = ({
  selectedProducts,
  setSelectedProducts,
}: ShowSelectedListProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: products = [] } = useWatches();

  const updateQuantity = (watchId: string, qty: number) =>
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.watchId === watchId ? { ...p, quantity: Math.max(1, qty) } : p
      )
    );

  const updatePrice = (watchId: string, newPrice: number) =>
    setSelectedProducts((prev) =>
      prev.map((p) => (p.watchId === watchId ? { ...p, price: newPrice } : p))
    );

  const removeProduct = (watchId: string) =>
    setSelectedProducts((prev) => prev.filter((p) => p.watchId !== watchId));

  const handleProductSelect = (selected: Product[]) => {
    const withQty = selected.map((p) => ({
      watchId: p.id,
      quantity: 1,
      price: p.price,
    }));

    setSelectedProducts(withQty);
    setIsSearchOpen(false);
  };

  const getProductDetails = (watchId: string) => {
    return products.find((p: any) => p.id === watchId);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="mb-2">
            <CardTitle className="flex items-center justify-between">
              Selected Products
              {selectedProducts.length > 0 && (
                <Badge variant="secondary">
                  {selectedProducts.length} product
                  {selectedProducts.length > 1 && "s"}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Choose products to add to the order. You can adjust quantity and
              price for each selected product.
            </CardDescription>
          </div>
          <Input
            className="w-full"
            onClick={() => setIsSearchOpen(true)}
            placeholder="Search Products"
            type="text"
          />
        </CardHeader>

        <CardContent>
          {selectedProducts.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center text-muted-foreground">
              <ShoppingCart className="mx-auto h-8 w-8 opacity-50" />
              <span className="mb-2">No products selected yet.</span>
              <Button className="w-fit" onClick={() => setIsSearchOpen(true)}>
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="max-h-96 space-y-4 overflow-y-auto">
              {selectedProducts.map((p) => {
                const productDetails = getProductDetails(p.watchId);
                return (
                  <div
                    className="grid grid-cols-12 gap-4 rounded-lg border bg-white p-4"
                    key={p.watchId}
                  >
                    <div className="col-span-5 flex items-start gap-4">
                      <Image
                        alt={productDetails?.name || "Product"}
                        className="h-20 w-20 flex-shrink-0 rounded-md object-cover"
                        height={80}
                        src={
                          productDetails?.images[0]?.absolute_url ||
                          "/placeholder.png"
                        }
                        width={80}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{productDetails?.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {productDetails?.code}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 place-content-center text-center">
                      <PriceEditPopover
                        onPriceChange={(price) => updatePrice(p.watchId, price)}
                        originalPrice={productDetails?.price || p.price}
                        price={p.price}
                      />
                    </div>
                    <div className="col-span-2 place-content-center">
                      <Input
                        className="w-full"
                        min={1}
                        onChange={(e) =>
                          updateQuantity(
                            p.watchId,
                            Number.parseInt(e.target.value, 10) || 1
                          )
                        }
                        type="number"
                        value={p.quantity}
                      />
                    </div>
                    <div className="col-span-2 place-content-center text-center">
                      <span className="font-semibold text-green-600 text-sm">
                        {formatMoney(p.price * p.quantity)}
                      </span>
                    </div>
                    <div className="col-span-1 place-content-center">
                      <Button
                        className="text-red-500 hover:bg-red-50 hover:text-red-700"
                        onClick={() => removeProduct(p.watchId)}
                        size="icon"
                        variant="ghost"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
      <ProductSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductSelect={handleProductSelect}
        products={products}
        selectedProducts={selectedProducts}
      />
    </div>
  );
};

export default ShowSelectedList;
