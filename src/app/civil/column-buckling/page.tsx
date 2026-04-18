"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function ColumnBucklingPage() {
  const [modulus, setModulus] = useState<number | ''>(200e9); // Pa
  const [momentInertia, setMomentInertia] = useState<number | ''>(1e-6); // m⁴
  const [length, setLength] = useState<number | ''>(2); // m
  const [radiusGyration, setRadiusGyration] = useState<number | ''>(0.02); // m

  // Calculate Euler buckling load P_cr = π² E I / L²
  const hasValues = typeof modulus === 'number' && typeof momentInertia === 'number' && typeof length === 'number' &&
                    modulus > 0 && momentInertia > 0 && length > 0;
  const bucklingLoad = hasValues ? (Math.PI ** 2 * modulus * momentInertia) / (length ** 2) : null;

  // Calculate slenderness ratio λ = L / r
  const slendernessRatio = hasValues && typeof radiusGyration === 'number' && radiusGyration > 0 ?
                           length / radiusGyration : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Column Buckling Calculator"
        description="Calculate Euler buckling load and slenderness ratio for columns."
        domainColorClass="text-civil"
        inputs={
          <>
            <InputField
              label="Young's Modulus"
              symbol="E"
              value={modulus}
              onChange={setModulus}
              units={[{ value: 'Pa', label: 'Pascals (Pa)' }]}
              selectedUnit="Pa"
            />
            <InputField
              label="Moment of Inertia"
              symbol="I"
              value={momentInertia}
              onChange={setMomentInertia}
              units={[{ value: 'm4', label: 'm⁴' }]}
              selectedUnit="m4"
            />
            <InputField
              label="Column Length"
              symbol="L"
              value={length}
              onChange={setLength}
              units={[{ value: 'm', label: 'Meters (m)' }]}
              selectedUnit="m"
            />
            <InputField
              label="Radius of Gyration"
              symbol="r"
              value={radiusGyration}
              onChange={setRadiusGyration}
              units={[{ value: 'm', label: 'Meters (m)' }]}
              selectedUnit="m"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Euler Buckling Load"
              symbol="P_cr"
              value={bucklingLoad}
              unit="N"
              sigFigs={4}
            />
            <OutputField
              label="Slenderness Ratio"
              symbol="λ"
              value={slendernessRatio}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="P_\\text{cr} = \\frac{\\pi^2 E I}{L^2}, \\quad \\lambda = \\frac{L}{r}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the Euler buckling load:',
                formula: 'P_\\text{cr} = \\frac{\\pi^2 E I}{L^2}',
                substitution: `P_\\text{cr} = \\frac{\\pi^2 \\cdot ${modulus} \\cdot ${momentInertia}}{${length}^2}`,
                result: `P_\\text{cr} = ${bucklingLoad}\\text{ N}`
              },
              ...(slendernessRatio ? [
                {
                  description: 'Calculate the slenderness ratio:',
                  formula: '\\lambda = \\frac{L}{r}',
                  substitution: `\\lambda = \\frac{${length}}{${radiusGyration}}`,
                  result: `\\lambda = ${slendernessRatio}`
                }
              ] : [])
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}