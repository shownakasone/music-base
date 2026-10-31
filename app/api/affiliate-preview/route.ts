import { NextResponse } from 'next/server';
import { planAffiliatePost, upcomingAffiliatePlans, affiliateEnabled, AFFILIATE_WEEKDAYS } from '@/lib/affiliate';

export const dynamic = 'force-dynamic';

/** 実際には投稿しない確認用API。今日の分と、今後3週間の投稿予定（検証結果つき）を返します。 */
export async function GET() {
  return NextResponse.json({
    enabled: affiliateEnabled(),
    postWeekdaysUTC: AFFILIATE_WEEKDAYS,
    today: planAffiliatePost(),
    upcoming: upcomingAffiliatePlans(21),
  });
}
