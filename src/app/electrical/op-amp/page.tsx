"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

type OpAmpType = 'inverting' | 'non-inverting';

export default function OpAmpPage() {
  const [type, setType] = useState<OpAmpType>('inverting');
  const [rin, setRin] = useState<number | ''>(1000); // Ω
  const [rf, setRf] = useState<number | ''>(10000); // Ω
  const [vin, setVin] = useState<number | ''>(1); // V

  // Calculate gain and output
  const hasValues = typeof rin === 'number' && typeof rf === 'number' && typeof vin === 'number' && rin > 0;
  const gain = hasValues ? (type === 'inverting' ? -rf / rin : 1 + rf / rin) : null;
  const vout = hasValues ? (gain as number) * (vin as number) : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Op-Amp Calculator"
        description={`Calculate gain and output voltage for ${type} op-amp configurations.`}
        domainColorClass="text-electrical"
        inputs={
          <>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-text-secondary mb-2">Configuration</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as OpAmpType)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border"
              >
                <option value="inverting">Inverting Amplifier</option>
                <option value="non-inverting">Non-Inverting Amplifier</option>
              </select>
            </div>
            <InputField
              label="Input Resistor"
              symbol="R_in"
              value={rin}
              onChange={setRin}
              units={[{ value: 'Ω', label: 'Ohms (Ω)' }]}
              selectedUnit="Ω"
            />
            <InputField
              label="Feedback Resistor"
              symbol="R_f"
              value={rf}
              onChange={setRf}
              units={[{ value: 'Ω', label: 'Ohms (Ω)' }]}
              selectedUnit="Ω"
            />
            <InputField
              label="Input Voltage"
              symbol="V_in"
              value={vin}
              onChange={setVin}
              units={[{ value: 'V', label: 'Volts (V)' }]}
              selectedUnit="V"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Voltage Gain"
              symbol="A_v"
              value={gain}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Output Voltage"
              symbol="V_out"
              value={vout}
              unit="V"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula={
            type === 'inverting' ?
            "A_v = -\\frac{R_f}{R_{in}}, \\quad V_{out} = A_v V_{in}" :
            "A_v = 1 + \\frac{R_f}{R_{in}}, \\quad V_{out} = A_v V_{in}"
          } />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: `Calculate the voltage gain for ${type} configuration:`,
                formula: type === 'inverting' ? 'A_v = -\\frac{R_f}{R_{in}}' : 'A_v = 1 + \\frac{R_f}{R_{in}}',
                substitution: type === 'inverting' ? `A_v = -\\frac{${rf}}{${rin}}` : `A_v = 1 + \\frac{${rf}}{${rin}}`,
                result: `A_v = ${gain}`
              },
              {
                description: 'Calculate the output voltage:',
                formula: 'V_{out} = A_v V_{in}',
                substitution: `V_{out} = ${gain} \\cdot ${vin}`,
                result: `V_{out} = ${vout}\\text{ V}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}