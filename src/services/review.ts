import { instanceAxios } from "@/lib/instantceAxios";

export const reviewApi = {
  getAllReview: async () => {
    const res = await instanceAxios.get("/review");
    return res.data;
  },
  getReviewBySlug: async (slug: string) => {
    const res = await instanceAxios.get(`/review/${slug}`);
    return res.data;
  },
  upadteReview: async (reviewId: string, reviewData: string) => {
    const res = await instanceAxios.patch(`/review/${reviewId}`, reviewData);
    return res.data;
  },
  deleteReview: async (reviewId: string) => {
    const res = await instanceAxios.delete(`/review/${reviewId}`);
    return res.data;
  },
};
