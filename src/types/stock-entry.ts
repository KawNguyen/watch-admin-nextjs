export interface StockEntry {
  addedById: string;
  stockItems: {
    watchId: string;
    quantity: number;
    price: number;
  }[];
}
export interface Image {
  id: string;
  public_id: string;
  absolute_url: string;
  watchId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Watch {
  id: string;
  name: string;
  images: Image[];
}

export interface StockItem {
  id: string;
  quantity: number;
  costPrice: number;
  stockEntryId: string;
  watchId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  watch: Watch;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
}

export interface StockEntryDetail {
  id: string;
  entryCode: string;
  totalPrice: number;
  createdBy: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
  stockItems: StockItem[];
}
