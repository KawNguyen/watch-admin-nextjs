"use client";

import { Minus, Plus, X, Edit } from "lucide-react";
import { useState } from "react";
import type {
  Control,
  FieldArrayWithId,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { StockSchema } from "@/schema/stock-entry";
import { formatMoney } from "@/lib";

type StockFormValues = z.infer<typeof StockSchema>;

interface Props {
  control: Control<StockFormValues>;
  register: UseFormRegister<StockFormValues>;
  products: any[];
  fields: FieldArrayWithId<StockFormValues, "stockItems", "id">[];
  update: (index: number, value: any) => void;
  remove: (index: number) => void;
  watch: UseFormWatch<StockFormValues>;
}

export const StockEntryTable = ({
  register,
  products,
  fields,
  update,
  remove,
  watch,
}: Props) => {
  const [openPopovers, setOpenPopovers] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [tempPrices, setTempPrices] = useState<{ [key: number]: string }>({});

  const handlePopoverOpen = (index: number, currentPrice: number) => {
    setOpenPopovers((prev) => ({ ...prev, [index]: true }));
    setTempPrices((prev) => ({ ...prev, [index]: currentPrice.toString() }));
  };

  const handlePopoverClose = (index: number) => {
    setOpenPopovers((prev) => ({ ...prev, [index]: false }));
  };

  const handlePriceUpdate = (index: number) => {
    const newPrice = parseFloat(tempPrices[index]) || 0;
    update(index, {
      ...fields[index],
      costPrice: newPrice,
    });
    handlePopoverClose(index);
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      handlePriceUpdate(index);
    } else if (e.key === "Escape") {
      handlePopoverClose(index);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sản Phẩm</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Số Lượng</TableHead>
          <TableHead>Giá Gốc</TableHead>
          <TableHead>Tổng</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field, index) => {
          const product = products.find(
            (p: any) => String(p.id) === field.watchId
          );
          if (!product) return null;
          const quantity = watch(`stockItems.${index}.quantity`) || 0;
          const costPrice = watch(`stockItems.${index}.costPrice`) || 0;
          const total = quantity * costPrice;

          return (
            <TableRow key={field.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.code}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() =>
                      update(index, {
                        ...field,
                        quantity: Math.max(field.quantity - 1, 1),
                      })
                    }
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    {...register(`stockItems.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    className="w-20 text-center"
                    min={1}
                  />
                  <Button
                    onClick={() =>
                      update(index, {
                        ...field,
                        quantity: field.quantity + 1,
                      })
                    }
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Popover
                  open={openPopovers[index] || false}
                  onOpenChange={(open) => {
                    if (open) {
                      handlePopoverOpen(index, costPrice);
                    } else {
                      handlePopoverClose(index);
                    }
                  }}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-auto p-2 justify-start font-normal hover:bg-muted"
                      type="button"
                    >
                      <span className="mr-2">{formatMoney(costPrice)}</span>
                      <Edit className="h-3 w-3 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48" align="start">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Giá Gốc</label>
                      <Input
                        type="number"
                        value={tempPrices[index] || ""}
                        onChange={(e) =>
                          setTempPrices((prev) => ({
                            ...prev,
                            [index]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => handleKeyPress(e, index)}
                        placeholder="Nhập giá..."
                        className="w-full"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handlePriceUpdate(index)}
                          type="button"
                        >
                          Cập nhật
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePopoverClose(index)}
                          type="button"
                        >
                          Hủy
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {/* Hidden input for form registration */}
                <Input
                  type="number"
                  {...register(`stockItems.${index}.costPrice`, {
                    valueAsNumber: true,
                  })}
                  className="hidden"
                />
              </TableCell>
              <TableCell>
                <span className="font-medium">{formatMoney(total)}</span>
              </TableCell>
              <TableCell>
                <Button
                  className="text-destructive"
                  onClick={() => remove(index)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
