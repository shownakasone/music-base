export interface ThreadsPostResult {
  posted: boolean;
  reason?: string;
  detail?: unknown;
}

/**
 * Threads Graph APIへの2段階投稿(コンテナ作成→公開)。
 * THREADS_ACCESS_TOKEN / THREADS_USER_ID が未設定の間は投稿をスキップし、
 * 生成した本文だけを返す「ドライラン」として動作します。
 * delayMs: コンテナ作成後、公開するまでの待ち時間(Threads APIの仕様上、直後は公開できないことがある)
 */
export async function postToThreads(
  text: string,
  opts: { delayMs?: number } = {},
): Promise<ThreadsPostResult> {
  const delayMs = opts.delayMs ?? 15000;
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

    if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));

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
