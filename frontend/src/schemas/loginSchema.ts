import * as zod from 'zod';

export const loginSchema = zod.object({
  email: zod.string().nonempty('Email is required').email('Invalid email address'),
  password: zod.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginForm = zod.infer<typeof loginSchema>;
