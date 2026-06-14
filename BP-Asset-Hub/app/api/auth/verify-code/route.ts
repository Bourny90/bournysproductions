import { NextRequest, NextResponse } from 'next/server';
import { verifyLoginCode, incrementCodeAttempts } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code, username } = body;

    if (!email || !code) {
      return NextResponse.json(
        { success: false, error: 'Email and code are required' },
        { status: 400 }
      );
    }

    // Verify code
    const result = await verifyLoginCode(email, code, username);

    if (!result.success) {
      // Increment failed attempts
      await incrementCodeAttempts(email);
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      user: result.user,
      token: result.token,
    });
  } catch (error: any) {
    console.error('Verify code error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
