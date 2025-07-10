'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useWatches } from '@/queries/use-watches';
import type { orderSchema } from '@/schema/order';
import type { Product } from '@/types/order';
import PaymemtCoupon from './_components/coupon';
import CustomerInfo from './_components/customer-info';
import OrderSummary from './_components/order-summary';
import ProductSearchModal from './_components/product-search-modal';
import ShowSelectedList from './_components/show-selected-list';
import { orderApi } from '@/services/create-order';
import { queryClient } from '@/components/provider/provider';
import { toast } from 'sonner';

// import TrackingHistory from './_components/tracking-history';
type OrderFormValues = z.infer<typeof orderSchema>;
export default function HomePage() {
  const { data: products = [] } = useWatches();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'MOMO'>('COD');

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

  const subtotal = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );
  const [discountPct] = useState(0);

  const discountValue = (subtotal * discountPct) / 100;

  const totalPrice = subtotal - discountValue;

  const mutation = useMutation({
    mutationFn: (data: OrderFormValues) => orderApi.createOrder(data),
  });

  const handleCreateOrder = () => {
    mutation.mutate(
      {
        paymentMethod,
        totalPrice,
        orderItems: selectedProducts,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['orders'] });
          toast.success('Create new order successfully');
        },
        onError: () => {
          toast.error('Create new order failed');
        },
      }
    );
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
            <OrderSummary
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              totalPrice={totalPrice}
              subtotal={subtotal}
              discountPct={discountPct}
              discountValue={discountValue}
            />
            <div className="mt-4 flex items-center justify-between">
              <Button className="w-fit" variant="destructive">
                Cancel
              </Button>
              <Button 
              // onSubmit={handleCreateOrder}
               className="w-fit">
                Create
              </Button>
            </div>
            {/* Tracking History */}
            {/* <TrackingHistory /> */}
          </div>
          <div className="col-span-4 space-y-4">
            <Button className="w-full">Confirm Order</Button>
            <div>
              <CustomerInfo
              
              
              />
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
