"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function GearRatioPage() {
  const [gearRatio, setGearRatio] = useState<number | ''>(2);
  const [inputSpeed, setInputSpeed] = useState<number | ''>(1000);
  const [inputTorque, setInputTorque] = useState<number | ''>(50);
  const [efficiency, setEfficiency] = useState<number | ''>(0.95);

  // Calculate outputs
  const hasValues = typeof gearRatio === 'number' && typeof inputSpeed === 'number' && typeof inputTorque === 'number' && typeof efficiency === 'number' &&
                    gearRatio > 0 && efficiency > 0 && efficiency <= 1;
  const outputSpeed = hasValues ? inputSpeed / gearRatio : null;
  const outputTorque = hasValues ? inputTorque * gearRatio * efficiency : null;
  const outputPower = hasValues ? (outputTorque as number) * ((outputSpeed as number) * Math.PI / 30) : null; // assuming rpm to rad/s

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Gear Ratio Calculator"
        description="Calculate speed, torque, and power ratios in gear systems."
        domainColorClass="text-mechanical"
        inputs={
          <>
            <InputField
              label="Gear Ratio"
              symbol="r"
              value={gearRatio}
              onChange={setGearRatio}
              units={[{ value: '', label: 'Ratio' }]}
              selectedUnit=""
              helperText="Driven teeth / Driver teeth"
            />
            <InputField
              label="Input Speed"
              symbol="ω₁"
              value={inputSpeed}
              onChange={setInputSpeed}
              units={[{ value: 'rpm', label: 'RPM' }]}
              selectedUnit="rpm"
            />
            <InputField
              label="Input Torque"
              symbol="τ₁"
              value={inputTorque}
              onChange={setInputTorque}
              units={[{ value: 'Nm', label: 'N·m' }]}
              selectedUnit="Nm"
            />
            <InputField
              label="Efficiency"
              symbol="η"
              value={efficiency}
              onChange={setEfficiency}
              units={[{ value: '', label: 'Decimal' }]}
              selectedUnit=""
              helperText="0.8 to 1.0"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Output Speed"
              symbol="ω₂"
              value={outputSpeed}
              unit="rpm"
              sigFigs={4}
            />
            <OutputField
              label="Output Torque"
              symbol="τ₂"
              value={outputTorque}
              unit="N·m"
              sigFigs={4}
            />
            <OutputField
              label="Output Power"
              symbol="P₂"
              value={outputPower}
              unit="W"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="\\omega_2 = \\frac{\\omega_1}{r}, \\quad \\tau_2 = \\tau_1 \\cdot r \\cdot \\eta, \\quad P_2 = \\tau_2 \\cdot \\omega_2" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate output speed:',
                formula: '\\omega_2 = \\frac{\\omega_1}{r}',
                substitution: `\\omega_2 = \\frac{${inputSpeed}}{${gearRatio}}`,
                result: `\\omega_2 = ${outputSpeed}\\text{ rpm}`
              },
              {
                description: 'Calculate output torque (accounting for efficiency):',
                formula: '\\tau_2 = \\tau_1 \\cdot r \\cdot \\eta',
                substitution: `\\tau_2 = ${inputTorque} \\cdot ${gearRatio} \\cdot ${efficiency}`,
                result: `\\tau_2 = ${outputTorque}\\text{ N·m}`
              },
              {
                description: 'Calculate output power:',
                formula: 'P_2 = \\tau_2 \\cdot \\omega_2',
                substitution: `P_2 = ${outputTorque} \\cdot ${outputSpeed} \\cdot \\frac{\\pi}{30}`,
                result: `P_2 = ${outputPower}\\text{ W}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}