"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function PHBufferPage() {
  const [pKa, setPKa] = useState<number | ''>(4.76); // for acetic acid
  const [conjugateBase, setConjugateBase] = useState<number | ''>(0.1); // M
  const [acid, setAcid] = useState<number | ''>(0.1); // M

  // Calculate pH = pKa + log([A-]/[HA])
  const hasValues = typeof pKa === 'number' && typeof conjugateBase === 'number' && typeof acid === 'number' &&
                    conjugateBase > 0 && acid > 0;
  const ratio = hasValues ? conjugateBase / acid : null;
  const ph = hasValues && ratio ? pKa + Math.log10(ratio) : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="pH & Buffer Calculator"
        description="Calculate pH of buffer solutions using Henderson-Hasselbalch equation."
        domainColorClass="text-chemical"
        inputs={
          <>
            <InputField
              label="pKa"
              value={pKa}
              onChange={setPKa}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
            <InputField
              label="Conjugate Base Concentration"
              symbol="[A⁻]"
              value={conjugateBase}
              onChange={setConjugateBase}
              units={[{ value: 'M', label: 'Molar (M)' }]}
              selectedUnit="M"
            />
            <InputField
              label="Acid Concentration"
              symbol="[HA]"
              value={acid}
              onChange={setAcid}
              units={[{ value: 'M', label: 'Molar (M)' }]}
              selectedUnit="M"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="pH"
              value={ph}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Ratio [A⁻]/[HA]"
              value={ratio}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="\\text{pH} = \\text{pKa} + \\log_{10}\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right)" />
        }
        steps={hasValues && ph ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the ratio of conjugate base to acid:',
                formula: `\\frac{[\\text{A}^-]}{[\\text{HA}]} = \\frac{${conjugateBase}}{${acid}}`,
                result: `Ratio = ${ratio}`
              },
              {
                description: 'Calculate the logarithm of the ratio:',
                formula: `\\log_{10}(${ratio})`,
                result: `\\log_{10}(${ratio}) = ${Math.log10(ratio!)}`
              },
              {
                description: 'Calculate pH:',
                formula: `\\text{pH} = ${pKa} + ${Math.log10(ratio!)}`,
                result: `\\text{pH} = ${ph}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}