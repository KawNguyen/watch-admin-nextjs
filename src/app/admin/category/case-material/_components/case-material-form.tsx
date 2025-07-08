'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Eye, Loader2, Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { queryClient } from '@/components/provider/provider';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { caseMaterialSchema } from '@/schema/case-material';
import { materialApi } from '@/services/material';

interface CaseMaterialFormProps {
  mode: 'create' | 'edit' | 'view';
  caseMaterialData?: any;
}
type CaseMaterialFormValues = z.infer<typeof caseMaterialSchema>;
export default function CaseMaterialForm({
  mode,
  caseMaterialData,
}: CaseMaterialFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = mode === 'edit';
  const isViewMode = mode === 'view';
  const mutation = useMutation({
    mutationFn: isEditMode
      ? (data: CaseMaterialFormValues) =>
          materialApi.updateMaterial(caseMaterialData.id, data)
      : materialApi.createMaterial,
  });

  const form = useForm<CaseMaterialFormValues>({
    resolver: zodResolver(caseMaterialSchema),
    defaultValues: {
      name: isEditMode ? caseMaterialData.name : '',
    },
  });
  const onSubmit = async (data: CaseMaterialFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ['materials'] });
        setIsOpen(false);
      },
      onError: (error: any) => {
        console.error('Error creating material:', error);
      },
    });
  };
  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        {isEditMode ? (
          <Button size="icon" variant="ghost">
            <Pencil />
          </Button>
        ) : isViewMode ? (
          <Button size="icon" variant="ghost">
            <Eye />
          </Button>
        ) : (
          <Button>
            <Plus />
            Create Case Material
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="hide-scrollbar sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? 'Edit case material'
              : isViewMode
                ? 'View case material'
                : 'Create case material'}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? 'Edit the details of the case material.'
              : isViewMode
                ? 'View the details of the case material.'
                : 'Fill in the details to create a new case material.'}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      disabled={isViewMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              {!isViewMode && (
                <Button disabled={mutation.isPending} type="submit">
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : isEditMode ? (
                    <>
                      <Pencil />
                      Update
                    </>
                  ) : (
                    <>
                      <Plus />
                      Create
                    </>
                  )}
                </Button>
              )}
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
