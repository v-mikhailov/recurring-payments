import { z } from 'zod';

export const registerShema = z.object({
  login: z.string().trim().min(4, "Login must be at least 4 characters long"),
  email: z.string().trim().email("Invalid email address").optional(),
  password: z.string().min(4, "Password must be at least 4 characters"),
})

export const loginShema = z.object({
  login: z.string().min(4, "Login must be at least 4 characters long"),
  password: z.string().min(4, "Password must be at least 4 characters"),
}).strict();