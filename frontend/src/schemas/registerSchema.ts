import * as zod from 'zod';

export const registerSchema = zod.object({
  username: zod.string().min(2, 'Username must be at least 2 characters'),
  email: zod.string().nonempty('Email is required').email('Invalid email address'),
  password: zod.string().min(6, 'Password must be at least 6 characters'),
});

export type RegisterForm = zod.infer<typeof registerSchema>;
