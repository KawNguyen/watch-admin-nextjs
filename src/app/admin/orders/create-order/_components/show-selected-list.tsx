import { ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useWatches } from '@/queries/use-watches';
import type { Product } from '@/types/order';
import PriceEditPopover from './price-edit-popover';
import ProductSearchModal from './product-search-modal';

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
  const handleProductSelect = (selected: Product[]) => {
    const withQty = selected.map((p) => ({
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
          <CardTitle className="mb-2 flex items-center justify-between">
            All Chosen Products
            {selectedProducts.length > 0 && (
              <Badge variant="secondary">
                {selectedProducts.length} item
                {selectedProducts.length > 1 && 's'}
              </Badge>
            )}
          </CardTitle>
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
            <div className="max-h-96 space-y-4 overflow-y-auto pr-2">
              {selectedProducts.map((p) => (
                <div
                  className="grid grid-cols-12 gap-4 rounded-lg border bg-white p-4"
                  key={p.id}
                >
                  <div className="col-span-5 flex items-start gap-4">
                    <Image
                      alt={p.name}
                      className="h-20 w-20 flex-shrink-0 rounded-md object-cover"
                      height={80}
                      src={p.images[0]?.absolute_url || '/placeholder.png'}
                      width={80}
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-muted-foreground text-sm">{p.code}</p>
                    </div>
                  </div>
                  <div className="col-span-2 place-content-center text-center">
                    <PriceEditPopover
                      onPriceChange={(price) => updatePrice(p.id, price)}
                      originalPrice={p.originalPrice}
                      price={p.price}
                    />
                  </div>
                  <div className="col-span-2 place-content-center">
                    <Input
                      className="w-full"
                      min={1}
                      onChange={(e) =>
                        updateQuantity(
                          p.id,
                          Number.parseInt(e.target.value, 10) || 1
                        )
                      }
                      type="number"
                      value={p.quantity}
                    />
                  </div>
                  <div className="col-span-2 place-content-center text-center">
                    <span className="font-semibold text-green-600 text-sm">
                      ${(p.price * p.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="col-span-1 place-content-center">
                    <Button
                      className="text-red-500 hover:bg-red-50 hover:text-red-700"
                      onClick={() => removeProduct(p.id)}
                      size="sm"
                      variant="ghost"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
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
