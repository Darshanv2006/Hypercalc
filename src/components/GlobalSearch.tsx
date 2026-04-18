"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { Search, X, Calculator, BookOpen } from 'lucide-react';
import { calculators } from '@/lib/calculators';
import formulasData from '@/data/formulas.json';
import { Formula } from '@/lib/api';

const allFormulas = formulasData as Formula[];

export default function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const fuseCalculators = useMemo(() => new Fuse(calculators, {
    keys: ['name', 'description', 'domain'],
    threshold: 0.3,
  }), []);

  const fuseFormulas = useMemo(() => new Fuse(allFormulas, {
    keys: ['name', 'symbol', 'domain'],
    threshold: 0.3,
  }), []);

  const results = useMemo(() => {
    if (query.trim()) {
      const calcResults = fuseCalculators.search(query).map(result => ({
        type: 'calculator' as const,
        item: result.item,
        score: result.score,
      }));
      const formulaResults = fuseFormulas.search(query).map(result => ({
        type: 'formula' as const,
        item: result.item,
        score: result.score,
      }));
      return [...calcResults, ...formulaResults].sort((a, b) => (a.score || 0) - (b.score || 0)).slice(0, 10);
    }
    return [];
  }, [query, fuseCalculators, fuseFormulas]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (results.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          if (selected.type === 'calculator') {
            router.push((selected.item as any).route);
          } else {
            router.push(`/formulas?id=${(selected.item as any).id}`);
          }
          onClose();
        }
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, results, selectedIndex, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl mx-4">
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="w-5 h-5 text-text-muted mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search calculators and formulas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-text-primary"
          />
          <button onClick={onClose} className="ml-3 text-text-muted hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  tabIndex={0}
                  className={`px-4 py-2 hover:bg-surface cursor-pointer ${idx === selectedIndex ? 'bg-surface outline outline-2 outline-primary outline-offset-[-2px]' : ''}`}
                  onClick={() => {
                    if (result.type === 'calculator') {
                      router.push((result.item as any).route);
                    } else {
                      router.push(`/formulas?id=${(result.item as any).id}`);
                    }
                    onClose();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (result.type === 'calculator') {
                        router.push((result.item as any).route);
                      } else {
                        router.push(`/formulas?id=${(result.item as any).id}`);
                      }
                      onClose();
                    }
                  }}
                >
                  {result.type === 'calculator' ? (
                    <div className="flex items-center">
                      <Calculator className="w-4 h-4 mr-3 text-text-muted" />
                      <div>
                        <div className="font-medium text-text-primary">{(result.item as any).name}</div>
                        <div className="text-sm text-text-secondary">{(result.item as any).description}</div>
                        <div className="text-xs text-text-muted capitalize">{(result.item as any).domain}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-3 text-text-muted" />
                      <div>
                        <div className="font-medium text-text-primary">{(result.item as any).name}</div>
                        <div className="text-sm text-text-secondary">{(result.item as any).symbol} - {(result.item as any).domain}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="px-4 py-8 text-center text-text-secondary">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-text-secondary">
              Start typing to search...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}