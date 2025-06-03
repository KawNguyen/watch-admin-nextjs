"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "../provider/provider";
import { Edit } from "lucide-react";
import { Movement } from "@/app/admin/category/movement/columns";
import { movementAPI } from "@/services/movement";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
interface SheetMovementProps {
  movementId?: string;
  initialData?: Movement;
  mode?: "create" | "update";
}
const SheetMovement = ({
  mode,
  movementId,
  initialData,
}: SheetMovementProps) => {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      if (mode === "create") {
        return movementAPI.createMovement(data);
      }
      return movementAPI.updateMovement(movementId!, data);
    },
    onSuccess: () => {
      toast.success(
        mode === "create"
          ? "Movement created successfully"
          : "Movement updated successfully"
      );
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["movement"] });
    },
    onSettled: () => {
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "create"
        ? {
            name: "",
          }
        : {
            name: initialData?.name || "",
          },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {mode === "create" ? (
          <Button>Create</Button>
        ) : (
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-8">
          <SheetTitle>Movement</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit">
                {mode === "create" ? "Create" : "Update"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
export default SheetMovement;
