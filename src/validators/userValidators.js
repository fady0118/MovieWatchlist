import z from "zod";

const updateUserSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please provide a valid email").optional(),
  username: z.string().trim().min(2, "Username must be at least 2 characters").optional(),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters").optional(),
});

const removeUserSchema = z.object({
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters")
});
export { updateUserSchema, removeUserSchema };
