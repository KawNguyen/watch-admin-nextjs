import { instanceAxios } from "@/lib/instantceAxios";

export const watchApi = {
    async getAll() {
        const res = await instanceAxios.get("/watch");
        return res.data;
    }
}