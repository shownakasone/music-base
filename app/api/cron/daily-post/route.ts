import { NextResponse } from 'next/server';
import { getTodaysPosts } from '@/lib/social-content';
import { postToThreads } from '@/lib/threads';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Vercel CronはCRON_SECRETを設定すると、自動でこのAuthorizationヘッダーを付けて呼び出します。
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { date, tip, toolPost, status } = getTodaysPosts();
  const [tipResult, toolResult] = await Promise.all([postToThreads(tip), postToThreads(toolPost)]);

  return NextResponse.json({
    date,
    status,
    posts: { tip, toolPost },
    results: { tip: tipResult, toolPost: toolResult },
  });
}
