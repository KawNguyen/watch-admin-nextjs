import { instanceAxios } from "@/lib/instantceAxios"

export const watchAPI = {
    getWatch: async () => {
        const response = await instanceAxios.get("watch")
        return response.data
    },
    getWatchById: async (id: string) => {
        const response = await instanceAxios.get(`watch/${id}`)
        return response.data
    },
    createWatch: async (data: {name:string,image:string,brand:string,price:string, gender:string}) => {
        const response = await instanceAxios.post("watch", data)
        return response.data
    },
    deleteWatch: async (id: string) => {
        const response = await instanceAxios.delete(`watch/${id}`)
        return response.data 
    },
    updateWatch: async (id: string, data: {name:string,image:string,brand:string,price:string, gender:string}) => {
        const response = await instanceAxios.put(`watch/${id}`, data)
        return response.data
    }
    


}