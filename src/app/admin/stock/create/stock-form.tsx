// app/(admin)/stock/StockForm.tsx
"use client";

import { useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useWatches } from "@/queries/use-watches";
import { useMe } from "@/queries/use-session";
import { StockSchema } from "@/schema/stock-entry";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockProductSelection } from "./_components/stock-product-selection";
import { z } from "zod";
import { StockEntryTable } from "./_components/stock-entry-table";

type StockFormValues = z.infer<typeof StockSchema>;

export default function StockForm() {
  const { data: products = [] } = useWatches();
  const { data: user } = useMe();

  const fullName = `${user?.data?.item.firstName} ${user?.data?.item.lastName}`;

  const form = useForm<StockFormValues>({
    resolver: zodResolver(StockSchema),
    defaultValues: {
      addedById: fullName || "",
      notes: "",
      stockItems: [],
    },
  });

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "stockItems",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const handleProductToggle = (id: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const filtered = products.filter(
      (product: any) =>
        product.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(productSearchQuery.toLowerCase())
    );

    if (selectedProductIds.length === filtered.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filtered.map((p: any) => p.id));
    }
  };

  const handleApplySelection = () => {
    const selectedProducts = products.filter((product: any) =>
      selectedProductIds.includes(product.id)
    );

    selectedProducts.forEach((product: any) => {
      append({
        watchId: String(product.id),
        quantity: 1,
        costPrice: 0,
      });
    });

    setSelectedProductIds([]);
    setIsModalOpen(false);
    setProductSearchQuery("");
  };

  const onSubmit = async (data: StockFormValues) => {
    console.log("Submit Stock Entry", data);
  };

  return (
    <div>
      <Link
        href="/admin/stock/"
        className="flex underline gap-1 mb-4 items-center"
      >
        <CornerDownLeft className="size-5" /> Back
      </Link>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="addedById"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Added By</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="notes"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Optional notes..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products to add..."
                onFocus={() => setIsModalOpen(true)}
                className="pl-10"
              />
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <StockEntryTable
                control={control}
                register={register}
                products={products}
                fields={fields}
                update={update}
                remove={remove}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end mt-6">
            <Button type="submit">Submit Stock Entry</Button>
          </div>
        </form>
      </Form>

      <StockProductSelection
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        products={products}
        searchQuery={productSearchQuery}
        setSearchQuery={setProductSearchQuery}
        selectedIds={selectedProductIds}
        onToggle={handleProductToggle}
        onSelectAll={handleSelectAll}
        onApply={handleApplySelection}
      />
    </div>
  );
}
