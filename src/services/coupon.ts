import { instanceAxios } from "@/lib/instantceAxios";
import { Coupon } from "@/types/coupon";

export const couponApi = {

    getAllCoupons: async () => {
        try {
            const res = await instanceAxios.get("/coupon");
            return res.data;
        } catch (error: any) {
            console.error("Error fetching coupons:", error);
            if (error?.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
            }
            throw error;
        }
    },

    getCouponById: async (couponId: string) => {
        try {
            const res = await instanceAxios.get(`/coupon/${couponId}`);
            return res.data;
        } catch (error: any) {
            console.error(`Error fetching coupon ${couponId}:`, error);
            if (error?.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
            }
            throw error;
        }
    },


    createCoupon: async(couponData: Coupon) => {
        try {
            // Log the full payload being sent
            console.log("API request payload:", JSON.stringify(couponData, null, 2));
            
            // Remove usedCount if it's a create operation (not needed for new coupons)
            const payload = {...couponData};
            if ('usedCount' in payload) {
                delete payload.usedCount;
            }
            
            const res = await instanceAxios.post("/coupon/create", payload);
            console.log("API response status:", res.status);
            console.log("API response data:", JSON.stringify(res.data, null, 2));
            return res.data;
        } catch (error: any) {
            console.error("API error details:", error);
            if (error?.response) {
                console.error("Error response data:", JSON.stringify(error.response.data, null, 2));
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
            }
            throw error;
        }
    },

    deleteCoupon: async (couponId: string) => {
        try {
            const res = await instanceAxios.delete(`/coupon/delete/${couponId}`);
            return res.data;
        } catch (error: any) {
            console.error(`Error deleting coupon ${couponId}:`, error);
            if (error?.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
            }
            throw error;
        }
    },

    updateCoupon: async(couponId: string, couponData: Coupon) => {
        try {
            console.log(`Updating coupon ${couponId} with data:`, JSON.stringify(couponData, null, 2));
            const res = await instanceAxios.patch(`/coupon/update/${couponId}`, couponData);
            console.log("Update response:", JSON.stringify(res.data, null, 2));
            return res.data;
        } catch (error: any) {
            console.error(`Error updating coupon ${couponId}:`, error);
            if (error?.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
            }
            throw error;
        }
    }
};