export interface Return {
  id: string;
  userId: string;
  orderId: string;
  orderItemId: string;
  returnQuantity: number;
  reason: string;
  status: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  processedAt: string | null;
  deletedAt: string | null;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };

  order: {
    id: string;
    totalPrice: number;
  };

  orderItem: {
    id: string;
    quantity: number;
    price: number;
    orderId: string;
    watchId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;

    watch: {
      id: string;
      name: string;
      price: number;
    };
  };
}
