// api/products.ts
import { storage } from '../storage';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  const products = await storage.getAllProducts();
  res.status(200).json(products);
}