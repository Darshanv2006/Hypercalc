"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep, GraphPanel
} from '@/components/calculator';

export default function NPVPage() {
  const [initialInvestment, setInitialInvestment] = useState<number | ''>(10000);
  const [discountRate, setDiscountRate] = useState<number | ''>(0.1); // decimal
  const [cashFlows, setCashFlows] = useState<string>('2000, 3000, 4000, 5000'); // comma-separated

  const cfArray = cashFlows.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
  const n = cfArray.length;

  const hasValues = typeof initialInvestment === 'number' && typeof discountRate === 'number' && n > 0;
  let npv = hasValues ? -initialInvestment : null;
  const cumulativeNPV = hasValues ? [-initialInvestment] : [];

  if (hasValues) {
    for (let t = 1; t <= n; t++) {
      const pv = cfArray[t - 1] / Math.pow(1 + discountRate!, t);
      npv! += pv;
      cumulativeNPV.push(cumulativeNPV[cumulativeNPV.length - 1] + pv);
    }
  }

  const graphData = hasValues ? cumulativeNPV.map((val, idx) => ({ x: idx, y: parseFloat(val.toFixed(2)) })) : [];

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="NPV Calculator"
        description="Calculate Net Present Value from cash flows."
        domainColorClass="text-economics"
        inputs={
          <>
            <InputField
              label="Initial Investment"
              value={initialInvestment}
              onChange={setInitialInvestment}
              units={[{ value: '', label: 'Currency' }]}
              selectedUnit=""
            />
            <InputField
              label="Discount Rate"
              symbol="i"
              value={discountRate}
              onChange={setDiscountRate}
              units={[{ value: '', label: 'Decimal' }]}
              selectedUnit=""
            />
            <div className="col-span-full">
              <label className="block text-sm font-medium text-text-secondary mb-2">Cash Flows (comma-separated)</label>
              <input
                type="text"
                value={cashFlows}
                onChange={(e) => setCashFlows(e.target.value)}
                placeholder="e.g. 2000, 3000, 4000"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border"
              />
            </div>
          </>
        }
        outputs={
          <>
            <OutputField
              label="Net Present Value"
              symbol="NPV"
              value={npv}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="NPV = -I_0 + \\sum_{t=1}^{n} \\frac{CF_t}{(1 + i)^t}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Initial investment (negative):',
                result: `-$${initialInvestment}`
              },
              ...cfArray.map((cf, idx) => ({
                description: `Present value of cash flow at t=${idx + 1}:`,
                formula: `PV = \\frac{CF}{(1 + i)^t}`,
                substitution: `PV = \\frac{${cf}}{(1 + ${discountRate})^{${idx + 1}}}`,
                result: `PV = ${(cf / Math.pow(1 + discountRate, idx + 1)).toFixed(2)}`
              })),
              {
                description: 'Total NPV:',
                result: `NPV = ${npv?.toFixed(2)}`
              }
            ]}
          />
        ) : undefined}
        graph={hasValues ? (
          <GraphPanel
            title="Cumulative NPV"
            data={graphData}
            xKey="x"
            xAxisLabel="Period"
            yKey="y"
            yAxisLabel="Cumulative NPV"
            domainColor="#F59E0B"
          />
        ) : undefined}
      />
    </div>
  );
}