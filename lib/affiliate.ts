/**
 * アフィリエイト投稿のロジック。
 * - 投稿日: 火・木・土（UTC基準。Cronは12:00 UTC=21:00 JSTなのでJSTの同じ日付）
 * - 本文の先頭に必ず「【PR】」、末尾にプログラムごとの収入表記を自動で付ける
 * - 検証に通らないものは投稿しない（理由を返す）
 * - AFFILIATE_ENABLED=true を設定するまでは、実際の投稿は行わない（内容の確認のみ）
 */
import { AFFILIATE_POSTS } from './affiliate-posts';

export type AffiliateProgram = 'amazon' | 'rakuten' | 'a8' | 'other';

export interface AffiliatePost {
  id: string;
  program: AffiliateProgram;
  url: string;
  text: string;
}

/**
 * プログラムごとの表記。★各プログラムの現行規約で必要な文言かご確認のうえ、必要なら書き換えてください。
 */
export const DISCLOSURES: Record<AffiliateProgram, string> = {
  amazon: 'Amazonのアソシエイトとして、適格販売により収入を得ています。',
  rakuten: '※アフィリエイト広告を利用しています',
  a8: '※アフィリエイト広告を利用しています',
  other: '※アフィリエイト広告を利用しています',
};

export const AFFILIATE_WEEKDAYS = [2, 4, 6]; // 火・木・土 (UTC)
export const AFFILIATE_START = Date.UTC(2026, 10, 1); // 2026-11-01 から
const DAY = 86400000;
const MAX_LENGTH = 480; // Threadsの上限500字に余裕を持たせる
/** 同じ商品を投稿する最短の間隔（投稿日の回数）。12回 = 週3回ペースで約4週間 */
export const MIN_CYCLE_POSTS = 12;

/** 誇大表現・断定の疑いがある言葉（優良誤認のリスク）。含む文面は投稿しない */
const BANNED_WORDS = ['絶対', '必ず', '100%', '１００％', '最強', 'No.1', 'ナンバーワン', '業界最安', '最安値', '誰でも簡単に', '効果を保証', '返金保証'];

export function formatAffiliatePost(p: AffiliatePost): string {
  return `【PR】${p.text.trim()}\n\n${p.url}\n\n${DISCLOSURES[p.program]}`;
}

export function validateAffiliatePost(p: AffiliatePost): string[] {
  const errors: string[] = [];
  if (!p.id) errors.push('idがありません');
  if (!p.text || p.text.trim().length < 20) errors.push('本文が短すぎます（実際に使った感想や根拠を書いてください）');
  if (!/^https:\/\//.test(p.url)) errors.push('urlはhttps://で始めてください');
  if (/PR|広告|プロモーション/.test(p.text)) errors.push('本文にPR表記を書かないでください（自動で付きます）');
  const hit = BANNED_WORDS.filter((w) => p.text.includes(w));
  if (hit.length) errors.push(`誇大・断定の疑いがある表現が含まれています: ${hit.join('、')}`);
  if (formatAffiliatePost(p).length > MAX_LENGTH) errors.push(`長すぎます（${formatAffiliatePost(p).length}字 / 上限${MAX_LENGTH}字）`);
  return errors;
}

function utcDay(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function isPostDay(dayMs: number): boolean {
  return AFFILIATE_WEEKDAYS.includes(new Date(dayMs).getUTCDay());
}

/** 開始日から数えて、その日が何回目の投稿日か（投稿日でなければnull） */
export function affiliateOrdinal(date: Date): number | null {
  const today = utcDay(date);
  if (today < AFFILIATE_START || !isPostDay(today)) return null;
  let n = 0;
  for (let t = AFFILIATE_START; t < today; t += DAY) if (isPostDay(t)) n++;
  return n;
}

export type AffiliateStatus = 'no_posts' | 'before_start' | 'not_a_post_day' | 'resting' | 'invalid' | 'ready';

export interface AffiliatePlan {
  date: string;
  status: AffiliateStatus;
  id?: string;
  text?: string;
  errors?: string[];
}

export function planAffiliatePost(date: Date = new Date(), bank: AffiliatePost[] = AFFILIATE_POSTS): AffiliatePlan {
  const iso = date.toISOString().slice(0, 10);
  if (bank.length === 0) return { date: iso, status: 'no_posts' };
  if (utcDay(date) < AFFILIATE_START) return { date: iso, status: 'before_start' };
  const ord = affiliateOrdinal(date);
  if (ord === null) return { date: iso, status: 'not_a_post_day' };
  // 商品が少ない間は、同じ商品を短い間隔で繰り返さない（MIN_CYCLE_POSTS回に1回まで）
  const slot = ord % Math.max(bank.length, MIN_CYCLE_POSTS);
  if (slot >= bank.length) return { date: iso, status: 'resting' };
  const post = bank[slot];
  const errors = validateAffiliatePost(post);
  if (errors.length) return { date: iso, status: 'invalid', id: post.id, errors };
  return { date: iso, status: 'ready', id: post.id, text: formatAffiliatePost(post) };
}

/** 今日から先の投稿予定（確認用）。日数を指定してその期間内の投稿日だけ返す */
export function upcomingAffiliatePlans(days = 21, from: Date = new Date(), bank: AffiliatePost[] = AFFILIATE_POSTS): AffiliatePlan[] {
  const out: AffiliatePlan[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(utcDay(from) + i * DAY);
    const plan = planAffiliatePost(d, bank);
    if (plan.status === 'ready' || plan.status === 'invalid') out.push(plan);
  }
  return out;
}

export function affiliateEnabled(): boolean {
  return process.env.AFFILIATE_ENABLED === 'true';
}
