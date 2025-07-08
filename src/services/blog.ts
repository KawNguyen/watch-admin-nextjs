import { instanceAxios } from '@/lib/instantceAxios';

export const blogApi = {
  getAllBlogs: async () => {
    const res = await instanceAxios.get('/blog');
    return res.data;
  },
  getBlogById: async (blogId: string) => {
    const res = await instanceAxios.get(`/blog/${blogId}`);
    return res.data;
  },
  createBlog: async (blog: any) => {
    const res = await instanceAxios.post('/blog/create', blog);
    return res.data;
  },
  updateBlog: async (blogId: string, blog: any) => {
    const res = await instanceAxios.put(`/blog/update/${blogId}`, blog);
    return res.data;
  },
  deleteBlog: async (blogId: string) => {
    const res = await instanceAxios.delete(`/blog/delete/${blogId}`);
    return res.data;
  },
};
