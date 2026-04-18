"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function RLCCircuitPage() {
  const [resistance, setResistance] = useState<number | ''>(10); // Ω
  const [inductance, setInductance] = useState<number | ''>(0.01); // H
  const [capacitance, setCapacitance] = useState<number | ''>(0.001); // F
  const [frequency, setFrequency] = useState<number | ''>(100); // Hz

  // Calculate resonant frequency ω₀ = 1/sqrt(LC)
  const hasValues = typeof resistance === 'number' && typeof inductance === 'number' && typeof capacitance === 'number' && typeof frequency === 'number';
  const omega0 = hasValues ? 1 / Math.sqrt(inductance * capacitance) : null;
  const resonantFreq = omega0 ? omega0 / (2 * Math.PI) : null;

  // Calculate Q factor Q = ω₀ L / R
  const qFactor = hasValues && omega0 ? (omega0 * inductance) / resistance : null;

  // Calculate angular frequency ω = 2πf
  const omega = hasValues ? 2 * Math.PI * frequency : null;

  // Calculate impedance Z = sqrt(R² + (ωL - 1/(ωC))²)
  const impedance = hasValues && omega ? Math.sqrt(resistance ** 2 + (omega * inductance - 1 / (omega * capacitance)) ** 2) : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="RLC Circuit Calculator"
        description="Calculate resonant frequency, Q factor, and impedance for RLC circuits."
        domainColorClass="text-electrical"
        inputs={
          <>
            <InputField
              label="Resistance"
              symbol="R"
              value={resistance}
              onChange={setResistance}
              units={[{ value: 'Ω', label: 'Ohms (Ω)' }]}
              selectedUnit="Ω"
            />
            <InputField
              label="Inductance"
              symbol="L"
              value={inductance}
              onChange={setInductance}
              units={[{ value: 'H', label: 'Henrys (H)' }]}
              selectedUnit="H"
            />
            <InputField
              label="Capacitance"
              symbol="C"
              value={capacitance}
              onChange={setCapacitance}
              units={[{ value: 'F', label: 'Farads (F)' }]}
              selectedUnit="F"
            />
            <InputField
              label="Frequency"
              symbol="f"
              value={frequency}
              onChange={setFrequency}
              units={[{ value: 'Hz', label: 'Hertz (Hz)' }]}
              selectedUnit="Hz"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Resonant Angular Frequency"
              symbol="ω₀"
              value={omega0}
              unit="rad/s"
              sigFigs={4}
            />
            <OutputField
              label="Resonant Frequency"
              symbol="f₀"
              value={resonantFreq}
              unit="Hz"
              sigFigs={4}
            />
            <OutputField
              label="Quality Factor"
              symbol="Q"
              value={qFactor}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Impedance"
              symbol="Z"
              value={impedance}
              unit="Ω"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="\\omega_0 = \\frac{1}{\\sqrt{L C}}, \\quad Q = \\frac{\\omega_0 L}{R}, \\quad Z = \\sqrt{R^2 + \\left(\\omega L - \\frac{1}{\\omega C}\\right)^2}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the resonant angular frequency:',
                formula: '\\omega_0 = \\frac{1}{\\sqrt{L C}}',
                substitution: `\\omega_0 = \\frac{1}{\\sqrt{${inductance} \\cdot ${capacitance}}}`,
                result: `\\omega_0 = ${omega0}\\text{ rad/s}`
              },
              {
                description: 'Calculate the resonant frequency:',
                formula: 'f_0 = \\frac{\\omega_0}{2\\pi}',
                substitution: `f_0 = \\frac{${omega0}}{2\\pi}`,
                result: `f_0 = ${resonantFreq}\\text{ Hz}`
              },
              {
                description: 'Calculate the quality factor:',
                formula: 'Q = \\frac{\\omega_0 L}{R}',
                substitution: `Q = \\frac{${omega0} \\cdot ${inductance}}{${resistance}}`,
                result: `Q = ${qFactor}`
              },
              {
                description: 'Calculate the impedance:',
                formula: 'Z = \\sqrt{R^2 + \\left(\\omega L - \\frac{1}{\\omega C}\\right)^2}',
                substitution: `Z = \\sqrt{${resistance}^2 + \\left(${omega} \\cdot ${inductance} - \\frac{1}{${omega} \\cdot ${capacitance}}\\right)^2}`,
                result: `Z = ${impedance}\\text{ Ω}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}