import { DTM_TIPS } from './dtm-tips';
import { TOOL_TIPS } from './tool-tips';

const SITE_URL = 'https://music-base.vercel.app';
// ローテーションの基準日。この日から数えた経過日数でコンテンツバンクを順番に回す。
const EPOCH = Date.UTC(2026, 0, 1);

function dayIndex(length: number, date: Date): number {
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const daysSince = Math.floor((today - EPOCH) / 86400000);
  return ((daysSince % length) + length) % length;
}

/** 今日のDTM Tips投稿本文 */
export function getTodaysTipPost(date: Date = new Date()): string {
  return DTM_TIPS[dayIndex(DTM_TIPS.length, date)];
}

/** 今日のMUSIC BASEツール活用Tips投稿本文 */
export function getTodaysToolPost(date: Date = new Date()): string {
  const tip = TOOL_TIPS[dayIndex(TOOL_TIPS.length, date)];
  const url = `${SITE_URL}/tools/${tip.slug}`;
  return `【使い方Tips】${tip.title}\n\n${tip.text}\n\n▶︎ ${url}\n\n#DTM #作曲 #MUSICBASE`;
}

export interface DailyPosts {
  date: string;
  tip: string;
  toolPost: string;
}

/** 今日の2投稿分（Tips + ツール紹介）をまとめて取得 */
export function getTodaysPosts(date: Date = new Date()): DailyPosts {
  return {
    date: date.toISOString().slice(0, 10),
    tip: getTodaysTipPost(date),
    toolPost: getTodaysToolPost(date),
  };
}
