import { z } from "zod";

export const AddUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
});

export type TAddUserSchema = z.infer<typeof AddUserSchema>;

export const UserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  username: z.string().optional(),
});

export type TUserSchema = z.infer<typeof UserSchema>;
