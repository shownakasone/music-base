import Link from 'next/link';
import { TOOLS, CAT_JA, ToolCategory } from '@/lib/tools-data';
import ToolCard from '@/components/ToolCard';

export default function HomePage() {
  const featured = TOOLS.slice(0, 5);
  const cats = Object.keys(CAT_JA) as ToolCategory[];

  return (
    <main>
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute -left-24 -top-36 h-[420px] w-[420px] rounded-full bg-accent opacity-25 blur-[90px]" />
        <div className="pointer-events-none absolute -right-28 top-6 h-[380px] w-[380px] rounded-full bg-accent2 opacity-20 blur-[90px]" />
        <div className="relative z-10 mx-auto max-w-[1180px] px-6">
          <h1 className="max-w-[780px] font-disp text-[clamp(40px,7vw,78px)] font-bold leading-[1.02] tracking-tight">
            Make Music.
            <br />
            <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Better.</span>
          </h1>
          <p className="mt-5 max-w-[480px] text-lg text-textDim">
            音楽を作る人、演奏する人、楽しむ人のための無料ツール＆音楽ハブ。
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Link href="/tools" className="rounded-full bg-text px-6 py-3.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:bg-accent">
              TOOLSを使う
            </Link>
          </div>
          <div className="mt-14 flex flex-wrap gap-11">
            {[['14', '無料ツール'], ['¥0', '完全無料で利用可'], ['5', 'カテゴリ']].map(([num, label]) => (
              <div key={label}>
                <div className="font-disp text-3xl font-bold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">{num}</div>
                <div className="mt-1 text-xs text-textDim">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-borderSoft py-14">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2.5">
            <h2 className="font-disp text-3xl font-semibold tracking-tight">Tools you&apos;ll actually use.</h2>
            <Link href="/tools" className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-accent2 hover:text-accent2">
              全{TOOLS.length}ツールを見る →
            </Link>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            {cats.map((c) => (
              <Link key={c} href="/tools" className="rounded-full border border-border bg-bg1 px-4 py-2 text-sm text-textDim transition-colors hover:border-accent2 hover:text-text">
                {c} <span className="ml-1.5 text-xs opacity-60">{CAT_JA[c]}</span>
              </Link>
            ))}
          </div>
          <div className="grid auto-rows-fr grid-cols-1 gap-3.5 md:grid-cols-3">
            {featured.map((t, i) => (
              <ToolCard key={t.slug} tool={t} featured={i === 0} />
            ))}
            <Link
              href="/tools"
              className="flex flex-col items-center justify-center gap-2.5 rounded-xl2 border-[1.5px] border-dashed border-border p-5 text-center transition-colors hover:border-accent2 hover:bg-bg1"
            >
              <div className="font-disp text-3xl font-bold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
                +{TOOLS.length - 5}
              </div>
              <h3 className="text-base font-semibold">もっと見る</h3>
              <p className="text-sm text-textDim">全{TOOLS.length}ツールを見る →</p>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
