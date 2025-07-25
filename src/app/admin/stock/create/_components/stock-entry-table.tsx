"use client";

import { Minus, Plus, X } from "lucide-react";
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
import type { StockSchema } from "@/schema/stock-entry";

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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Cost Price</TableHead>
          <TableHead>Total</TableHead>
          <TableHead />
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
                <div className="relative flex items-center gap-1">
                  <Input
                    type="number"
                    {...register(`stockItems.${index}.costPrice`, {
                      valueAsNumber: true,
                    })}
                    className="w-20 text-center"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm">
                    đ
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-medium">${total.toFixed(2)}</span>
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
