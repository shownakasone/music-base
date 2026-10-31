import { DTM_TIPS } from './dtm-tips';
import { TOOL_TIPS } from './tool-tips';
import type { ToolTip } from './tool-tips';
import { DTM_TIPS_2 } from './dtm-tips-2';
import { TOOL_TIPS_2 } from './tool-tips-2';

const SITE_URL = 'https://music-base.vercel.app';

/**
 * コンテンツバンクは「開始日」付きで並べる。今日の日付以前で一番新しいバンクが使われ、
 * そのバンクの epoch（基準日）からの経過日数でぐるぐる回る。
 * 新しい月分を追加する時は、末尾に { name, start, epoch, ... } を足すだけ。
 * 切り替わるまでは前のバンクの並び順は一切変わらない。
 * ※ Cronは09:00 UTC(18:00 JST)実行なので、UTC日付とJST日付は一致する。
 *
 * firstShown = そのバンクの1周目が始まった日。ここから「バンクの本数」日を過ぎると繰り返しに入る。
 */
interface Bank {
  name: string;
  start: number;
  epoch: number;
  firstShown: number;
  tips: string[];
  toolTips: ToolTip[];
}

const d = (y: number, m: number, day: number) => Date.UTC(y, m - 1, day);

const BANKS: Bank[] = [
  // 1ヶ月目：ローテーション基準は従来どおり 2026-01-01 のまま（並び順を変えない）
  { name: '1ヶ月目', start: d(2026, 1, 1), epoch: d(2026, 1, 1), firstShown: d(2026, 9, 25), tips: DTM_TIPS, toolTips: TOOL_TIPS },
  // 2ヶ月目：2026-10-31 に1本目から始まる
  { name: '2ヶ月目', start: d(2026, 10, 31), epoch: d(2026, 10, 31), firstShown: d(2026, 10, 31), tips: DTM_TIPS_2, toolTips: TOOL_TIPS_2 },
];

const DAY = 86400000;

function utcDay(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function pickBank(date: Date): Bank {
  const today = utcDay(date);
  let picked = BANKS[0];
  for (const b of BANKS) {
    if (b.start <= today) picked = b;
  }
  return picked;
}

function dayIndex(length: number, bank: Bank, date: Date): number {
  const daysSince = Math.floor((utcDay(date) - bank.epoch) / DAY);
  return ((daysSince % length) + length) % length;
}

/** 今日のDTM Tips投稿本文 */
export function getTodaysTipPost(date: Date = new Date()): string {
  const bank = pickBank(date);
  return bank.tips[dayIndex(bank.tips.length, bank, date)];
}

/** 今日のMUSIC BASEツール活用Tips投稿本文 */
export function getTodaysToolPost(date: Date = new Date()): string {
  const bank = pickBank(date);
  const tip = bank.toolTips[dayIndex(bank.toolTips.length, bank, date)];
  const url = `${SITE_URL}/tools/${tip.slug}`;
  return `【使い方Tips】${tip.title}\n\n${tip.text}\n\n▶︎ ${url}\n\n#DTM #作曲 #MUSICBASE`;
}

export interface BankStatus {
  bank: string;
  dayInBank: number;
  total: number;
  /** この後、新しい内容で投稿できる日数（0なら今日が最後、マイナスなら繰り返しに入っている） */
  freshDaysLeft: number;
  repeating: boolean;
  /** 新しい月分の追加が必要なタイミングの警告（残り3日以内、または繰り返し中） */
  warning: string | null;
}

/** 今のバンクの進み具合。繰り返しに入っていないかをここで確認できる */
export function getBankStatus(date: Date = new Date()): BankStatus {
  const bank = pickBank(date);
  const total = Math.min(bank.tips.length, bank.toolTips.length);
  const dayInBank = Math.floor((utcDay(date) - bank.firstShown) / DAY) + 1;
  const freshDaysLeft = total - dayInBank;
  const isLast = bank === BANKS[BANKS.length - 1];
  const repeating = freshDaysLeft < 0;
  let warning: string | null = null;
  if (isLast && repeating) warning = `新しい月分が未登録のため、${-freshDaysLeft}日前から過去の内容が繰り返されています`;
  else if (isLast && freshDaysLeft <= 3) warning = `新しい内容は残り${freshDaysLeft + 1}日分です。次の月分を追加してください`;
  return { bank: bank.name, dayInBank, total, freshDaysLeft, repeating, warning };
}

export interface DailyPosts {
  date: string;
  tip: string;
  toolPost: string;
  status: BankStatus;
}

/** 今日の2投稿分（Tips + ツール紹介）と、コンテンツの残り状況をまとめて取得 */
export function getTodaysPosts(date: Date = new Date()): DailyPosts {
  return {
    date: date.toISOString().slice(0, 10),
    tip: getTodaysTipPost(date),
    toolPost: getTodaysToolPost(date),
    status: getBankStatus(date),
  };
}
