"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function HeatExchangerLMTDPage() {
  const [hotIn, setHotIn] = useState<number | ''>(150); // °C
  const [hotOut, setHotOut] = useState<number | ''>(90); // °C
  const [coldIn, setColdIn] = useState<number | ''>(30); // °C
  const [coldOut, setColdOut] = useState<number | ''>(70); // °C
  const [flowType, setFlowType] = useState<'counter-current' | 'co-current'>('counter-current');

  // Calculate Log Mean Temperature Difference (LMTD)
  const hasValues = typeof hotIn === 'number' && typeof hotOut === 'number' &&
                   typeof coldIn === 'number' && typeof coldOut === 'number';

  let lmtd: number | null = null;
  let deltaT1: number | null = null;
  let deltaT2: number | null = null;

  if (hasValues) {
    if (flowType === 'counter-current') {
      // For counter-current flow: ΔT1 = Thi - Tco, ΔT2 = Tho - Tci
      deltaT1 = hotIn - coldOut;
      deltaT2 = hotOut - coldIn;
    } else {
      // For co-current flow: ΔT1 = Thi - Tci, ΔT2 = Tho - Tco
      deltaT1 = hotIn - coldIn;
      deltaT2 = hotOut - coldOut;
    }

    // LMTD formula: (ΔT1 - ΔT2) / ln(ΔT1/ΔT2)
    // Handle special case when ΔT1 = ΔT2 (LMTD = ΔT1 = ΔT2)
    if (deltaT1 !== null && deltaT2 !== null && Math.abs(deltaT1 - deltaT2) < 1e-10) {
      lmtd = deltaT1;
    } else if (deltaT1 !== null && deltaT2 !== null && deltaT1 > 0 && deltaT2 > 0) {
      lmtd = (deltaT1 - deltaT2) / Math.log(deltaT1 / deltaT2);
    }
  }

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Heat Exchanger LMTD Calculator"
        description="Calculate Log Mean Temperature Difference for counter-current or co-current flow."
        domainColorClass="text-chemical"
        inputs={
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-2">Flow Type</label>
              <select
                value={flowType}
                onChange={(e) => setFlowType(e.target.value as 'counter-current' | 'co-current')}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border"
              >
                <option value="counter-current">Counter-Current Flow</option>
                <option value="co-current">Co-Current Flow</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <InputField
                  label="Hot Fluid Inlet Temperature"
                  symbol="T_{hi}"
                  value={hotIn}
                  onChange={setHotIn}
                  units={[{ value: 'C', label: '°C' }]}
                  selectedUnit="C"
                />
              </div>
              <div>
                <InputField
                  label="Hot Fluid Outlet Temperature"
                  symbol="T_{ho}"
                  value={hotOut}
                  onChange={setHotOut}
                  units={[{ value: 'C', label: '°C' }]}
                  selectedUnit="C"
                />
              </div>
              <div>
                <InputField
                  label="Cold Fluid Inlet Temperature"
                  symbol="T_{ci}"
                  value={coldIn}
                  onChange={setColdIn}
                  units={[{ value: 'C', label: '°C' }]}
                  selectedUnit="C"
                />
              </div>
              <div>
                <InputField
                  label="Cold Fluid Outlet Temperature"
                  symbol="T_{co}"
                  value={coldOut}
                  onChange={setColdOut}
                  units={[{ value: 'C', label: '°C' }]}
                  selectedUnit="C"
                />
              </div>
            </div>
          </>
        }
        outputs={
          <>
            <div className="space-y-4">
              {deltaT1 !== null && deltaT2 !== null && (
                <>
                  <OutputField
                    label="Temperature Difference at End 1"
                    symbol="\\Delta T_1"
                    value={deltaT1}
                    unit="°C"
                    sigFigs={4}
                  />
                  <OutputField
                    label="Temperature Difference at End 2"
                    symbol="\\Delta T_2"
                    value={deltaT2}
                    unit="°C"
                    sigFigs={4}
                  />
                </>
              )}
              {lmtd !== null && (
                <>
                  <OutputField
                    label="Log Mean Temperature Difference"
                    symbol="LMTD"
                    value={lmtd}
                    unit="°C"
                    sigFigs={4}
                  />
                  <OutputField
                    label="LMTD in K"
                    symbol="LMTD"
                    value={lmtd}
                    unit="K"
                    sigFigs={4}
                  />
                 </>
               )}
             </div>
           </>
        }
        formula={
          <FormulaDisplay formula="LMTD = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln\\left(\\frac{\\Delta T_1}{\\Delta T_2}\\right)} \\quad \\text{(for \\Delta T_1 \\neq \\Delta T_2)}" />
        }
        steps={hasValues && deltaT1 !== null && deltaT2 !== null && lmtd !== null ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate temperature differences based on flow type:',
                result: flowType === 'counter-current'
                  ? `\\Delta T_1 = T_{{hi}} - T_{{co}} = ${hotIn} - ${coldOut} = ${deltaT1}\\,°C\\\\\\Delta T_2 = T_{{ho}} - T_{{ci}} = ${hotOut} - ${coldIn} = ${deltaT2}\\,°C`
                  : `\\Delta T_1 = T_{{hi}} - T_{{ci}} = ${hotIn} - ${coldIn} = ${deltaT1}\\,°C\\\\\\Delta T_2 = T_{{ho}} - T_{{co}} = ${hotOut} - ${coldOut} = ${deltaT2}\\,°C`
              },
              {
                description: 'Apply the LMTD formula:',
                formula: 'LMTD = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln\\left(\\frac{\\Delta T_1}{\\Delta T_2}\\right)}'
              },
              {
                description: 'Substitute values:',
                substitution: `LMTD = \\frac{${deltaT1} - ${deltaT2}}{\\ln\\left(\\frac{${deltaT1}}{${deltaT2}}\\right)} = ${lmtd.toFixed(4)}\\,°C`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}