// api/orders.ts
import { storage } from '../server/storage';
import { insertOrderSchema } from '@shared/schema';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const data = insertOrderSchema.parse(req.body);
    const order = await storage.createOrder(data);
    res.status(201).json(order);
  } catch {
    res.status(400).json({ error: 'Invalid order' });
  }
}