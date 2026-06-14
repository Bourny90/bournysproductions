import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if user has purchased this product
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .eq('product_id', params.id)
      .eq('status', 'completed')
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Check if download link has expired
    if (new Date(order.expires_at) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Download link expired' },
        { status: 410 }
      );
    }

    // Get product details
    const { data: product } = await supabase
      .from('products')
      .select('name, file_path')
      .eq('id', params.id)
      .single();

    if (!product || !product.file_path) {
      return NextResponse.json(
        { success: false, error: 'Product file not found' },
        { status: 404 }
      );
    }

    // For development, return mock file
    // In production, serve the actual file from storage
    const fileName = `${product.name}.zip`;
    const mockContent = `This is a mock download for ${product.name}`;

    return new NextResponse(mockContent, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error: any) {
    console.error('Download error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
