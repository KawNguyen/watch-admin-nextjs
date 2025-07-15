"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface PriceEditPopoverProps {
  price: number;
  originalPrice: number;
  onPriceChange: (newPrice: number) => void;
}

type DiscountType = "percentage" | "cash";

export default function PriceEditPopover({
  price,
  originalPrice,
  onPriceChange,
}: PriceEditPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [discountType, setDiscountType] = useState<DiscountType>("percentage");
  const [discountValue, setDiscountValue] = useState("");

  // Calculate current discount for display
  const currentDiscount = originalPrice - price;
  const currentDiscountPercentage =
    originalPrice > 0 ? (currentDiscount / originalPrice) * 100 : 0;

  const handleSave = () => {
    const value = Number.parseFloat(discountValue);
    if (isNaN(value) || value < 0) return;

    let newPrice: number;

    if (discountType === "percentage") {
      if (value > 100) return; // Prevent over 100% discount
      newPrice = originalPrice * (1 - value / 100);
    } else {
      if (value > originalPrice) return; // Prevent discount larger than original price
      newPrice = originalPrice - value;
    }

    if (newPrice >= 0) {
      onPriceChange(newPrice);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setDiscountValue("");
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Pre-populate with current discount when opening
      if (currentDiscount > 0) {
        setDiscountValue(
          discountType === "percentage"
            ? currentDiscountPercentage.toFixed(1)
            : currentDiscount.toFixed(2)
        );
      } else {
        setDiscountValue("");
      }
    }
    setIsOpen(open);
  };

  const handleDiscountTypeChange = (newType: DiscountType) => {
    setDiscountType(newType);
    // Convert current discount to new type
    if (currentDiscount > 0) {
      setDiscountValue(
        newType === "percentage"
          ? currentDiscountPercentage.toFixed(1)
          : currentDiscount.toFixed(2)
      );
    } else {
      setDiscountValue("");
    }
  };

  const isPriceChanged = price !== originalPrice;

  return (
    <Popover onOpenChange={handleOpenChange} open={isOpen}>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          {isPriceChanged ? (
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs line-through">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="font-medium text-black hover:underline">
                ${price.toFixed(2)}
              </span>
              <span className="text-green-600 text-xs">
                {currentDiscountPercentage.toFixed(1)}% off
              </span>
            </div>
          ) : (
            <span className="font-medium text-black hover:underline">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-semibold">Edit Price</h4>

          <div className="text-muted-foreground text-sm">
            Original price: ${originalPrice.toFixed(2)}
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount" className="text-sm">
              {discountType === "percentage"
                ? "Discount Percentage"
                : "Discount Amount"}
            </Label>
            <div className="flex">
              <Input
                id="discount"
                min="0"
                max={
                  discountType === "percentage"
                    ? "100"
                    : originalPrice.toString()
                }
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={
                  discountType === "percentage"
                    ? "Enter percentage"
                    : "Enter amount"
                }
                step={discountType === "percentage" ? "0.1" : "0.01"}
                type="number"
                value={discountValue}
                className="rounded-r-none focus-visible:ring-0"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-l-none border-l-0 px-3 bg-transparent"
                  >
                    {discountType === "percentage" ? "%" : "$"}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleDiscountTypeChange("percentage")}
                  >
                    <span className="mr-2">%</span>
                    Percentage
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDiscountTypeChange("cash")}
                  >
                    <span className="mr-2">$</span>
                    Cash Amount
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {discountValue && !isNaN(Number.parseFloat(discountValue)) && (
            <div className="p-3 bg-muted rounded-md">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Original Price:</span>
                  <span>${originalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="text-red-600">
                    {discountType === "percentage"
                      ? `-${discountValue}%`
                      : `-$${discountValue}`}
                  </span>
                </div>
                <div className="flex justify-between font-medium border-t pt-1">
                  <span>New Price:</span>
                  <span>
                    $
                    {discountType === "percentage"
                      ? (
                          originalPrice *
                          (1 - Number.parseFloat(discountValue) / 100)
                        ).toFixed(2)
                      : (
                          originalPrice - Number.parseFloat(discountValue)
                        ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel} size="sm" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm">
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
