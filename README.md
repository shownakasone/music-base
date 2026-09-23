# MUSIC BASE (Next.js版)

claude.aiアーティファクト版から移植した、完全無料で公開できる独立サイトです。
ツール14個はすべてこのサイト内で動作します。AI Music Assistantだけは、無料運用の間は
claude.aiのアーティファクト版（チャット式AI相談）にリンクで誘導します。

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
- `app/ai/page.tsx` の `ARTIFACT_URL` は、公開したいclaude.aiアーティファクトのリンクに差し替え可能です

## 後でAI機能を自前サーバー化する場合

予算が確保できたら `app/api/ai-music/route.ts` を作り、サーバー側で
`ANTHROPIC_API_KEY`（Vercelの環境変数に設定、コードには書かない）を使って
Anthropic APIを呼び出すチャットUIに `app/ai/page.tsx` を差し替えてください。

## ディレクトリ構成

```
app/
  page.tsx            ホーム
  tools/page.tsx       ツール一覧（カテゴリ絞り込み）
  tools/[slug]/page.tsx  ツール個別ページ（14個、静的生成・独立URL）
  ai/page.tsx          AI Music Assistant導線
  sitemap.ts / robots.ts  SEO
lib/
  music-theory.ts      音楽理論の純粋関数（移調・コード生成・BPM計算など）
  tools-data.ts        ツールのメタデータ（SEO情報を兼ねる）
components/
  tools/               ツールごとのReactコンポーネント（14個）
  ui.tsx               共通UIパーツ
```
