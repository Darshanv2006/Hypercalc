"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [mass, set_mass] = useState<number | ''>(10);
  const [accel, set_accel] = useState<number | ''>(9.81);

  const hasValues = typeof mass === 'number' && typeof accel === 'number';

  let result = null; if (mass > 0) result = mass * accel;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Newton's Second Law"
        description="Calculate force, mass, or acceleration."
        domainColorClass="text-physics"
        inputs={
          <>
            <InputField
              label="Mass"
              symbol="m"
              value={mass}
              onChange={set_mass}
              units={[{ value: 'kg', label: 'kg' }]}
              selectedUnit="kg"
            />
            <InputField
              label="Acceleration"
              symbol="a"
              value={accel}
              onChange={set_accel}
              units={[{ value: 'm/s²', label: 'm/s²' }]}
              selectedUnit="m/s²"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Force"
              symbol="F"
              value={result}
              unit="N"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="F = m a" />}
      />
    </div>
  );
}
