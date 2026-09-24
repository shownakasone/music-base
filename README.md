# MUSIC BASE (Next.js版)

claude.aiアーティファクト版から移植した、完全無料で公開できる独立サイトです。
ツール14個はすべてこのサイト内で動作します。

## ローカルで動かす

```bash
npm install
npm run dev
```

http://localhost:3000 を開いてください。

## 無料で公開する手順（GitHub → Vercel）

1. GitHubで新しいリポジトリを作る（Privateで可）
2. このフォルダをそのリポジトリにpush
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<あなたのユーザー名>/music-base.git
   git push -u origin main
   ```
3. https://vercel.com にGitHubアカウントでログイン
4. 「Add New... → Project」から、pushしたリポジトリを選んでインポート
5. 設定はデフォルトのままで「Deploy」をクリック
6. 数十秒で `https://music-base-xxxx.vercel.app` のようなURLが発行され、公開完了

以降は `git push` するたびに自動で再デプロイされます。

## デプロイ後にやること

- `app/layout.tsx` の `metadataBase`、`app/sitemap.ts` と `app/robots.ts` の `BASE_URL` を、
  実際に発行されたURL（または独自ドメイン）に書き換えてください

## ディレクトリ構成

```
app/
  page.tsx            ホーム
  tools/page.tsx       ツール一覧（カテゴリ絞り込み）
  tools/[slug]/page.tsx  ツール個別ページ（14個、静的生成・独立URL）
  api/daily-post-preview/route.ts  今日の投稿2件をプレビュー（投稿はしない）
  api/cron/daily-post/route.ts     毎日自動でThreadsに投稿するCron用エンドポイント
  sitemap.ts / robots.ts  SEO
lib/
  music-theory.ts      音楽理論の純粋関数（移調・コード生成・BPM計算など）
  tools-data.ts        ツールのメタデータ（SEO情報を兼ねる）
  dtm-tips.ts          DTM Tips投稿のコンテンツバンク（30日分、月ごとに差し替え）
  tool-tips.ts         ツール活用Tips投稿のコンテンツバンク（30日分、月ごとに差し替え）
  social-content.ts    日付から今日の投稿2件を自動選択するロジック
components/
  tools/               ツールごとのReactコンポーネント（14個）
  ui.tsx               共通UIパーツ
vercel.json            毎日1回のCron設定
```

## 毎日の自動投稿について

- 仕組み: Vercel Cronが毎日18:00 JST（09:00 UTC）に `/api/cron/daily-post` を呼び出し、
  DTM Tips 1件 + MUSIC BASEツール紹介 1件の、計2件をThreadsに投稿します
- 今日の投稿内容だけを確認したい場合は `/api/daily-post-preview` をブラウザで開いてください（投稿はされません）
- **Threads側の認証情報（`THREADS_ACCESS_TOKEN` / `THREADS_USER_ID`）をVercelの環境変数に設定するまでは、
  実際の投稿はスキップされ、生成した本文だけが返るドライラン動作になります**
- Cronの不正実行を防ぐため、Vercelの環境変数に `CRON_SECRET` を設定しておくことを推奨します
  （設定すると、Vercelが自動でそのシークレットを使って認証つきで呼び出します）
- コンテンツの更新: `lib/dtm-tips.ts` を月ごとに新しい内容へ差し替えてpushしてください
  （ツール紹介は `lib/tools-data.ts` のツール一覧から自動生成されるため、ツールが増えると自動で反映されます）
