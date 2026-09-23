import { NextResponse } from 'next/server';
import { getTodaysPosts } from '@/lib/social-content';

export const dynamic = 'force-dynamic';

/**
 * 実際には投稿しない、確認用のプレビューAPI。
 * いつでもブラウザで /api/daily-post-preview を開けば、今日の投稿2件が見られます。
 */
export async function GET() {
  return NextResponse.json(getTodaysPosts());
}
