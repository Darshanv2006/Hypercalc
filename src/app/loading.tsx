'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + Math.random() * 15 + 5));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-9rem)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.14),transparent_36%)]" />

      <div className="relative flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center gap-8 px-6">
        <div className="flex items-center gap-4 rounded-full border border-border bg-surface/85 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur-md">
          <div className="relative h-8 w-8">
            <svg className="h-8 w-8 animate-spin text-mathematics" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-primary">
              HyperCalc
            </p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-elevated">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-mathematics to-physics transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl space-y-4">
          <div className="h-5 w-40 rounded-full bg-surface-elevated animate-pulse" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur-sm"
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  animationDelay: `${index * 60}ms`,
                  opacity: 0,
                }}
              >
                <div
                  className="mb-5 h-12 w-12 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in srgb, var(--domain-mathematics) 26%, transparent), color-mix(in srgb, var(--domain-physics) 18%, transparent))",
                  }}
                />
                <div className="space-y-3">
                  <div className="h-4 w-2/3 rounded-full bg-surface-elevated animate-pulse" />
                  <div className="h-3 w-full rounded-full bg-surface-elevated animate-pulse" />
                  <div className="h-3 w-5/6 rounded-full bg-surface-elevated animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}