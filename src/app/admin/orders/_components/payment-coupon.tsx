import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CircleDollarSign, QrCode, Wallet } from "lucide-react";
import React, { useState } from "react";
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
}
const PaymemtCoupon = () => {
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "MOMO">("COD");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [discountPct, setDiscountPct] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const validCoupons: Record<string, number> = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME: 15,
  };
  const applyCoupon = () => {
    const pct = validCoupons[couponCode.trim().toUpperCase()] ?? 0;
    setDiscountPct(pct);
  };
  const subtotal = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );
  const discountValue = (subtotal * discountPct) / 100;
  const totalPrice = subtotal - discountValue;
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Coupon Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className="flex-1"
            />
            <Button size="sm" onClick={applyCoupon}>
              Apply
            </Button>
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(v) => setPaymentMethod(v as "COD" | "MOMO")}
            className="grid grid-cols-2 gap-4"
          >
            <Label
              htmlFor="cod"
              className={`border rounded-lg p-4 cursor-pointer flex items-center gap-3 ${
                paymentMethod === "COD"
                  ? "border-black ring-2"
                  : "hover:border-gray-300"
              }`}
            >
              <RadioGroupItem value="COD" id="cod" />
              <CircleDollarSign className="w-6 h-6" />
              <span className="font-medium">COD (Cash on Delivery)</span>
            </Label>

            <Label
              htmlFor="momo"
              className={`border rounded-lg p-4 cursor-pointer flex items-center gap-3 ${
                paymentMethod === "MOMO"
                  ? "border-black ring-2"
                  : "hover:border-gray-300"
              }`}
            >
              <RadioGroupItem value="MOMO" id="momo" />
              <Wallet className="w-6 h-6" />
              <span className="font-medium">MOMO</span>
            </Label>
          </RadioGroup>

          {paymentMethod === "MOMO" && totalPrice > 0 && (
            <div className="mt-6 flex flex-col items-center gap-4 p-4 border rounded-lg bg-blue-50">
              <QrCode className="w-32 h-32 text-blue-600" />
              <p className="font-semibold text-center">
                Scan to pay &nbsp;
                <span className="text-green-700 text-lg font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymemtCoupon;
