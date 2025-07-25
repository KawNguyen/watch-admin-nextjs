import { instanceAxios } from "@/lib/instantceAxios";
export const userApi = {
  getAllUsers: async () => {
    const res = await instanceAxios.get("/user");
    return res.data;
  },
  getUserById: async (userId: string) => {
    const res = await instanceAxios.get(`/user/${userId}`);
    return res.data;
  },
  deleteUser: async (userId: string) => {
    const res = await instanceAxios.delete(`/user/delete/${userId}`);
    return res.data;
  },
  updateUser: async (userId: string, data: any) => {
    const res = await instanceAxios.patch(`/user/update/${userId}`, data);
    return res.data;
  },
};
