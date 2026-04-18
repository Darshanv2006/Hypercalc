"use client";

import React, { InputHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';
import { Info, ChevronDown } from 'lucide-react';

export interface UnitOption {
  value: string;
  label: string;
}

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  label: string;
  symbol?: string;
  value: number | '';
  onChange: (val: number | '') => void;
  units?: UnitOption[];
  selectedUnit?: string;
  onUnitChange?: (unit: string) => void;
  error?: string;
  helperText?: string;
  min?: number;
  max?: number;
}

export default function InputField({
  label,
  symbol,
  value,
  onChange,
  units,
  selectedUnit,
  onUnitChange,
  error: externalError,
  helperText,
  min,
  max,
  className,
  placeholder,
  ...props
}: InputFieldProps) {
  // Keep an internal text buffer so user can type freely; validate on change
  const [rawText, setRawText] = useState<string>(value !== '' ? String(value) : '');
  const [internalError, setInternalError] = useState<string>('');

  // Sync external value changes (e.g. unit-conversion rewrites the number)
  React.useEffect(() => {
    if (value === '') {
      setRawText('');
    } else if (!isNaN(Number(rawText)) && parseFloat(rawText) !== value) {
      setRawText(String(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setRawText(raw);

    if (raw === '' || raw === '-') {
      // Empty or just a minus sign – treat as empty, clear errors
      onChange('');
      setInternalError('');
      return;
    }

    const num = Number(raw);

    if (isNaN(num)) {
      setInternalError('Please enter a valid number');
      // Don't call onChange — keep previous valid state visible in outputs
      return;
    }

    if (min !== undefined && num < min) {
      setInternalError(`Value must be ≥ ${min}`);
      // Still pass value up but show warning
      onChange(num);
      return;
    }
    if (max !== undefined && num > max) {
      setInternalError(`Value must be ≤ ${max}`);
      onChange(num);
      return;
    }

    setInternalError('');
    onChange(num);
  };

  const error = externalError || internalError;
  const hasError = Boolean(error);

  return (
    <div className={cn('flex flex-col space-y-1.5', className)}>
      <label className="flex items-center text-sm font-medium text-text-secondary">
        {label}
        {symbol && <span className="ml-1 text-text-primary">({symbol})</span>}
      </label>

      <div
        className="relative flex items-center rounded-lg border bg-background focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-primary/40 transition-shadow shadow-sm"
        style={{ borderColor: hasError ? 'var(--color-economics, #ef4444)' : 'var(--border)' }}
      >
        {/* Text input — allows ANY character so we can catch 'abc' */}
        <input
          type="text"
          inputMode="decimal"
          value={rawText}
          onChange={handleChange}
          placeholder={placeholder ?? (symbol ? `Enter ${symbol}…` : 'Enter value…')}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${label}-error` : undefined}
          className="flex-1 bg-transparent px-3 py-2.5 text-text-primary text-base placeholder:text-text-muted focus:outline-none font-mono"
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />

        {/* Unit selector */}
        {units && units.length > 0 && onUnitChange ? (
          <div className="relative flex items-center border-l border-border h-full">
            <select
              value={selectedUnit}
              onChange={(e) => onUnitChange(e.target.value)}
              aria-label={`Unit for ${label}`}
              className="h-full bg-surface-elevated pl-3 pr-7 py-2.5 text-sm font-semibold text-text-primary focus:outline-none rounded-r-lg cursor-pointer hover:bg-surface transition-colors appearance-none"
            >
              {units.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
            {/* Visible dropdown arrow */}
            <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-text-muted" />
          </div>
        ) : selectedUnit ? (
          <div className="h-full border-l border-border bg-surface-elevated px-3 py-2.5 text-sm font-semibold text-text-secondary rounded-r-lg flex items-center">
            {selectedUnit}
          </div>
        ) : null}
      </div>

      {/* Validation / helper message */}
      {(error || helperText) && (
        <div
          id={hasError ? `${label}-error` : undefined}
          role={hasError ? 'alert' : undefined}
          className="flex items-start mt-1 gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <Info
            className={cn(
              'h-4 w-4 mt-0.5 flex-shrink-0',
              hasError ? 'text-red-400' : 'text-text-muted'
            )}
          />
          <span
            className={cn(
              'text-xs leading-relaxed',
              hasError ? 'text-red-400' : 'text-text-muted'
            )}
          >
            {error || helperText}
          </span>
        </div>
      )}
    </div>
  );
}
