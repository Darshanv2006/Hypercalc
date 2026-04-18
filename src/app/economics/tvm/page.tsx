"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [pv, set_pv] = useState<number | ''>(1000);
  const [r, set_r] = useState<number | ''>(5);
  const [n, set_n] = useState<number | ''>(10);

  const hasValues = typeof pv === 'number' && typeof r === 'number' && typeof n === 'number';

  let result = null; if (n >= 0) result = pv * Math.pow(1 + (r/100), n);

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Time Value of Money"
        description="Calculate Future Value (FV)."
        domainColorClass="text-economics"
        inputs={
          <>
            <InputField
              label="Present Value"
              symbol="PV"
              value={pv}
              onChange={set_pv}
              units={[{ value: '$', label: '$' }]}
              selectedUnit="$"
            />
            <InputField
              label="Interest Rate (%)"
              symbol="r"
              value={r}
              onChange={set_r}
              units={[{ value: '%', label: '%' }]}
              selectedUnit="%"
            />
            <InputField
              label="Periods"
              symbol="n"
              value={n}
              onChange={set_n}
              units={[{ value: 'yrs', label: 'yrs' }]}
              selectedUnit="yrs"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Future Value"
              symbol="FV"
              value={result}
              unit="$"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="FV = PV(1 + r)^n" />}
      />
    </div>
  );
}
