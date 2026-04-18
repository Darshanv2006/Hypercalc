"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [n1, set_n1] = useState<number | ''>(1);
  const [theta1, set_theta1] = useState<number | ''>(30);
  const [n2, set_n2] = useState<number | ''>(1.33);

  const hasValues = typeof n1 === 'number' && typeof theta1 === 'number' && typeof n2 === 'number';

  let result = null; if (n1 > 0 && n2 > 0) { const rad = theta1 * Math.PI / 180; const sin2 = (n1 / n2) * Math.sin(rad); if (sin2 <= 1 && sin2 >= -1) result = Math.asin(sin2) * 180 / Math.PI; }

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Snell's Law"
        description="Calculate angle of refraction."
        domainColorClass="text-physics"
        inputs={
          <>
            <InputField
              label="Index of Refraction 1"
              symbol="n₁"
              value={n1}
              onChange={set_n1}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
            <InputField
              label="Incident Angle"
              symbol="θ₁"
              value={theta1}
              onChange={set_theta1}
              units={[{ value: 'degrees', label: 'degrees' }]}
              selectedUnit="degrees"
            />
            <InputField
              label="Index of Refraction 2"
              symbol="n₂"
              value={n2}
              onChange={set_n2}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Refracted Angle"
              symbol="θ₂"
              value={result}
              unit="degrees"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="n_1 \\sin(\\theta_1) = n_2 \\sin(\\theta_2)" />}
      />
    </div>
  );
}
