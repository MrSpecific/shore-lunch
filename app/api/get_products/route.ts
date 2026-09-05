import { NextResponse } from 'next/server';
import { fetchProducts } from '@lib/stripe';

export async function GET() {
  const products = await fetchProducts();

  return NextResponse.json(products);
}
