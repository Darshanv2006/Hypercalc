"use client";

import React, { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { Share2, Check, X, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CalculatorShellProps {
  title: string;
  description: string;
  domainColorClass?: string;
  inputs: ReactNode;
  outputs: ReactNode;
  formula?: ReactNode;
  steps?: ReactNode;
  graph?: ReactNode;
  className?: string;
}

export default function CalculatorShell({
  title,
  description,
  domainColorClass = 'text-mechanical',
  inputs,
  outputs,
  formula,
  steps,
  graph,
  className,
}: CalculatorShellProps) {
  const [shareModal, setShareModal] = useState<{ url: string; copied: boolean } | null>(null);

  const handleShare = () => {
    if (typeof window === 'undefined') return;

    const baseUrl = window.location.href.split('?')[0];
    const inputElements = document.querySelectorAll<HTMLInputElement>('input[type="text"], input[type="number"]');
    const params = new URLSearchParams();

    inputElements.forEach((el) => {
      const val = el.value;
      if (!val) return;
      // Walk up the DOM to find a label
      let name = '';
      const wrapper = el.closest('.flex.flex-col, .flex-col');
      if (wrapper) {
        const labelEl = wrapper.querySelector('label');
        if (labelEl) {
          // Prefer symbol in parens: "Torque (τ)" → "τ"
          const match = labelEl.textContent?.match(/\(([^)]+)\)/);
          name = match ? match[1] : labelEl.textContent?.trim() ?? '';
        }
      }
      if (name && val) params.append(name, val);
    });

    const qs = params.toString();
    const url = qs ? `${baseUrl}?${qs}` : baseUrl;

    // Try clipboard, then show modal regardless
    navigator.clipboard.writeText(url).catch(() => {});
    setShareModal({ url, copied: false });
  };

  const copyShareUrl = async () => {
    if (!shareModal) return;
    try {
      await navigator.clipboard.writeText(shareModal.url);
    } catch {
      const el = document.createElement('textarea');
      el.value = shareModal.url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setShareModal((s) => s ? { ...s, copied: true } : s);
    setTimeout(() => setShareModal((s) => s ? { ...s, copied: false } : s), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('mx-auto flex w-full max-w-5xl flex-col gap-6 pb-20 relative', className)}
    >
      {/* ── Share Modal ── */}
      <AnimatePresence>
        {shareModal && (
          <motion.div
            key="share-modal"
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 z-50 w-full max-w-md rounded-xl border border-border bg-surface shadow-2xl p-4"
            role="dialog"
            aria-label="Share link"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <LinkIcon className="h-4 w-4" /> Share this calculator
              </span>
              <button
                onClick={() => setShareModal(null)}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close share dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex gap-2">
              <input
                id="share-url-input"
                type="text"
                readOnly
                value={shareModal.url}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 truncate"
                aria-label="Shareable URL"
              />
              <button
                onClick={copyShareUrl}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all"
                style={{
                  background: shareModal.copied
                    ? 'var(--color-civil, #22c55e)'
                    : 'var(--mathematics, #8b5cf6)',
                  color: '#fff',
                }}
                aria-label={shareModal.copied ? 'Copied!' : 'Copy link'}
              >
                {shareModal.copied ? (
                  <><Check className="h-4 w-4" /> Copied!</>
                ) : (
                  <><Copy className="h-4 w-4" /> Copy</>
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-text-muted">
              Link includes current input values so recipients see the same calculation.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">{title}</h2>
          <p className="mt-2 text-text-secondary max-w-2xl">{description}</p>
        </div>

        <button
          onClick={handleShare}
          className="inline-flex h-9 items-center justify-center rounded-md bg-surface border border-border px-4 py-2 text-sm font-medium text-text-primary shadow-sm hover:bg-surface-elevated transition-colors focus-visible:outline-none"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
        {/* Left Column: Inputs */}
        <div className="md:col-span-5 flex flex-col space-y-6">
          <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Inputs</h3>
            <div className="flex flex-col space-y-4">{inputs}</div>
          </div>

          {formula && <div className="hidden md:block">{formula}</div>}
        </div>

        {/* Right Column: Outputs & extras */}
        <div className="md:col-span-7 flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={cn(
              'bg-surface rounded-xl border border-border p-5 shadow-2xl relative border-t-4',
              domainColorClass.replace('text-', 'border-')
            )}
          >
            <div
              className={cn(
                'absolute -inset-0.5 opacity-10 blur-xl z-0 pointer-events-none rounded-xl',
                domainColorClass.replace('text-', 'bg-')
              )}
            />
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center justify-between">
                Outputs
                <span className={cn('text-xs px-2 py-1 bg-surface-elevated rounded-full font-medium', domainColorClass)}>
                  Real-time
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{outputs}</div>
            </div>
          </motion.div>

          <div className="md:hidden">{formula}</div>

          {steps}
          {graph}
        </div>
      </div>
    </motion.div>
  );
}

// Copy icon — same package so re-export
function Copy({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
