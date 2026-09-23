'use client';
import { ReactNode, useState } from 'react';

export function FieldRow({ children }: { children: ReactNode }) {
  return <div className="mb-6 flex flex-wrap gap-3.5">{children}</div>;
}

export function Field({
  label, labelJa, htmlFor, children, wide,
}: { label: string; labelJa?: string; htmlFor: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`min-w-[140px] ${wide ? 'flex-[2]' : 'flex-1'}`}>
      <label htmlFor={htmlFor} className="mb-2 block text-xs text-textDim">
        {label} {labelJa && <span className="ml-1.5 text-textFaint">{labelJa}</span>}
      </label>
      {children}
    </div>
  );
}

export const inputClass =
  'w-full rounded-xl border border-border bg-bg px-4 py-3.5 font-mono text-xl font-medium text-text focus:border-accent focus:outline-none';
export const selectClass =
  'w-full rounded-xl border border-border bg-bg px-4 py-3.5 font-sans text-[15px] text-text focus:border-accent focus:outline-none';

export function ResultGrid({ children }: { children: ReactNode }) {
  return <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">{children}</div>;
}

export function ResultCell({
  label, labelJa, value, unit, copyValue,
}: { label: string; labelJa?: string; value: string | number; unit?: string; copyValue?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl border border-border bg-bg p-4 hover:border-accent">
      {copyValue && (
        <button
          onClick={() => { navigator.clipboard?.writeText(copyValue).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
          className="absolute right-3 top-3 text-[11px] text-textFaint hover:text-accent"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      )}
      <div className="mb-2 pr-11 text-[11px] text-textDim">
        {label} {labelJa && <span className="mt-0.5 block text-[10px] text-textFaint">{labelJa}</span>}
      </div>
      <div className="font-mono text-2xl font-semibold">
        {value}
        {unit && <span className="ml-1 text-xs text-textFaint">{unit}</span>}
      </div>
    </div>
  );
}

export function BigResult({ value, label }: { value: string; label: string }) {
  return (
    <div className="py-8 text-center">
      <div className="bg-gradient-to-r from-accent to-accent2 bg-clip-text font-mono text-[clamp(36px,7vw,56px)] font-semibold text-transparent">
        {value}
      </div>
      <div className="mt-2.5 text-[13px] text-textDim">{label}</div>
    </div>
  );
}

export function Panel({ children }: { children: ReactNode }) {
  return <div className="card-spot rounded-3xl border border-border bg-bg1 p-8 max-sm:p-5">{children}</div>;
}
