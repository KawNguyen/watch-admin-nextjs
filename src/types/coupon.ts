export interface Coupon {
    id?: string;
    code: string;
    description: string;
    discountType: "PERCENT" | "AMOUNT";
    discountValue: number;
    minOrderValue: number;
    count: number;
    usedCount?: number;
    startDate: string;   
    endDate: string;     
    isActive: boolean;
}