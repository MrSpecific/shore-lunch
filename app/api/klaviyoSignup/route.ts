import { NextRequest, NextResponse } from 'next/server';
import klaviyoHandler from '@lib/klaviyo';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = {
    success: false,
    message: '',
    klaviyo: {} as any,
  };

  if (!body || !body.firstname || !body.lastname || !body.email) {
    result.message = 'Name or email not found';
    return NextResponse.json(result);
  }

  const klaviyoResponse = klaviyoHandler({ data: body });

  result.klaviyo = await klaviyoResponse;

  if (result.klaviyo?.status === 'success') {
    result.success = true;
    result.message = 'Success';
  }

  return NextResponse.json(result);
}
