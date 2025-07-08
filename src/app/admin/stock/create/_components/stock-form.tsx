// app/(admin)/stock/StockForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CornerDownLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { queryClient } from '@/components/provider/provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMe } from '@/queries/use-session';
import { useWatches } from '@/queries/use-watches';
import { StockSchema } from '@/schema/stock-entry';
import { StockAPI } from '@/services/stock-entry';
import { StockEntryTable } from './stock-entry-table';
import { StockProductSelection } from './stock-product-selection';

type StockFormValues = z.infer<typeof StockSchema>;

export default function StockForm() {
  const { data: products = [] } = useWatches();
  const { data: user } = useMe();
  const id = `${user?.data?.item.id}`;

  const mutation = useMutation({
    mutationFn: async (data: StockFormValues) => {
      return StockAPI.createStockEntry(data);
    },
  });
  const form = useForm<StockFormValues>({
    resolver: zodResolver(StockSchema),
    defaultValues: {
      createdBy: id || '',
      notes: '',
      stockItems: [],
    },
  });

  const { control, handleSubmit, register } = form;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'stockItems',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
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
    setProductSearchQuery('');
  };

  const onSubmit = async (data: StockFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ['stockEntries'] });
        toast.success('Stock entry created successfully!');
        setIsModalOpen(false);
      },
      onError: (error: any) => {
        toast.error('Error creating stock entry:' + error.message);
      },
    });
  };

  return (
    <div>
      <Link
        className="mb-4 flex items-center gap-1 underline"
        href="/admin/stock/"
      >
        <CornerDownLeft className="size-5" /> Back
      </Link>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="createdBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Created By</FormLabel>
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
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
              <Input
                className="pl-10"
                onFocus={() => setIsModalOpen(true)}
                placeholder="Search products to add..."
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
                fields={fields}
                products={products}
                register={register}
                remove={remove}
                update={update}
                watch={form.watch}
              />
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button type="submit">Import Stock Entry</Button>
          </div>
        </form>
      </Form>

      <StockProductSelection
        onApply={handleApplySelection}
        onOpenChange={setIsModalOpen}
        onSelectAll={handleSelectAll}
        onToggle={handleProductToggle}
        open={isModalOpen}
        products={products}
        searchQuery={productSearchQuery}
        selectedIds={selectedProductIds}
        setSearchQuery={setProductSearchQuery}
      />
    </div>
  );
}
