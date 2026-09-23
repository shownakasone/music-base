import Link from 'next/link';

// 無料運用の間はAI Music Assistantをclaude.aiのアーティファクト版にリンクします。
// 予算が確保できたら、ここを /api/ai-music を叩く自前チャットUIに差し替えてください。
const ARTIFACT_URL = 'https://claude.ai/artifact/CmwHkuESpfxFGyJvCrnWb7';

export default function AiPage() {
  return (
    <main className="py-20">
      <div className="mx-auto max-w-[720px] px-6 text-center">
        <div className="mb-3 text-xs font-semibold tracking-wide text-accent">AI MUSIC</div>
        <h1 className="font-disp text-4xl font-bold">AI Music Assistant</h1>
        <p className="mx-auto mt-4 max-w-[480px] text-[15px] text-textDim">
          曲作りの「なんとなく」を、具体的なアイデアに変える。悩みを書いて相談してみましょう。
        </p>
        <div className="mt-10 rounded-3xl border border-border bg-bg1 p-10">
          <p className="mb-6 text-sm text-textDim">
            現在、AI相談は専用ページで提供しています。下のボタンから開いてください（新しいタブで開きます）。
          </p>
          <a
            href={ARTIFACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-gradient-to-r from-accent to-accent2 px-8 py-4 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
          >
            AI Music Assistantを開く →
          </a>
        </div>
        <Link href="/tools" className="mt-8 inline-block text-sm text-textDim hover:text-accent2">
          ← ツール一覧に戻る
        </Link>
      </div>
    </main>
  );
}
