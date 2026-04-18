"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function TransformerPage() {
  const [turnsPrimary, setTurnsPrimary] = useState<number | ''>(100); // turns
  const [turnsSecondary, setTurnsSecondary] = useState<number | ''>(200); // turns
  const [voltagePrimary, setVoltagePrimary] = useState<number | ''>(120); // V
  const [currentPrimary, setCurrentPrimary] = useState<number | ''>(5); // A

  // Calculate turns ratio
  const turnsRatio = (typeof turnsPrimary === 'number' && typeof turnsSecondary === 'number' && turnsPrimary > 0) ?
                     turnsSecondary / turnsPrimary : null;

  // Calculate secondary voltage V2 = V1 * (N2/N1)
  const hasVoltage = typeof voltagePrimary === 'number' && turnsRatio;
  const voltageSecondary = hasVoltage ? voltagePrimary * turnsRatio : null;

  // Calculate secondary current I2 = I1 * (N1/N2) = I1 / turnsRatio
  const hasCurrent = typeof currentPrimary === 'number' && turnsRatio;
  const currentSecondary = hasCurrent ? currentPrimary / turnsRatio : null;

  // Calculate power (assuming ideal)
  const powerPrimary = hasVoltage && hasCurrent ? voltagePrimary * currentPrimary : null;
  const powerSecondary = voltageSecondary && currentSecondary ? voltageSecondary * currentSecondary : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Transformer Calculator"
        description="Calculate voltage and current transformation in ideal transformers."
        domainColorClass="text-electrical"
        inputs={
          <>
            <InputField
              label="Primary Turns"
              symbol="N₁"
              value={turnsPrimary}
              onChange={setTurnsPrimary}
              units={[{ value: '', label: 'Turns' }]}
              selectedUnit=""
            />
            <InputField
              label="Secondary Turns"
              symbol="N₂"
              value={turnsSecondary}
              onChange={setTurnsSecondary}
              units={[{ value: '', label: 'Turns' }]}
              selectedUnit=""
            />
            <InputField
              label="Primary Voltage"
              symbol="V₁"
              value={voltagePrimary}
              onChange={setVoltagePrimary}
              units={[{ value: 'V', label: 'Volts (V)' }]}
              selectedUnit="V"
            />
            <InputField
              label="Primary Current"
              symbol="I₁"
              value={currentPrimary}
              onChange={setCurrentPrimary}
              units={[{ value: 'A', label: 'Amperes (A)' }]}
              selectedUnit="A"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Turns Ratio"
              symbol="N₂/N₁"
              value={turnsRatio}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Secondary Voltage"
              symbol="V₂"
              value={voltageSecondary}
              unit="V"
              sigFigs={4}
            />
            <OutputField
              label="Secondary Current"
              symbol="I₂"
              value={currentSecondary}
              unit="A"
              sigFigs={4}
            />
            <OutputField
              label="Primary Power"
              symbol="P₁"
              value={powerPrimary}
              unit="W"
              sigFigs={4}
            />
            <OutputField
              label="Secondary Power"
              symbol="P₂"
              value={powerSecondary}
              unit="W"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="\\frac{V_2}{V_1} = \\frac{N_2}{N_1}, \\quad \\frac{I_2}{I_1} = \\frac{N_1}{N_2}, \\quad P_1 = P_2" />
        }
        steps={(hasVoltage || hasCurrent) ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the turns ratio:',
                formula: '\\frac{N_2}{N_1}',
                substitution: `\\frac{${turnsSecondary}}{${turnsPrimary}}`,
                result: `Turns ratio = ${turnsRatio}`
              },
              ...(hasVoltage ? [
                {
                  description: 'Calculate secondary voltage:',
                  formula: 'V_2 = V_1 \\cdot \\frac{N_2}{N_1}',
                  substitution: `V_2 = ${voltagePrimary} \\cdot ${turnsRatio}`,
                  result: `V_2 = ${voltageSecondary}\\text{ V}`
                }
              ] : []),
              ...(hasCurrent ? [
                {
                  description: 'Calculate secondary current:',
                  formula: 'I_2 = I_1 \\cdot \\frac{N_1}{N_2}',
                  substitution: `I_2 = ${currentPrimary} \\cdot \\frac{1}{${turnsRatio}}`,
                  result: `I_2 = ${currentSecondary}\\text{ A}`
                }
              ] : []),
              ...(powerPrimary ? [
                {
                  description: 'Calculate power (ideal transformer):',
                  formula: 'P_1 = V_1 I_1, \\quad P_2 = V_2 I_2',
                  substitution: `P_1 = ${voltagePrimary} \\cdot ${currentPrimary}, \\quad P_2 = ${voltageSecondary} \\cdot ${currentSecondary}`,
                  result: `P_1 = ${powerPrimary}\\text{ W}, \\quad P_2 = ${powerSecondary}\\text{ W}`
                }
              ] : [])
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}