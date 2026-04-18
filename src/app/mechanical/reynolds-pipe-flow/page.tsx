"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function ReynoldsPipeFlowPage() {
  const [density, setDensity] = useState<number | ''>(1000);
  const [viscosity, setViscosity] = useState<number | ''>(0.001);
  const [diameter, setDiameter] = useState<number | ''>(0.05);
  const [velocity, setVelocity] = useState<number | ''>(1);

  // Calculate Reynolds number: Re = ρ V D / μ
  const hasValues = typeof density === 'number' && typeof viscosity === 'number' && typeof diameter === 'number' && typeof velocity === 'number' &&
                    density > 0 && viscosity > 0 && diameter > 0 && velocity >= 0;
  const reynolds = hasValues ? (density * velocity * diameter) / viscosity : null;

  let flowRegime = '';
  if (reynolds !== null) {
    if (reynolds < 2300) flowRegime = 'Laminar';
    else if (reynolds > 4000) flowRegime = 'Turbulent';
    else flowRegime = 'Transitional';
  }

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Reynolds Number & Pipe Flow Calculator"
        description="Calculate Reynolds number and determine flow regime in pipes."
        domainColorClass="text-mechanical"
        inputs={
          <>
            <InputField
              label="Fluid Density"
              symbol="ρ"
              value={density}
              onChange={setDensity}
              min={0.001}
              units={[{ value: 'kg/m3', label: 'kg/m³' }]}
              selectedUnit="kg/m3"
            />
            <InputField
              label="Dynamic Viscosity"
              symbol="μ"
              value={viscosity}
              onChange={setViscosity}
              min={0.000001}
              units={[{ value: 'Pa.s', label: 'Pa·s' }]}
              selectedUnit="Pa.s"
            />
            <InputField
              label="Pipe Diameter"
              symbol="D"
              value={diameter}
              onChange={setDiameter}
              min={0.0001}
              units={[{ value: 'm', label: 'Meters (m)' }]}
              selectedUnit="m"
            />
            <InputField
              label="Flow Velocity"
              symbol="V"
              value={velocity}
              onChange={setVelocity}
              min={0}
              units={[{ value: 'm/s', label: 'm/s' }]}
              selectedUnit="m/s"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Reynolds Number"
              symbol="Re"
              value={reynolds}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Flow Regime"
              value={flowRegime}
              unit=""
            />
          </>
        }
        formula={
          <FormulaDisplay formula="Re = \\frac{\\rho V D}{\\mu}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Using the Reynolds number formula:',
                formula: 'Re = \\frac{\\rho V D}{\\mu}'
              },
              {
                description: 'Substitute the given values:',
                substitution: `Re = \\frac{${density} \\cdot ${velocity} \\cdot ${diameter}}{${viscosity}}`
              },
              {
                description: 'Calculate the Reynolds number:',
                result: `Re = ${reynolds}`
              },
              {
                description: 'Determine flow regime:',
                result: flowRegime === 'Laminar' ? 'Re < 2300: Laminar flow' : flowRegime === 'Turbulent' ? 'Re > 4000: Turbulent flow' : '2300 ≤ Re ≤ 4000: Transitional flow'
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}