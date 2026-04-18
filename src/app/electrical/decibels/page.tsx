"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

type DBType = 'voltage' | 'power';

export default function DecibelsPage() {
  const [type, setType] = useState<DBType>('voltage');
  const [value1, setValue1] = useState<number | ''>(1);
  const [value2, setValue2] = useState<number | ''>(2);
  const [db, setDb] = useState<number | ''>(6);

  // Calculate dB from ratio
  const hasRatio = typeof value1 === 'number' && typeof value2 === 'number' && value1 > 0 && value2 > 0;
  const ratio = hasRatio ? value2 / value1 : null;
  const dbFromRatio = hasRatio ? (type === 'voltage' ? 20 * Math.log10(ratio!) : 10 * Math.log10(ratio!)) : null;

  // Calculate ratio from dB
  const hasDb = typeof db === 'number';
  const ratioFromDb = hasDb ? Math.pow(10, db! / (type === 'voltage' ? 20 : 10)) : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Decibels Calculator"
        description="Convert between decibels and voltage/power ratios."
        domainColorClass="text-electrical"
        inputs={
          <>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-text-secondary mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as DBType)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border"
              >
                <option value="voltage">Voltage Ratio</option>
                <option value="power">Power Ratio</option>
              </select>
            </div>
            <InputField
              label={`${type === 'voltage' ? 'Voltage' : 'Power'} 1`}
              symbol={type === 'voltage' ? 'V₁' : 'P₁'}
              value={value1}
              onChange={setValue1}
              units={[{ value: '', label: 'Units' }]}
              selectedUnit=""
            />
            <InputField
              label={`${type === 'voltage' ? 'Voltage' : 'Power'} 2`}
              symbol={type === 'voltage' ? 'V₂' : 'P₂'}
              value={value2}
              onChange={setValue2}
              units={[{ value: '', label: 'Units' }]}
              selectedUnit=""
            />
            <InputField
              label="Decibels"
              symbol="dB"
              value={db}
              onChange={setDb}
              units={[{ value: 'dB', label: 'dB' }]}
              selectedUnit="dB"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Ratio"
              symbol={type === 'voltage' ? 'V₂/V₁' : 'P₂/P₁'}
              value={ratio}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Decibels from Ratio"
              symbol="dB"
              value={dbFromRatio}
              unit="dB"
              sigFigs={4}
            />
            <OutputField
              label="Ratio from dB"
              symbol={type === 'voltage' ? 'V₂/V₁' : 'P₂/P₁'}
              value={ratioFromDb}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula={
            type === 'voltage' ?
            "dB = 20 \\log_{10}\\left(\\frac{V_2}{V_1}\\right), \\quad \\frac{V_2}{V_1} = 10^{dB/20}" :
            "dB = 10 \\log_{10}\\left(\\frac{P_2}{P_1}\\right), \\quad \\frac{P_2}{P_1} = 10^{dB/10}"
          } />
        }
        steps={(hasRatio || hasDb) ? (
          <StepByStep
            steps={[
              ...(hasRatio ? [
                {
                  description: `Calculate dB from ${type} ratio:`,
                  formula: type === 'voltage' ? 'dB = 20 \\log_{10}\\left(\\frac{V_2}{V_1}\\right)' : 'dB = 10 \\log_{10}\\left(\\frac{P_2}{P_1}\\right)',
                  substitution: `dB = ${type === 'voltage' ? 20 : 10} \\log_{10}(${ratio})`,
                  result: `dB = ${dbFromRatio}\\text{ dB}`
                }
              ] : []),
              ...(hasDb ? [
                {
                  description: `Calculate ${type} ratio from dB:`,
                  formula: type === 'voltage' ? '\\frac{V_2}{V_1} = 10^{dB/20}' : '\\frac{P_2}{P_1} = 10^{dB/10}',
                  substitution: `${type === 'voltage' ? 'V₂/V₁' : 'P₂/P₁'} = 10^{${db}/${type === 'voltage' ? 20 : 10}}`,
                  result: `${type === 'voltage' ? 'V₂/V₁' : 'P₂/P₁'} = ${ratioFromDb}`
                }
              ] : [])
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}