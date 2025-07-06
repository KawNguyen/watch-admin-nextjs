"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PriceEditPopoverProps {
  price: number;
  originalPrice: number;
  onPriceChange: (newPrice: number) => void;
}

export default function PriceEditPopover({
  price,
  originalPrice,
  onPriceChange,
}: PriceEditPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempPrice, setTempPrice] = useState(price.toString());

  const handleSave = () => {
    const newPrice = Number.parseFloat(tempPrice);
    if (!isNaN(newPrice) && newPrice >= 0) {
      onPriceChange(newPrice);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setTempPrice(price.toString());
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTempPrice(price.toString());
    }
    setIsOpen(open);
  };

  const isPriceChanged = price !== originalPrice;

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          {isPriceChanged ? (
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="font-semibold text-green-600 hover:text-green-700 hover:underline">
                ${price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="font-semibold text-green-600 hover:text-green-700 hover:underline">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <h4 className="font-semibold">Edit Price</h4>
          {isPriceChanged && (
            <div className="text-sm text-muted-foreground">
              Original price: ${originalPrice.toFixed(2)}
            </div>
          )}
          <div>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={tempPrice}
              onChange={(e) => setTempPrice(e.target.value)}
              placeholder="Enter new price"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
