import { NextResponse } from 'next/server';
import { planAffiliatePost, affiliateEnabled } from '@/lib/affiliate';
import { postToThreads } from '@/lib/threads';

export const dynamic = 'force-dynamic';

/**
 * アフィリエイト投稿。火・木・土の21:00 JST（12:00 UTC）にVercel Cronが呼び出します。
 * 投稿されるのは、次の条件をすべて満たす時だけです。
 *  1. lib/affiliate-posts.ts に投稿が登録されている
 *  2. 今日が投稿日（火・木・土）で、2026-11-01以降
 *  3. 検証（PR表記の自動付与・誇大表現チェック・文字数）に通っている
 *  4. 環境変数 AFFILIATE_ENABLED が "true" になっている
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const plan = planAffiliatePost();
  if (plan.status !== 'ready' || !plan.text) {
    return NextResponse.json({ posted: false, plan });
  }
  if (!affiliateEnabled()) {
    return NextResponse.json({ posted: false, reason: 'disabled (AFFILIATE_ENABLED が "true" ではありません)', plan });
  }

  const result = await postToThreads(plan.text);
  return NextResponse.json({ plan, result });
}
