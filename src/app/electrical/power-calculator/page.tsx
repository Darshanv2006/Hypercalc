"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function PowerCalculatorPage() {
  const [voltage, setVoltage] = useState<number | ''>(220); // V
  const [current, setCurrent] = useState<number | ''>(10); // A
  const [powerFactor, setPowerFactor] = useState<number | ''>(0.8); // cosφ

  // Calculate powers
  const hasValues = typeof voltage === 'number' && typeof current === 'number' && typeof powerFactor === 'number' &&
                    powerFactor >= 0 && powerFactor <= 1;
  const apparentPower = hasValues ? voltage * current : null;
  const realPower = hasValues ? (apparentPower as number) * (powerFactor as number) : null;
  const reactivePower = hasValues ? (apparentPower as number) * Math.sqrt(1 - (powerFactor as number) ** 2) : null;
  const phaseAngle = hasValues ? Math.acos(powerFactor as number) * (180 / Math.PI) : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Power Calculator"
        description="Calculate real, reactive, and apparent power in AC circuits."
        domainColorClass="text-electrical"
        inputs={
          <>
            <InputField
              label="Voltage (RMS)"
              symbol="V"
              value={voltage}
              onChange={setVoltage}
              units={[{ value: 'V', label: 'Volts (V)' }]}
              selectedUnit="V"
            />
            <InputField
              label="Current (RMS)"
              symbol="I"
              value={current}
              onChange={setCurrent}
              units={[{ value: 'A', label: 'Amperes (A)' }]}
              selectedUnit="A"
            />
            <InputField
              label="Power Factor"
              symbol="cosφ"
              value={powerFactor}
              onChange={setPowerFactor}
              units={[{ value: '', label: 'Dimensionless' }]}
              selectedUnit=""
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Apparent Power"
              symbol="S"
              value={apparentPower}
              unit="VA"
              sigFigs={4}
            />
            <OutputField
              label="Real Power"
              symbol="P"
              value={realPower}
              unit="W"
              sigFigs={4}
            />
            <OutputField
              label="Reactive Power"
              symbol="Q"
              value={reactivePower}
              unit="VAR"
              sigFigs={4}
            />
            <OutputField
              label="Phase Angle"
              symbol="φ"
              value={phaseAngle}
              unit="°"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="S = V I, \\quad P = S \\cos\\phi, \\quad Q = S \\sin\\phi, \\quad \\cos\\phi = \\frac{P}{S}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the apparent power:',
                formula: 'S = V I',
                substitution: `S = ${voltage} \\cdot ${current}`,
                result: `S = ${apparentPower}\\text{ VA}`
              },
              {
                description: 'Calculate the real power:',
                formula: 'P = S \\cos\\phi',
                substitution: `P = ${apparentPower} \\cdot ${powerFactor}`,
                result: `P = ${realPower}\\text{ W}`
              },
              {
                description: 'Calculate the reactive power:',
                formula: 'Q = S \\sin\\phi',
                substitution: `Q = ${apparentPower} \\cdot \\sin(${phaseAngle}^\\circ)`,
                result: `Q = ${reactivePower}\\text{ VAR}`
              },
              {
                description: 'Calculate the phase angle:',
                formula: '\\phi = \\cos^{-1}(\\cos\\phi)',
                substitution: `\\phi = \\cos^{-1}(${powerFactor})`,
                result: `\\phi = ${phaseAngle}^\\circ`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}

export const dynamic = 'force-dynamic';