"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

export interface OutputFieldProps {
  label: string;
  symbol?: string;
  value: number | string | null;
  unit?: string;
  className?: string;
  sigFigs?: number;
}

export default function OutputField({
  label,
  symbol,
  value,
  unit,
  className,
  sigFigs = 6
}: OutputFieldProps) {
  const [copied, setCopied] = useState(false);

  const displayValue = React.useMemo(() => {
    if (value === null || value === undefined || value === '') return '—';
    if (typeof value === 'number') {
      if (Number.isNaN(value) || !Number.isFinite(value)) return 'Error';
      const absVal = Math.abs(value);
      if (absVal === 0) return '0';
      if (absVal > 1e6 || absVal < 1e-4) {
        return value.toExponential(sigFigs - 1);
      }
      return parseFloat(value.toPrecision(sigFigs)).toString();
    }
    return value;
  }, [value, sigFigs]);

  const handleCopy = async () => {
    if (displayValue === '—' || displayValue === 'Error') return;
    try {
      await navigator.clipboard.writeText(unit ? `${displayValue} ${unit}` : displayValue);
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea');
      el.value = unit ? `${displayValue} ${unit}` : displayValue;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex flex-col space-y-1.5 p-4 rounded-xl bg-surface border border-border shadow-sm', className)}>
      <div className="flex items-center justify-between text-sm font-medium text-text-secondary">
        <label className="flex flex-wrap items-center">
          {label}
          {symbol && <span className="ml-1 text-text-primary">({symbol})</span>}
        </label>

        <button
          onClick={handleCopy}
          disabled={displayValue === '—' || displayValue === 'Error'}
          className="ml-2 rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: copied ? 'var(--color-civil, #22c55e)15' : undefined,
            color: copied ? 'var(--color-civil, #22c55e)' : undefined
          }}
          title={copied ? 'Copied!' : 'Copy result'}
          aria-label={copied ? 'Copied to clipboard' : 'Copy result to clipboard'}
          aria-live="polite"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-text-muted" />
              <span className="text-text-muted">Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-2xl font-bold font-mono text-text-primary truncate">
          {displayValue}
        </span>
        {unit && displayValue !== '—' && displayValue !== 'Error' && (
          <span className="text-base font-medium text-text-secondary">{unit}</span>
        )}
      </div>
    </div>
  );
}
