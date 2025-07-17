"use client";

import { useState } from "react";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { useWatches } from "@/queries/use-watches";
import type { orderSchema } from "@/schema/order";
import type { Product } from "@/types/order";
import PaymemtCoupon from "./coupon";
import CustomerInfo from "./customer-info";
import OrderSummary from "./order-summary";
import ProductSearchModal from "./product-search-modal";
import ShowSelectedList from "./show-selected-list";

type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderFormProps {
  mode: "create" | "edit";
  onSubmit: (data: OrderFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function OrderForm({
  mode,
  onSubmit,
  onCancel,
  isLoading = false,
}: OrderFormProps) {
  const { data: products = [] } = useWatches();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "MOMO">("COD");
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    province: "",
    provinceName: "",
    district: "",
    districtName: "",
    ward: "",
    wardName: "",
  });
  const [discountPct] = useState(0);

  const handleProductSelect = (
    selected: Omit<Product, "quantity" | "originalPrice">[]
  ) => {
    const withQty = selected.map((p) => ({
      watchId: p.id, // Changed from watchId: p.id to ensure correct mapping
      quantity: 1,
      price: p.price, // Changed from originalPrice to price
    }));
    setSelectedProducts(withQty);
    setIsSearchOpen(false);
  };

  const subtotal = selectedProducts.reduce(
    (sum: number, p: any) => sum + p.price * p.quantity, // Changed from p.price to match new structure
    0
  );

  const discountValue = (subtotal * discountPct) / 100;
  const totalPrice = subtotal - discountValue;
  // If you want to keep the original schema, update handleFormSubmit like this:

  const handleFormSubmit = () => {
    const formData: OrderFormValues = {
      paymentMethod,
      totalPrice,
      originalPrice: totalPrice,
      orderItems: selectedProducts,
      walkinInformation: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        street: customerInfo.street,
        provinceName: customerInfo.provinceName,
        districtName: customerInfo.districtName,
        wardName: customerInfo.wardName,
      },
    };

    onSubmit(formData);
  };

  const isFormValid =
    selectedProducts.length > 0 &&
    customerInfo.firstName &&
    customerInfo.phone &&
    customerInfo.street &&
    customerInfo.province &&
    customerInfo.district &&
    customerInfo.ward;
  const submitButtonText = mode === "create" ? "Create Order" : "Update Order";
  const isEditMode = mode === "edit";

  return (
    <div className="min-h-screen">
      <div className="container">
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
              <div>
                {isEditMode && (
                  <Button
                    className="w-fit"
                    variant="destructive"
                    onClick={onCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                )}
              </div>

              <Button
                onClick={handleFormSubmit}
                className="w-fit"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? "Processing..." : submitButtonText}
              </Button>
            </div>
          </div>

          <div className="col-span-4 space-y-4">
            {isEditMode && (
              <Button
                className="w-full"
                onClick={handleFormSubmit}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? "Processing..." : "Confirm Order"}
              </Button>
            )}

            <div>
              <CustomerInfo
                customerInfo={customerInfo}
                setCustomerInfo={setCustomerInfo}
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
