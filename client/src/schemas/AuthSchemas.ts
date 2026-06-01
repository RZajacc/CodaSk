import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty({message: 'Password is required'}),
});

export type LoginInputType = z.infer<typeof LoginSchema>;
