import { NextRequest, NextResponse } from 'next/server';
import { generateLoginCode } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate login code
    const loginCode = generateLoginCode();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Delete any existing codes for this email
    await supabase.from('login_codes').delete().eq('email', email);

    // Store new code
    const { error: codeError } = await supabase.from('login_codes').insert([
      {
        email,
        code: loginCode,
        expires_at: expiresAt.toISOString(),
        attempts: 0,
        created_at: new Date().toISOString(),
      },
    ]);

    if (codeError) throw codeError;

    // Log code for development
    console.log(`[DEV] Login code for ${email}: ${loginCode}`);

    return NextResponse.json({
      success: true,
      message: `Login code sent to ${email}`,
    });
  } catch (error: any) {
    console.error('Request code error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
