"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Search,
  X,
  ShoppingCart,
  Edit,
  QrCode,
  Wallet,
  CircleDollarSign,
} from "lucide-react";
import TrackingHistory from "./_components/tracking-history";
import ProductSearchModal from "./_components/product-search-modal";
import PriceEditPopover from "./_components/price-edit-popover";
import CustomerEditModal from "./_components/customer-edit-modal";
import CustomerInfo from "./_components/customer-info";
import PaymemtCoupon from "./_components/payment-coupon";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useWatches } from "@/queries/use-watches";
import ShowSelectedList from "./_components/show-selected-list";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  code: string;
  description: string;
  images: any;
  quantity: number;
}

interface CustomerInfo {
  street: string;
  province: string;
  ward: string;
}
export default function HomePage() {
  const { data: products = [] } = useWatches();

  /* ---------- State ---------- */
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [discountPct, setDiscountPct] = useState(0);

  /* ---------- Helpers ---------- */
  const validCoupons: Record<string, number> = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME: 15,
  };

  const subtotal = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );
  const discountValue = (subtotal * discountPct) / 100;
  const totalPrice = subtotal - discountValue;

  /* ---------- Product handlers ---------- */
  const handleProductSelect = (
    products: Omit<Product, "quantity" | "originalPrice">[]
  ) => {
    const withQty = products.map((p) => ({
      ...p,
      quantity: 1,
      originalPrice: p.price,
    }));
    setSelectedProducts(withQty);
    setIsSearchOpen(false);
  };
  /* ---------- Coupon ---------- */
  const applyCoupon = () => {
    const pct = validCoupons[couponCode.trim().toUpperCase()] ?? 0;
    setDiscountPct(pct);
  };

  /* ================== RENDER ================== */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* ---------------- Main ---------------- */}
          <div className="col-span-8 space-y-6">
            {/* Search Button */}
            <Card>
              <CardContent className="p-6">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Products
                </Button>
              </CardContent>
            </Card>

            {/* Selected Products */}
            <ShowSelectedList
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />

            

            {/* Summary Order */}
            <Card>
              <CardHeader>
                <CardTitle>Summary Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPct > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount&nbsp;({discountPct}%):</span>
                      <span>- ${discountValue.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 font-bold flex justify-between text-lg">
                    <span>Total:</span>
                    <span className="text-green-700">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Add Discount */}
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Add Discount</h4>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={applyCoupon}>
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try: SAVE10&nbsp;|&nbsp;SAVE20&nbsp;|&nbsp;WELCOME
                  </p>
                </div>
              </CardContent>
            </Card>
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
        products={products}
        selectedProducts={selectedProducts}
        onProductSelect={handleProductSelect}
      />
    </div>
  );
}
