import z, { email } from "zod";

const registerSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please provide a valid email"),
  username: z.string().trim().min(2, "Username must be at least 2 characters"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please provide a valid email"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});
export { registerSchema, loginSchema };
