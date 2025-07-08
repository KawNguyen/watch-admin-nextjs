'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { Product } from '@/types/order';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
        selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleProductToggle = (product: Product) => {
    setTempSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleSubmit = () => {
    onProductSelect(tempSelectedProducts);
  };

  const handleCancel = () => {
    setTempSelectedProducts(selectedProducts);
    setSearchTerm('');
    setSelectedCategory('all');
    onClose();
  };

  return (
    <Dialog onOpenChange={handleCancel} open={isOpen}>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Products
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                className="w-full"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                value={searchTerm}
              />
            </div>
          </div>
          {/* Product List */}
          <div className="hide-scrollbar max-h-96 overflow-y-auto rounded-lg border">
            {filteredProducts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Search className="mx-auto mb-2 h-8 w-8" />
                <p>No products found.</p>
              </div>
            ) : (
              <div className="space-y-2 p-4">
                {filteredProducts.map((product) => {
                  const isSelected = tempSelectedProducts.some(
                    (p) => p.id === product.id
                  );
                  return (
                    <Fragment key={product.id}>
                      <button
                        className={`flex w-full cursor-pointer items-center gap-4 rounded-lg p-4 ${
                          isSelected ? 'bg-gray-100 ' : 'bg-white'
                        }`}
                        onClick={() => handleProductToggle(product)}
                        type="button"
                      >
                        <Checkbox
                          checked={isSelected}
                          className="pointer-events-none"
                          onChange={() => handleProductToggle(product)}
                        />
                        <Image
                          alt={product.name}
                          className="flex-shrink-0 rounded-md object-cover"
                          height={80}
                          src={
                            product.images[0]?.absolute_url ||
                            '/placeholder.png'
                          }
                          width={80}
                        />
                        <div className="flex-1">
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-muted-foreground text-sm">
                            Code: {product.code}
                          </div>
                        </div>

                        <div className="flex w-28 flex-col items-center justify-center text-center">
                          <div className="text-muted-foreground text-sm">
                            Brand
                          </div>
                          <div className="font-medium">
                            {product.brand?.name}
                          </div>
                        </div>

                        <div className="flex w-24 flex-col items-center justify-center text-center">
                          <div className="text-muted-foreground text-sm">
                            Stock
                          </div>
                          <div className="font-medium">
                            {product.currentStock > 0 ? (
                              product.currentStock
                            ) : (
                              <Badge variant="destructive">Out of stock</Badge>
                            )}
                          </div>
                        </div>
                      </button>
                      <Separator className="last:hidden" />
                    </Fragment>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-gray-500">
              {tempSelectedProducts.length} product(s) selected
            </span>
            <div className="flex gap-2">
              <Button
                className="w-fit"
                onClick={handleCancel}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                className="w-32 bg-black px-6 text-white"
                disabled={tempSelectedProducts.length === 0}
                onClick={handleSubmit}
              >
                Choose
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
