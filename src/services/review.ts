import { instanceAxios } from "@/lib/instantceAxios";

export const reviewAPI = {
  getReview: async () => {
    const response = await instanceAxios.get("review");
    return response.data;
  },
  getReviewById: async (id: string) => {
    const response = await instanceAxios.get(`review/${id}`);
    return response.data;
  },
  // createReview: async (data: {
  //   productId: string;
  //   id: string;
  //   userId: string;
  //   rating: number;
  //   comment: string;
  //   createdAt: string;
  // }) => {
  //   const response = await instanceAxios.post("review", data);
  //   return response.data;
  // },
  // deleteReview: async (id: string) => {
  //   const response = await instanceAxios.delete(`review/${id}`);
  //   return response.data;
  // },
  // updateReview: async (
  //   id: string,
  //   data: {
  //     userId: string;
  //     rating: number;
  //     comment: string;
  //     createdAt: string;
  //   }
  // ) => {
  //   const response = await instanceAxios.put(`review/${id}`, data);
  //   return response.data;
  // },
};
