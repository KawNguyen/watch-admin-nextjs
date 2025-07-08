'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWatches } from '@/queries/use-watches';
import type { Product } from '@/types/order';
import PaymemtCoupon from './_components/coupon';
import CustomerInfo from './_components/customer-info';
import OrderSummary from './_components/order-summary';
import ProductSearchModal from './_components/product-search-modal';
import ShowSelectedList from './_components/show-selected-list';
// import TrackingHistory from './_components/tracking-history';

export default function HomePage() {
  const { data: products = [] } = useWatches();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const handleProductSelect = (
    selected: Omit<Product, 'quantity' | 'originalPrice'>[]
  ) => {
    const withQty = selected.map((p) => ({
      ...p,
      quantity: 1,
      originalPrice: p.price,
    }));
    setSelectedProducts(withQty);
    setIsSearchOpen(false);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* ---------------- Main ---------------- */}
          <div className="col-span-8 space-y-6">
            {/* Selected Products */}
            <ShowSelectedList
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
            {/* Summary Order */}
            <OrderSummary selectedProducts={selectedProducts} />
            <div className="mt-4 flex justify-end">
              <Button className="w-fit">Create</Button>
            </div>
            {/* Tracking History */}
            {/* <TrackingHistory /> */}
          </div>
          <div className="col-span-4 space-y-4">
            <div>
              <CustomerInfo />
            </div>
            <div>
              <PaymemtCoupon />
            </div>
          </div>
        </div>
      </div>

      {/* ------------- MODALS ------------- */}
      <ProductSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductSelect={handleProductSelect}
        products={products}
        selectedProducts={selectedProducts}
      />
    </div>
  );
}
