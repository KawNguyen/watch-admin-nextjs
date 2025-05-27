import { instanceAxios } from "@/lib/instantceAxios"

export const categoryAPI = {
    getCategory: async () => {
        const response = await instanceAxios.get("category")
        return response.data
    },
    createCategory: async (data: {name:string, gender:string}) => {
        const response = await instanceAxios.post("category", data)
        return response.data
    },
    deleteCategory: async (id: number) => {
        const response = await instanceAxios.delete(`category/${id}`)
        return response.data
    },
    updateCategory: async (id: number | undefined, data: {name:string, gender:string}) => {
        const response = await instanceAxios.put(`category/${id}`, data)
        return response.data
    }
}