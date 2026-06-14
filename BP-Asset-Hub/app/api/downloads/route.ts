import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user's purchases
    const { data: purchases, error } = await supabase
      .from('orders')
      .select(
        `
        id,
        product:products(name),
        product_id,
        purchased_at,
        expires_at,
        license_type
      `
      )
      .eq('user_id', user.id)
      .eq('status', 'completed');

    if (error) throw error;

    return NextResponse.json({
      success: true,
      purchases: purchases || [],
    });
  } catch (error: any) {
    console.error('Downloads error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
