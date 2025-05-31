import { instanceAxios } from "@/lib/instantceAxios";

export const authAPI = {
  login: async (email: string, password: string) => {
    const res = await instanceAxios.post("/auth/sign-in", {
      email,
      password,
    })
    return res.data;
  },
};
