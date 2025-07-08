'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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
            </div>
          ) : (
            <span className="font-medium text-black hover:underline">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <h4 className="font-semibold">Edit Price</h4>
          {isPriceChanged && (
            <div className="text-muted-foreground text-sm">
              Original price: ${originalPrice.toFixed(2)}
            </div>
          )}
          <div>
            <Input
              min="0"
              onChange={(e) => setTempPrice(e.target.value)}
              placeholder="Enter new price"
              step="0.01"
              type="number"
              value={tempPrice}
            />
          </div>
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
