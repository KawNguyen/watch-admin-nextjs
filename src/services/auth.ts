import { instanceAxios } from '@/lib/instantceAxios';

export const authAPI = {
  login: async (email: string, password: string) => {
    const res = await instanceAxios.post('/auth/sign-in', {
      email,
      password,
    });
    return res.data;
  },

  logout: async () => {
    const res = await instanceAxios.post('/auth/sign-out');
    return res.data;
  },

  checkAuth: async () => {
    const res = await instanceAxios.get('/auth/check-auth');
    return res.data;
  },

  getMe: async () => {
    const res = await instanceAxios.get('/user/me');
    return res.data;
  },
};
