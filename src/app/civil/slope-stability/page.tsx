"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function SlopeStabilityPage() {
  const [cohesion, setCohesion] = useState<number | ''>(5000); // Pa
  const [unitWeight, setUnitWeight] = useState<number | ''>(18000); // N/m³
  const [height, setHeight] = useState<number | ''>(5); // m
  const [slopeAngle, setSlopeAngle] = useState<number | ''>(30); // degrees
  const [frictionAngle, setFrictionAngle] = useState<number | ''>(25); // degrees

  // Calculate factor of safety FoS = (c / (γ H sinθ)) + (tanφ / tanθ)
  const hasValues = typeof cohesion === 'number' && typeof unitWeight === 'number' && typeof height === 'number' &&
                    typeof slopeAngle === 'number' && typeof frictionAngle === 'number' &&
                    unitWeight > 0 && height > 0 && slopeAngle > 0 && frictionAngle >= 0;

  const thetaRad = hasValues ? (slopeAngle * Math.PI) / 180 : null;
  const phiRad = hasValues ? (frictionAngle * Math.PI) / 180 : null;

  const fos = hasValues && thetaRad && phiRad ?
              (cohesion / (unitWeight * height * Math.sin(thetaRad))) + (Math.tan(phiRad) / Math.tan(thetaRad)) : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Slope Stability Calculator"
        description="Calculate factor of safety for infinite slopes."
        domainColorClass="text-civil"
        inputs={
          <>
            <InputField
              label="Cohesion"
              symbol="c"
              value={cohesion}
              onChange={setCohesion}
              units={[{ value: 'Pa', label: 'Pascals (Pa)' }]}
              selectedUnit="Pa"
            />
            <InputField
              label="Unit Weight"
              symbol="γ"
              value={unitWeight}
              onChange={setUnitWeight}
              units={[{ value: 'N/m3', label: 'N/m³' }]}
              selectedUnit="N/m3"
            />
            <InputField
              label="Slope Height"
              symbol="H"
              value={height}
              onChange={setHeight}
              units={[{ value: 'm', label: 'Meters (m)' }]}
              selectedUnit="m"
            />
            <InputField
              label="Slope Angle"
              symbol="θ"
              value={slopeAngle}
              onChange={setSlopeAngle}
              units={[{ value: 'deg', label: 'Degrees (°)' }]}
              selectedUnit="deg"
            />
            <InputField
              label="Friction Angle"
              symbol="φ"
              value={frictionAngle}
              onChange={setFrictionAngle}
              units={[{ value: 'deg', label: 'Degrees (°)' }]}
              selectedUnit="deg"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Factor of Safety"
              symbol="FoS"
              value={fos}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="FoS = \\frac{c}{\\gamma H \\sin\\theta} + \\frac{\\tan\\phi}{\\tan\\theta}" />
        }
        steps={hasValues && fos ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the cohesion term:',
                formula: '\\frac{c}{\\gamma H \\sin\\theta}',
                substitution: `\\frac{${cohesion}}{${unitWeight} \\cdot ${height} \\cdot \\sin(${slopeAngle}^\\circ)}`,
                result: `${cohesion / (unitWeight * height * Math.sin(thetaRad!))}`
              },
              {
                description: 'Calculate the friction term:',
                formula: '\\frac{\\tan\\phi}{\\tan\\theta}',
                substitution: `\\frac{\\tan(${frictionAngle}^\\circ)}{\\tan(${slopeAngle}^\\circ)}`,
                result: `${Math.tan(phiRad!) / Math.tan(thetaRad!)}`
              },
              {
                description: 'Total factor of safety:',
                result: `FoS = ${fos}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}