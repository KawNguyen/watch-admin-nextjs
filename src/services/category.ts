import { instanceAxios } from "@/lib/instantceAxios"
import { create } from "domain"

export const categoryAPI = {
    getCategory: async () => {
        const response = await instanceAxios.get("category")
        return response.data
    },
    createCategory: async (data: {name:string, gender:string}) => {
        const response = await instanceAxios.post("category", data)
        return response.data
    },
}