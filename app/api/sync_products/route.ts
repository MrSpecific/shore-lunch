import { NextResponse } from 'next/server';
import syncProductsToSanity from '@lib/stripe/syncProductsToSanity';

export async function GET() {
  const productsArray = await syncProductsToSanity();

  return NextResponse.json(productsArray);
}
