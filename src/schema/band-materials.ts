import { z } from "zod";

export const bandMaterialSchema =z.object( {
    name: z.string().min(1, "Name is required"),
})