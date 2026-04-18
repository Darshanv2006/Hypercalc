"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function ShaftDesignPage() {
  const [torque, setTorque] = useState<number | ''>(100); // N·m
  const [radius, setRadius] = useState<number | ''>(0.025); // m
  const [length, setLength] = useState<number | ''>(1); // m
  const [shearModulus, setShearModulus] = useState<number | ''>(80e9); // Pa

  // Calculate polar moment of inertia J = π r⁴ / 2 for solid shaft
  const hasValues = typeof torque === 'number' && typeof radius === 'number' && typeof length === 'number' && typeof shearModulus === 'number' &&
                    torque > 0 && radius > 0 && length > 0 && shearModulus > 0;
  const polarMoment = hasValues ? (Math.PI * Math.pow(radius, 4)) / 2 : null;
  const maxShearStress = hasValues ? (torque * radius) / (polarMoment as number) : null;
  const angleOfTwist = hasValues ? (torque * length) / (shearModulus * (polarMoment as number)) : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Shaft Design Calculator"
        description="Calculate torsional shear stress and angle of twist for shaft design."
        domainColorClass="text-mechanical"
        inputs={
          <>
            <InputField
              label="Torque"
              symbol="T"
              value={torque}
              onChange={setTorque}
              units={[{ value: 'Nm', label: 'N·m' }]}
              selectedUnit="Nm"
            />
            <InputField
              label="Shaft Radius"
              symbol="r"
              value={radius}
              onChange={setRadius}
              units={[{ value: 'm', label: 'm' }]}
              selectedUnit="m"
            />
            <InputField
              label="Shaft Length"
              symbol="L"
              value={length}
              onChange={setLength}
              units={[{ value: 'm', label: 'm' }]}
              selectedUnit="m"
            />
            <InputField
              label="Shear Modulus"
              symbol="G"
              value={shearModulus}
              onChange={setShearModulus}
              units={[{ value: 'Pa', label: 'Pa' }]}
              selectedUnit="Pa"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Polar Moment of Inertia"
              symbol="J"
              value={polarMoment}
              unit="m⁴"
              sigFigs={6}
            />
            <OutputField
              label="Maximum Shear Stress"
              symbol="τ_max"
              value={maxShearStress}
              unit="Pa"
              sigFigs={4}
            />
            <OutputField
              label="Angle of Twist"
              symbol="θ"
              value={angleOfTwist}
              unit="rad"
              sigFigs={6}
            />
            <OutputField
              label="Angle of Twist (degrees)"
              symbol="θ"
              value={angleOfTwist ? angleOfTwist * (180 / Math.PI) : null}
              unit="°"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="J = \\frac{\\pi r^4}{2}, \\quad \\tau_\\text{max} = \\frac{T r}{J}, \\quad \\theta = \\frac{T L}{G J}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the polar moment of inertia for a solid shaft:',
                formula: 'J = \\frac{\\pi r^4}{2}',
                substitution: `J = \\frac{\\pi \\cdot ${radius}^4}{2}`,
                result: `J = ${polarMoment}\\text{ m}^4`
              },
              {
                description: 'Calculate the maximum shear stress:',
                formula: '\\tau_\\text{max} = \\frac{T r}{J}',
                substitution: `\\tau_\\text{max} = \\frac{${torque} \\cdot ${radius}}{${polarMoment}}`,
                result: `\\tau_\\text{max} = ${maxShearStress}\\text{ Pa}`
              },
              {
                description: 'Calculate the angle of twist:',
                formula: '\\theta = \\frac{T L}{G J}',
                substitution: `\\theta = \\frac{${torque} \\cdot ${length}}{${shearModulus} \\cdot ${polarMoment}}`,
                result: `\\theta = ${angleOfTwist}\\text{ rad}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}