import { instanceAxios } from "@/lib/instantceAxios";

export const blogApi = {
  getAllBlogs: async () => {
    const res = await instanceAxios.get("/blogs");
    return res.data;
  },
  getBlogById: async (blogId: string) => {
    const res = await instanceAxios.get(`/blogs/${blogId}`);
    return res.data;
  },
  createBlog: async (blog: any) => {
    const res = await instanceAxios.post("/blogs/create", blog);
    return res.data;
  },
  updateBlog: async (blogId: string, blog: any) => {
    const res = await instanceAxios.patch(`/blogs/update/${blogId}`, blog);
    return res.data;
  },
  deleteBlog: async (blogId: string) => {
    const res = await instanceAxios.delete(`/blogs/delete/${blogId}`);
    return res.data;
  },
};
