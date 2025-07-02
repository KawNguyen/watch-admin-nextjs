export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  count: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}
