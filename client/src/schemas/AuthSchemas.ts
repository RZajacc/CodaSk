import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty({message: 'Password is required'}),
});

export type LoginInputType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .nonempty({message: 'Password is required'})
      .min(8, {message: 'Password must be at least 8 characters long'}),
    confirmPassword: z
      .string()
      .nonempty({message: 'Confirm Password is required'})
      .min(8, {message: 'Confirm Password must be at least 8 characters long'}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInputType = z.infer<typeof RegisterSchema>;
