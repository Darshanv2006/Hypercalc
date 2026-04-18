"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [density, set_density] = useState<number | ''>(1000);
  const [volume, set_volume] = useState<number | ''>(0.5);

  const hasValues = typeof density === 'number' && typeof volume === 'number';

  let result = null; const g = 9.81; if (density > 0 && volume >= 0) result = density * volume * g;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Buoyant Force"
        description="Archimedes' Principle"
        domainColorClass="text-physics"
        inputs={
          <>
            <InputField
              label="Fluid Density"
              symbol="ρ"
              value={density}
              onChange={set_density}
              units={[{ value: 'kg/m³', label: 'kg/m³' }]}
              selectedUnit="kg/m³"
              min={0}
            />
            <InputField
              label="Displaced Volume"
              symbol="V"
              value={volume}
              onChange={set_volume}
              units={[{ value: 'm³', label: 'm³' }]}
              selectedUnit="m³"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Buoyant Force"
              symbol="F_b"
              value={result}
              unit="N"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="F_b = \\rho V g" />}
      />
    </div>
  );
}
