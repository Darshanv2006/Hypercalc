"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function PipeFlowHeadLossPage() {
  const [frictionFactor, setFrictionFactor] = useState<number | ''>(0.02); // Darcy friction factor
  const [length, setLength] = useState<number | ''>(100); // m
  const [diameter, setDiameter] = useState<number | ''>(0.1); // m
  const [velocity, setVelocity] = useState<number | ''>(2); // m/s
  const [gravity, setGravity] = useState<number | ''>(9.81); // m/s²

  // Calculate head loss using Darcy-Weisbach equation: h_f = f * (L/D) * (V²/(2g))
  const hasValues = typeof frictionFactor === 'number' && typeof length === 'number' &&
                   typeof diameter === 'number' && typeof velocity === 'number' &&
                   typeof gravity === 'number' &&
                   frictionFactor > 0 && length > 0 && diameter > 0 && velocity >= 0 && gravity > 0;

  let headLoss: number | null = null;
  let pressureDrop: number | null = null; // Assuming water density = 1000 kg/m³

  if (hasValues) {
    headLoss = frictionFactor * (length / diameter) * (Math.pow(velocity, 2) / (2 * gravity));
    // Pressure drop = ρ * g * h_f (for water, ρ = 1000 kg/m³)
    pressureDrop = 1000 * gravity * headLoss; // Pascals
  }

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Pipe Flow Head Loss Calculator (Darcy-Weisbach)"
        description="Calculate head loss and pressure drop in circular pipes using the Darcy-Weisbach equation."
        domainColorClass="text-civil"
        inputs={
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <InputField
                  label="Darcy Friction Factor"
                  symbol="f"
                  value={frictionFactor}
                  onChange={setFrictionFactor}
                  units={[{ value: '0.02', label: 'Typical (0.02)' }, { value: 'custom', label: 'Custom Value' }]}
                  selectedUnit="0.02"
                />
              </div>
              <div>
                <InputField
                  label="Pipe Length"
                  symbol="L"
                  value={length}
                  onChange={setLength}
                  units={[{ value: 'm', label: 'Meters (m)' }]}
                  selectedUnit="m"
                />
              </div>
              <div>
                <InputField
                  label="Pipe Diameter"
                  symbol="D"
                  value={diameter}
                  onChange={setDiameter}
                  units={[{ value: 'm', label: 'Meters (m)' }]}
                  selectedUnit="m"
                />
              </div>
              <div>
                <InputField
                  label="Flow Velocity"
                  symbol="V"
                  value={velocity}
                  onChange={setVelocity}
                  units={[{ value: 'm/s', label: 'm/s' }]}
                  selectedUnit="m/s"
                />
              </div>
              <div>
                <InputField
                  label="Gravity Acceleration"
                  symbol="g"
                  value={gravity}
                  onChange={setGravity}
                  units={[{ value: '9.81', label: 'Earth (9.81 m/s²)' }, { value: 'custom', label: 'Custom' }]}
                  selectedUnit="9.81"
                />
              </div>
            </div>
          </>
        }
        outputs={
          <>
            <div className="space-y-4">
              <OutputField
                label="Head Loss"
                symbol="h_f"
                value={headLoss}
                unit="m"
                sigFigs={4}
              />
              <OutputField
                label="Head Loss in mm"
                symbol="h_f"
                value={headLoss ? headLoss * 1000 : null}
                unit="mm"
                sigFigs={1}
              />
              {pressureDrop !== null && (
                <>
                  <OutputField
                    label="Pressure Drop"
                    symbol="ΔP"
                    value={pressureDrop}
                    unit="Pa"
                    sigFigs={1}
                  />
                  <OutputField
                    label="Pressure Drop in kPa"
                    symbol="ΔP"
                    value={pressureDrop / 1000}
                    unit="kPa"
                    sigFigs={4}
                  />
                 </>
               )}
             </div>
           </>
        }
        formula={
          <FormulaDisplay formula="h_f = f \\cdot \\frac{L}{D} \\cdot \\frac{V^2}{2g}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Using the Darcy-Weisbach equation for head loss:',
                formula: 'h_f = f \\cdot \\frac{L}{D} \\cdot \\frac{V^2}{2g}'
              },
              {
                description: 'Substitute the given values:',
                substitution: `h_f = ${frictionFactor} \\cdot \\frac{${length}}{${diameter}} \\cdot \\frac{${velocity}^2}{2 \\times ${gravity}}`
              },
              {
                description: 'Calculate intermediate values:',
                result: `\\frac{L}{D} = \\frac{${length}}{${diameter}} = ${(length! / diameter!).toFixed(2)}\\quad\\frac{V^2}{2g} = \\frac{${velocity!}^2}{2 \\times ${gravity!}} = ${((velocity! * velocity!) / (2 * gravity!)).toFixed(6)}`
              },
              {
                description: 'Calculate the final head loss:',
                result: `h_f = ${frictionFactor} \\times ${(length! / diameter!).toFixed(2)} \\times ${((velocity! * velocity!) / (2 * gravity!)).toFixed(6)} = ${headLoss?.toFixed(4)}\\,\\text{m}`
              },
              {
                description: 'Convert head loss to pressure drop (for water, ρ = 1000 kg/m³):',
                formula: 'ΔP = ρ g h_f'
              },
              {
                description: 'Substitute values:',
                substitution: `ΔP = 1000 \\times ${gravity} \\times ${headLoss?.toFixed(4)} = ${pressureDrop?.toFixed(0)}\\,\\text{Pa} = ${(pressureDrop! / 1000).toFixed(2)}\\,\\text{kPa}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}