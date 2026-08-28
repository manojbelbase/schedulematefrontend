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

export const UpdateUserLimitSchema = z.object({
  apiRequestLimit: z.coerce
    .number({ message: "Limit must be a number" })
    .int("Limit must be a whole number")
    .min(0, "Limit cannot be negative")
    .max(100000, "Limit is too large"),
  resetUsed: z.boolean().optional(),
});

export type TUpdateUserLimitSchema = z.infer<typeof UpdateUserLimitSchema>;
