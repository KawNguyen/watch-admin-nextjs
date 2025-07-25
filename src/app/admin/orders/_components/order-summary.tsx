import { CircleDollarSign, Wallet } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatMoney } from "@/lib";

interface ShowSelectedListProps {
  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<"MOMO" | "COD">>;
  totalPrice: number;
  subtotal: number;
  discountPct: number;
  discountValue: number;
}
const OrderSummary = ({
  paymentMethod,
  setPaymentMethod,
  totalPrice,
  subtotal,
  discountPct,
  discountValue,
}: ShowSelectedListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          className="grid grid-cols-1 gap-4"
          onValueChange={(v) => setPaymentMethod(v as "COD" | "MOMO")}
          value={paymentMethod}
        >
          <Label
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
              paymentMethod === "COD"
                ? "border-black ring-2"
                : "hover:border-gray-300"
            }`}
            htmlFor="cod"
          >
            <RadioGroupItem id="cod" value="COD" />
            <CircleDollarSign className="h-6 w-6" />
            <span className="font-medium">COD (Cash on Delivery)</span>
          </Label>

          <Label
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${
              paymentMethod === "MOMO"
                ? "border-black ring-2"
                : "hover:border-gray-300"
            }`}
            htmlFor="momo"
          >
            <RadioGroupItem id="momo" value="MOMO" />
            <Wallet className="h-6 w-6" />
            <span className="font-medium">MOMO</span>
          </Label>
        </RadioGroup>

        {paymentMethod === "MOMO" && totalPrice > 0 && (
          <div className="mt-6 flex flex-col items-center gap-4 rounded-lg border bg-blue-50 p-4">
            <Image
              src="/qr/qr.png"
              alt="qr code"
              width={200}
              height={200}
              className="size-40"
            />
            <p className="text-center font-semibold">
              Scan to pay &nbsp;
              <span className="font-bold text-green-700 text-lg">
                {formatMoney(totalPrice)}
              </span>
            </p>
          </div>
        )}
      </CardContent>
      <CardHeader>
        <CardTitle>Summary Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          {discountPct > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount&nbsp;({discountPct}%):</span>
              <span>- {discountValue.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between border-t pt-2 font-bold text-lg">
            <span>Total:</span>
            <span className="text-black">{formatMoney(totalPrice)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
