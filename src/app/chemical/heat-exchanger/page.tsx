"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [thi, set_thi] = useState<number | ''>(100);
  const [tho, set_tho] = useState<number | ''>(60);
  const [tci, set_tci] = useState<number | ''>(20);
  const [tco, set_tco] = useState<number | ''>(40);

  const hasValues = typeof thi === 'number' && typeof tho === 'number' && typeof tci === 'number' && typeof tco === 'number';

  let result = null; const dt1 = thi - tco; const dt2 = tho - tci; if (dt1 > 0 && dt2 > 0 && dt1 !== dt2) result = (dt1 - dt2) / Math.log(dt1 / dt2); else if (dt1 === dt2) result = dt1;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Heat Exchanger LMTD"
        description="Calculate the Log Mean Temperature Difference."
        domainColorClass="text-chemical"
        inputs={
          <>
            <InputField
              label="Hot In (Thi)"
              symbol="T_{hi}"
              value={thi}
              onChange={set_thi}
              units={[{ value: '°C', label: '°C' }]}
              selectedUnit="°C"
            />
            <InputField
              label="Hot Out (Tho)"
              symbol="T_{ho}"
              value={tho}
              onChange={set_tho}
              units={[{ value: '°C', label: '°C' }]}
              selectedUnit="°C"
            />
            <InputField
              label="Cold In (Tci)"
              symbol="T_{ci}"
              value={tci}
              onChange={set_tci}
              units={[{ value: '°C', label: '°C' }]}
              selectedUnit="°C"
            />
            <InputField
              label="Cold Out (Tco)"
              symbol="T_{co}"
              value={tco}
              onChange={set_tco}
              units={[{ value: '°C', label: '°C' }]}
              selectedUnit="°C"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="LMTD"
              symbol="\Delta T_{lm}"
              value={result}
              unit="°C"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="\\Delta T_{lm} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}" />}
      />
    </div>
  );
}
