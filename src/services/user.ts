import { instanceAxios } from "@/lib/instantceAxios"

export const userAPI = {
    getUser: async () => {
        const response = await instanceAxios.get("user")
        return response.data
    },
    getUserById: async (id: string) => {
        const response = await instanceAxios.get(`user/${id}`)
        return response.data
    },
}