"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function ReynoldsNumberChemicalPage() {
  const [density, setDensity] = useState<number | ''>(800); // kg/m³ for organic liquids
  const [viscosity, setViscosity] = useState<number | ''>(0.002); // Pa·s
  const [diameter, setDiameter] = useState<number | ''>(0.05); // m
  const [velocity, setVelocity] = useState<number | ''>(1); // m/s

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
        title="Reynolds Number Calculator (Chemical)"
        description="Calculate Reynolds number for fluid flow in chemical engineering applications."
        domainColorClass="text-chemical"
        inputs={
          <>
            <InputField
              label="Fluid Density"
              symbol="ρ"
              value={density}
              onChange={setDensity}
              min={0.001}
              units={[
                { value: '800', label: 'Organic liquid (~800 kg/m³)' },
                { value: '1000', label: 'Water (1000 kg/m³)' },
                { value: 'custom', label: 'Custom' }
              ]}
              selectedUnit="800"
            />
            <InputField
              label="Dynamic Viscosity"
              symbol="μ"
              value={viscosity}
              onChange={setViscosity}
              min={0.000001}
              units={[
                { value: '0.001', label: 'Water (0.001 Pa·s)' },
                { value: '0.002', label: 'Light oil (0.002 Pa·s)' },
                { value: '0.1', label: 'Heavy oil (0.1 Pa·s)' },
                { value: 'custom', label: 'Custom' }
              ]}
              selectedUnit="0.002"
            />
            <InputField
              label="Characteristic Diameter"
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
              className={flowRegime === 'Laminar' ? "text-green-600" : flowRegime === 'Turbulent' ? "text-red-600" : "text-yellow-600"}
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
                description: 'Determine flow regime based on Re value:',
                result: reynolds! < 2300 ? 'Re < 2300: Laminar flow' : reynolds! > 4000 ? 'Re > 4000: Turbulent flow' : '2300 ≤ Re ≤ 4000: Transitional flow'
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}