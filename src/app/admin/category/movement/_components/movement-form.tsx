"use client"
import { queryClient } from "@/components/provider/provider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { movementSchema } from "@/schema/movement";
import { movementApi } from "@/services/movement";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, Loader2, Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface MovementFormProps {
  mode: "create" | "edit" | "view";
  movementData?: any;
}
type MovementFormValues = z.infer<typeof movementSchema>;
export default function MovementForm({
  mode,
  movementData,
}: MovementFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";
  const mutation = useMutation({
    mutationFn: isEditMode
    ? (data: MovementFormValues) => movementApi.updateMovement(movementData.id, data)
    : movementApi.createMovement,
  });
  
  const form = useForm<MovementFormValues>({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      name: isEditMode ? movementData.name : "",
    },
  });
  const onSubmit = async (data: MovementFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["movements"] });
        setIsOpen(false);
      },
      onError: (error: any) => {
        console.error("Error creating watch:", error);
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {isEditMode ? (
          <Button variant="ghost" size="icon">
            <Pencil />
          </Button>
        ) : isViewMode ? (
          <Button variant="ghost" size="icon">
            <Eye />
          </Button>
        ) : (
          <Button>
            <Plus />
            Create
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg hide-scrollbar">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? "Edit Watch"
              : isViewMode
              ? "View Watch"
              : "Create Watch"}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "Edit the details of the watch."
              : isViewMode
              ? "View the details of the watch."
              : "Fill in the details to create a new watch."}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Button type="submit" disabled={mutation.isPending}>
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
