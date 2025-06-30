import { UserGender } from "@/types";
import { UserRole } from "@/types/user";
import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Email is required"),
  role: z.nativeEnum(UserRole),
  phone: z.string().min(10, "Phone number is required"),
  gender: z.nativeEnum(UserGender),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  avatar: z.string().optional(),
});
