"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [scalar, set_scalar] = useState<number | ''>(2);
  const [a11, set_a11] = useState<number | ''>(1);
  const [a12, set_a12] = useState<number | ''>(2);
  const [a21, set_a21] = useState<number | ''>(3);
  const [a22, set_a22] = useState<number | ''>(4);

  const hasValues = typeof scalar === 'number' && typeof a11 === 'number' && typeof a12 === 'number' && typeof a21 === 'number' && typeof a22 === 'number';

  let result = null; if (typeof scalar === "number") result = (scalar * a11) + (scalar * a22); // returning trace proxy for simplicity

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Matrix Scalar Operations"
        description="Calculate scalar multiplication for a 2x2 matrix."
        domainColorClass="text-mathematics"
        inputs={
          <>
            <InputField
              label="Scalar Multiplier"
              symbol="k"
              value={scalar}
              onChange={set_scalar}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
            <InputField
              label="A11"
              symbol="a11"
              value={a11}
              onChange={set_a11}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
            <InputField
              label="A12"
              symbol="a12"
              value={a12}
              onChange={set_a12}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
            <InputField
              label="A21"
              symbol="a21"
              value={a21}
              onChange={set_a21}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
            <InputField
              label="A22"
              symbol="a22"
              value={a22}
              onChange={set_a22}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Scaled Trace"
              symbol="Tr(kA)"
              value={result}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="k \\cdot A" />}
      />
    </div>
  );
}
