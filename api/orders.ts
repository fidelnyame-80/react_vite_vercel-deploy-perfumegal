// api/orders.ts
import { storage } from '../storage.ts';
import { z } from 'zod';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// ZOD INLINE — NO @shared
const insertOrderSchema = z.object({
  customerName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  total: z.string(),
  items: z.string(),
  status: z.string().default('pending'),
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const data = insertOrderSchema.parse(req.body);
    const order = await storage.createOrder(data);
    return res.status(201).json(order);
  } catch {
    return res.status(400).json({ error: 'Invalid order data' });
  }
}