import { NextRequest, NextResponse } from 'next/server';
import { createAccount } from '@/lib/auth';
import { sendLoginCodeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username } = body;

    // Validate inputs
    if (!email || !username) {
      return NextResponse.json(
        { success: false, error: 'Email and username are required' },
        { status: 400 }
      );
    }

    // Create account and generate code
    const result = await createAccount(email, username);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    // In production, send email. For now, return success
    // const emailResult = await sendLoginCodeEmail(email, loginCode, username);

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
