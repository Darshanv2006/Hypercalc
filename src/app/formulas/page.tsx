"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calculator } from 'lucide-react';
import { FormulaDisplay } from '@/components/calculator';
import formulasData from '@/data/formulas.json';
import { Formula } from '@/lib/api';
import { calculators } from '@/lib/calculators';

const domains = ['all', 'mechanical', 'civil', 'chemical', 'electrical', 'mathematics', 'physics', 'cs', 'economics'];

export default function FormulasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');

  const filteredFormulas = useMemo(() => {
    return (formulasData as Formula[]).filter(formula => {
      const matchesDomain = selectedDomain === 'all' || formula.domain === selectedDomain;
      const matchesSearch = formula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           formula.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           formula.formula.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDomain && matchesSearch;
    });
  }, [searchQuery, selectedDomain]);

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Formula Reference Library</h1>
        <p className="text-text-secondary">Search and browse all {formulasData.length} engineering formulas.</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-4 w-4" />
          <input
            type="text"
            placeholder="Search formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-border"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {domains.map(domain => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedDomain === domain
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-text-secondary hover:bg-surface-elevated'
              }`}
            >
              {domain === 'all' ? 'All Domains' : domain.charAt(0).toUpperCase() + domain.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFormulas.map(formula => (
          <div key={formula.id} className="p-6 rounded-xl border border-border bg-surface hover:bg-surface-elevated transition-colors flex flex-col h-full">
            <div className="mb-4 flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  {formula.domain}
                </span>
                <span className="text-lg font-bold text-text-primary">{formula.symbol}</span>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2" title={formula.name}>{formula.name}</h3>
              <div className="overflow-x-auto overflow-y-hidden py-2" style={{ scrollbarWidth: 'thin' }}>
                <FormulaDisplay formula={formula.formula} />
              </div>
            </div>
            {formula.variables && Object.keys(formula.variables).length > 0 && (
              <div className="mb-4 pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-text-secondary mb-2">Variables:</h4>
                <ul className="text-sm text-text-secondary space-y-1 max-h-24 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                  {Object.entries(formula.variables).map(([varName, desc]) => (
                    <li key={varName}>
                      <span className="font-mono">{varName}:</span> {desc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-auto pt-4 flex gap-2">
              {(() => {
                const calcDef = calculators.find((c) => c.route === formula.calculator_route);
                const isImplemented = (calcDef?.implemented) || (formula.calculator_route && formula.calculator_route.startsWith('/calculator/'));
                const destRoute = isImplemented ? formula.calculator_route : `/calculator/${formula.id}`;
                  
                return (
                  <Link
                    href={destRoute as string}
                    className="w-full justify-center inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate
                  </Link>
                );
              })()}
            </div>
          </div>
        ))}
      </div>

      {filteredFormulas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">No formulas found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}