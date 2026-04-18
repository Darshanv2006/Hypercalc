"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function LEDResistorPage() {
  const [supplyVoltage, setSupplyVoltage] = useState<number | ''>(5); // V
  const [forwardVoltage, setForwardVoltage] = useState<number | ''>(2); // V
  const [forwardCurrent, setForwardCurrent] = useState<number | ''>(0.02); // A

  // Calculate resistor value R = (V_supply - V_f) / I_f
  const hasValues = typeof supplyVoltage === 'number' && typeof forwardVoltage === 'number' && typeof forwardCurrent === 'number' &&
                    supplyVoltage > forwardVoltage && forwardCurrent > 0;
  const resistorValue = hasValues ? (supplyVoltage - forwardVoltage) / forwardCurrent : null;

  // Calculate power in resistor P = I² R
  const powerResistor = hasValues ? (forwardCurrent as number) ** 2 * (resistorValue as number) : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="LED Resistor Calculator"
        description="Calculate the resistor value needed for an LED circuit."
        domainColorClass="text-electrical"
        inputs={
          <>
            <InputField
              label="Supply Voltage"
              symbol="V_s"
              value={supplyVoltage}
              onChange={setSupplyVoltage}
              units={[{ value: 'V', label: 'Volts (V)' }]}
              selectedUnit="V"
            />
            <InputField
              label="LED Forward Voltage"
              symbol="V_f"
              value={forwardVoltage}
              onChange={setForwardVoltage}
              units={[{ value: 'V', label: 'Volts (V)' }]}
              selectedUnit="V"
            />
            <InputField
              label="LED Forward Current"
              symbol="I_f"
              value={forwardCurrent}
              onChange={setForwardCurrent}
              units={[{ value: 'A', label: 'Amperes (A)' }]}
              selectedUnit="A"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Resistor Value"
              symbol="R"
              value={resistorValue}
              unit="Ω"
              sigFigs={4}
            />
            <OutputField
              label="Resistor Power Rating"
              symbol="P"
              value={powerResistor}
              unit="W"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="R = \\frac{V_s - V_f}{I_f}, \\quad P = I_f^2 R" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the resistor value:',
                formula: 'R = \\frac{V_s - V_f}{I_f}',
                substitution: `R = \\frac{${supplyVoltage} - ${forwardVoltage}}{${forwardCurrent}}`,
                result: `R = ${resistorValue}\\text{ Ω}`
              },
              {
                description: 'Calculate the power dissipated in the resistor:',
                formula: 'P = I_f^2 R',
                substitution: `P = ${forwardCurrent}^2 \\cdot ${resistorValue}`,
                result: `P = ${powerResistor}\\text{ W}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}