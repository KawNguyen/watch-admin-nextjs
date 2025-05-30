"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Interfaces
interface Product {
  id: string;
  name: string;
  price: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

// Product data
const products: Product[] = [
  { id: "1", name: "Watch 1", price: 100 },
  { id: "2", name: "Watch 2", price: 200 },
  { id: "3", name: "Watch 3", price: 300 },
];

// Validation schema
const formSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  paymentMethod: z.enum(["cod", "bank_transfer"]),
});

export default function CreateOrderPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [shipping] = useState(10);

  const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const total = subtotal + shipping;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "cod",
    },
  });

  const addItem = () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    const existingIndex = orderItems.findIndex((item) => item.product.id === product.id);
    if (existingIndex !== -1) {
      const updated = [...orderItems];
      const existingItem = updated[existingIndex];
      const newQty = existingItem.quantity + quantity;
      updated[existingIndex] = {
        ...existingItem,
        quantity: newQty,
        subtotal: newQty * product.price,
      };
      setOrderItems(updated);
    } else {
      setOrderItems([
        ...orderItems,
        {
          product,
          quantity,
          subtotal: quantity * product.price,
        },
      ]);
    }

    // Reset
    setSelectedProduct("");
    setQuantity(1);
  };

  const removeItem = (index: number) => {
    const updated = [...orderItems];
    updated.splice(index, 1);
    setOrderItems(updated);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (orderItems.length === 0) {
      toast.error("Please add at least one product");
      return;
    }

    const orderData = {
      ...values,
      items: orderItems,
      subtotal,
      shipping,
      total,
      orderDate: new Date().toISOString(),
      status: "pending",
    };

    console.log(orderData);
    toast.success("Order created successfully");

    form.reset();
    setOrderItems([]);
    setSelectedProduct("");
    setQuantity(1);
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Order For Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter delivery address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Add Products</CardTitle>
                  <CardDescription>Select products and quantity to add to order</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} - ${product.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-32">
                      <Input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                      />
                    </div>
                    <Button type="button" onClick={addItem} disabled={!selectedProduct}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <div>
                          <span className="font-medium">{item.product.name}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            ${item.product.price} x {item.quantity}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">${item.subtotal}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cod">Cash on Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Card>
                <CardHeader>
                  <CardTitle>Invoice Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-medium mb-2">Order Items</h3>
                      {orderItems.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.product.name} x {item.quantity}
                          </span>
                          <span>${item.subtotal}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>${shipping}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                        <span>Total:</span>
                        <span>${total}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    form.reset();
                    setOrderItems([]);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={orderItems.length === 0}>
                  Create Order
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
