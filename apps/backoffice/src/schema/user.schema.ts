import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().optional(),
});

export type TUserSchema = z.infer<typeof UserSchema>;
