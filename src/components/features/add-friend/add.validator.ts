import { z } from 'zod';

export const addFriendSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Please enter a Email' })
      .email({ message: 'Please enter a valid email' }),
  })
  .required({
    email: true,
  });
