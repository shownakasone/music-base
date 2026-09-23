import { NextResponse } from 'next/server';
import { getTodaysPosts } from '@/lib/social-content';

export const dynamic = 'force-dynamic';

interface ThreadsPostResult {
  posted: boolean;
  reason?: string;
  detail?: unknown;
}

/**
 * Threads Graph APIへの2段階投稿(コンテナ作成→公開)。
 * THREADS_ACCESS_TOKEN / THREADS_USER_ID が未設定の間は投稿をスキップし、
 * 生成した本文だけを返す「ドライラン」として動作します。
 */
async function postToThreads(text: string): Promise<ThreadsPostResult> {
  const token = process.env.THREADS_ACCESS_TOKEN;
  const userId = process.env.THREADS_USER_ID;
  if (!token || !userId) {
    return { posted: false, reason: 'not_configured (THREADS_ACCESS_TOKEN / THREADS_USER_ID 未設定)' };
  }

  try {
    const createRes = await fetch(`https://graph.threads.net/v1.0/${userId}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ media_type: 'TEXT', text, access_token: token }),
    });
    const createData = await createRes.json();
    if (!createData.id) {
      return { posted: false, reason: 'create_failed', detail: createData };
    }

    // Threads APIの仕様上、コンテナ作成直後は公開できないことがあるため少し待つ
    await new Promise((resolve) => setTimeout(resolve, 15000));

    const publishRes = await fetch(`https://graph.threads.net/v1.0/${userId}/threads_publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creation_id: createData.id, access_token: token }),
    });
    const publishData = await publishRes.json();
    return { posted: Boolean(publishData.id), detail: publishData };
  } catch (e) {
    return { posted: false, reason: 'request_error', detail: String(e) };
  }
}

export async function GET(request: Request) {
  // Vercel CronはCRON_SECRETを設定すると、自動でこのAuthorizationヘッダーを付けて呼び出します。
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { date, tip, toolPost } = getTodaysPosts();
  const [tipResult, toolResult] = await Promise.all([postToThreads(tip), postToThreads(toolPost)]);

  return NextResponse.json({
    date,
    posts: { tip, toolPost },
    results: { tip: tipResult, toolPost: toolResult },
  });
}
