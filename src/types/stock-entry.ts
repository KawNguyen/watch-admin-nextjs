export interface StockEntry {
  addedById: string;
  stockItems: {
    watchId: string;
    quantity: number;
    price: number;
  }[];
}
