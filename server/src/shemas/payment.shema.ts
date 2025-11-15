import { z } from 'zod';

export const paymentShema = z.object({
  title: z.string().min(1, 'Title is required'),
  amount: z.object({
    value: z.number().positive('Amount must be a positive number'),
    currency: z.enum(['USD', 'EUR', 'RUB', 'GBP', 'ILS']),
    frequency: z.enum(['day', 'week', 'month', 'year'])
  }),
  paymentDate: z.coerce.date().optional(),
  notes: z.string().optional()
}).strict();


export const updatePaymentSchema = paymentShema.partial().strict();