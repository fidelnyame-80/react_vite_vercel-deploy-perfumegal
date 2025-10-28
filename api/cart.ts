// api/cart.ts
import { storage } from '../storage';
import { insertCartItemSchema } from '@shared/schema';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { method, query, body } = req;

  if (method === 'GET') {
    const items = await storage.getCartItems(query.sessionId as string);
    const populated = await Promise.all(
      items.map(async (item: any) => {
        const product = await storage.getProduct(item.productId);
        return product ? { ...item, product } : null;
      })
    );
    return res.json(populated.filter(Boolean));
  }

  if (method === 'POST') {
    try {
      const data = insertCartItemSchema.parse(body);
      const item = await storage.addToCart(data);
      return res.status(201).json(item);
    } catch {
      return res.status(400).json({ error: 'Invalid data' });
    }
  }

  if (method === 'PATCH') {
    const item = await storage.updateCartItem(query.id as string, body.quantity);
    return item ? res.json(item) : res.status(404).end();
  }

  if (method === 'DELETE') {
    await storage.removeFromCart(query.id as string);
    return res.status(204).end();
  }

  res.status(405).end();
}