import { instanceAxios } from "@/lib/instantceAxios";

export const supportApi = {
  getAllSupport: async () => {
    const res = await instanceAxios.get("/support-request");
    return res.data;
  },
  responseSupport: async (id: string, response: string) => {
    const res = await instanceAxios.patch(`/support-request/${id}/respond`, {
      response,
    });
    return res.data;
  },
};
