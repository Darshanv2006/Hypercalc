"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function StatisticsPage() {
  const [dataInput, setDataInput] = useState<string>('1, 2, 3, 4, 5');

  const data = dataInput.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b);
  const n = data.length;

  const mean = n > 0 ? data.reduce((sum, val) => sum + val, 0) / n : null;

  const median = n > 0 ? (n % 2 === 0 ? (data[n / 2 - 1] + data[n / 2]) / 2 : data[Math.floor(n / 2)]) : null;

  const mode = n > 0 ? (() => {
    const freq: Record<number, number> = {};
    data.forEach(val => freq[val] = (freq[val] || 0) + 1);
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq).filter(key => freq[Number(key)] === maxFreq).map(Number);
    return modes.length === Object.keys(freq).length ? null : modes; // no mode if all unique
  })() : null;

  const variance = mean && n > 1 ? data.reduce((sum, val) => sum + (val - mean) ** 2, 0) / (n - 1) : null;
  const stdDev = variance ? Math.sqrt(variance) : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Statistics Calculator"
        description="Calculate mean, median, mode, and standard deviation."
        domainColorClass="text-mathematics"
        inputs={
          <>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-text-secondary mb-2">Data (comma-separated)</label>
              <textarea
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                placeholder="e.g. 1, 2, 3, 4, 5"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border font-mono min-h-[80px]"
              />
            </div>
          </>
        }
        outputs={
          <>
            <OutputField
              label="Count"
              value={n}
              unit=""
            />
            <OutputField
              label="Mean"
              symbol="μ"
              value={mean}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Median"
              value={median}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Mode"
              value={mode ? mode.join(', ') : 'No mode'}
              unit=""
            />
            <OutputField
              label="Standard Deviation"
              symbol="σ"
              value={stdDev}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="\\mu = \\frac{\\sum x_i}{n}, \\quad \\sigma = \\sqrt{\\frac{\\sum (x_i - \\mu)^2}{n-1}}" />
        }
        steps={n > 0 ? (
          <StepByStep
            steps={[
              {
                description: 'Sort the data in ascending order:',
                result: `Sorted data: ${data.join(', ')}`
              },
              {
                description: 'Calculate the mean (average):',
                formula: '\\mu = \\frac{\\sum x_i}{n}',
                substitution: `\\mu = \\frac{${data.reduce((sum, val) => sum + val, 0)}}{${n}}`,
                result: `\\mu = ${mean}`
              },
              {
                description: 'Calculate the median (middle value):',
                result: n % 2 === 0
                  ? `Median = \\frac{${data[n / 2 - 1]} + ${data[n / 2]}}{2} = ${median}`
                  : `Median = ${data[Math.floor(n / 2)]}`
              },
              {
                description: 'Calculate the variance:',
                formula: '\\sigma^2 = \\frac{\\sum (x_i - \\mu)^2}{n-1}',
                result: `\\sigma^2 = ${variance}`
              },
              {
                description: 'Calculate the standard deviation:',
                formula: '\\sigma = \\sqrt{\\sigma^2}',
                result: `\\sigma = ${stdDev}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}