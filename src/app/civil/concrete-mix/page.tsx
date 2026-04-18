"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [water, set_water] = useState<number | ''>(200);
  const [cement, set_cement] = useState<number | ''>(400);

  const hasValues = typeof water === 'number' && typeof cement === 'number';

  let result = null; if (water >= 0 && cement > 0) result = water / cement;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Water-Cement Ratio"
        description="Calculate the ratio of water to cement by mass."
        domainColorClass="text-civil"
        inputs={
          <>
            <InputField
              label="Water Mass"
              symbol="W"
              value={water}
              onChange={set_water}
              units={[{ value: 'kg', label: 'kg' }]}
              selectedUnit="kg"
            />
            <InputField
              label="Cement Mass"
              symbol="C"
              value={cement}
              onChange={set_cement}
              units={[{ value: 'kg', label: 'kg' }]}
              selectedUnit="kg"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="W/C Ratio"
              symbol="Ratio"
              value={result}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="\\frac{W}{C}" />}
      />
    </div>
  );
}
