import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TOOLS, getTool } from '@/lib/tools-data';
import { TOOL_COMPONENTS } from '@/components/tools';

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = getTool(params.slug);
  if (!tool) return {};
  return {
    title: `${tool.title} | MUSIC BASE`,
    description: tool.desc,
    openGraph: { title: `${tool.title} | MUSIC BASE`, description: tool.desc },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (!tool) notFound();
  const ToolComponent = TOOL_COMPONENTS[tool.slug];

  return (
    <main className="py-11 pb-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <Link href="/tools" className="mb-6 inline-flex items-center gap-1.5 text-sm text-textDim hover:text-accent">
          ← Tools一覧
        </Link>
        <div className="mb-9">
          <div className="mb-2 text-xs font-semibold tracking-wide text-accent">{tool.cat}</div>
          <h1 className="font-disp text-[clamp(28px,4vw,40px)] font-bold tracking-tight">{tool.title}</h1>
          <p className="mt-2.5 max-w-[560px] text-[15px] text-textDim">{tool.desc}</p>
        </div>
        {ToolComponent ? <ToolComponent /> : <p className="text-textDim">準備中です。</p>}
      </div>
    </main>
  );
}
