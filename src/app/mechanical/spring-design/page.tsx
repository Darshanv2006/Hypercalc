"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function SpringDesignPage() {
  const [wireDiameter, setWireDiameter] = useState<number | ''>(0.005); // m
  const [coilDiameter, setCoilDiameter] = useState<number | ''>(0.05); // m
  const [numCoils, setNumCoils] = useState<number | ''>(10);
  const [shearModulus, setShearModulus] = useState<number | ''>(80e9); // Pa
  const [maxForce, setMaxForce] = useState<number | ''>(100); // N

  // Calculate spring index C = D/d
  const springIndex = (typeof coilDiameter === 'number' && typeof wireDiameter === 'number' && wireDiameter > 0) ?
                      coilDiameter / wireDiameter : null;

  // Calculate spring constant k = G d⁴ / (8 D³ n)
  const hasValues = typeof wireDiameter === 'number' && typeof coilDiameter === 'number' && typeof numCoils === 'number' && typeof shearModulus === 'number' && typeof maxForce === 'number' &&
                    wireDiameter > 0 && coilDiameter > 0 && numCoils > 0 && shearModulus > 0 && maxForce > 0;
  const springConstant = hasValues ? (shearModulus * Math.pow(wireDiameter, 4)) / (8 * Math.pow(coilDiameter, 3) * numCoils) : null;

  // Max deflection δ = F / k
  const maxDeflection = hasValues ? maxForce / (springConstant as number) : null;

  // Max shear stress τ = (8 F D) / (π d³) * (C+1)/(C-1) approx
  const stressCorrection = springIndex ? (springIndex + 1) / (springIndex - 1) : 1;
  const maxShearStress = hasValues ? (8 * maxForce * coilDiameter) / (Math.PI * Math.pow(wireDiameter, 3)) * stressCorrection : null;

  // Factor of safety (assuming allowable stress, but for demo, use a value)
  const allowableStress = 500e6; // Pa, example
  const factorOfSafety = maxShearStress ? allowableStress / maxShearStress : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Spring Design Calculator"
        description="Calculate spring constant, deflection, and factor of safety using Hooke's law."
        domainColorClass="text-mechanical"
        inputs={
          <>
            <InputField
              label="Wire Diameter"
              symbol="d"
              value={wireDiameter}
              onChange={setWireDiameter}
              units={[{ value: 'm', label: 'm' }]}
              selectedUnit="m"
            />
            <InputField
              label="Mean Coil Diameter"
              symbol="D"
              value={coilDiameter}
              onChange={setCoilDiameter}
              units={[{ value: 'm', label: 'm' }]}
              selectedUnit="m"
            />
            <InputField
              label="Number of Coils"
              symbol="n"
              value={numCoils}
              onChange={setNumCoils}
              units={[{ value: '', label: 'Coils' }]}
              selectedUnit=""
            />
            <InputField
              label="Shear Modulus"
              symbol="G"
              value={shearModulus}
              onChange={setShearModulus}
              units={[{ value: 'Pa', label: 'Pa' }]}
              selectedUnit="Pa"
            />
            <InputField
              label="Maximum Force"
              symbol="F"
              value={maxForce}
              onChange={setMaxForce}
              units={[{ value: 'N', label: 'N' }]}
              selectedUnit="N"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Spring Index"
              symbol="C"
              value={springIndex}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Spring Constant"
              symbol="k"
              value={springConstant}
              unit="N/m"
              sigFigs={4}
            />
            <OutputField
              label="Maximum Deflection"
              symbol="δ"
              value={maxDeflection}
              unit="m"
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
              label="Factor of Safety"
              symbol="n"
              value={factorOfSafety}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="C = \\frac{D}{d}, \\quad k = \\frac{G d^4}{8 D^3 n}, \\quad \\delta = \\frac{F}{k}, \\quad \\tau_\\text{max} = \\frac{8 F D}{\\pi d^3} \\cdot \\frac{C+1}{C-1}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the spring index:',
                formula: 'C = \\frac{D}{d}',
                substitution: `C = \\frac{${coilDiameter}}{${wireDiameter}}`,
                result: `C = ${springIndex}`
              },
              {
                description: 'Calculate the spring constant:',
                formula: 'k = \\frac{G d^4}{8 D^3 n}',
                substitution: `k = \\frac{${shearModulus} \\cdot ${wireDiameter}^4}{8 \\cdot ${coilDiameter}^3 \\cdot ${numCoils}}`,
                result: `k = ${springConstant}\\text{ N/m}`
              },
              {
                description: 'Calculate the maximum deflection:',
                formula: '\\delta = \\frac{F}{k}',
                substitution: `\\delta = \\frac{${maxForce}}{${springConstant}}`,
                result: `\\delta = ${maxDeflection}\\text{ m}`
              },
              {
                description: 'Calculate the maximum shear stress:',
                formula: '\\tau_\\text{max} = \\frac{8 F D}{\\pi d^3} \\cdot \\frac{C+1}{C-1}',
                substitution: `\\tau_\\text{max} = \\frac{8 \\cdot ${maxForce} \\cdot ${coilDiameter}}{\\pi \\cdot ${wireDiameter}^3} \\cdot \\frac{${springIndex}+1}{${springIndex}-1}`,
                result: `\\tau_\\text{max} = ${maxShearStress}\\text{ Pa}`
              },
              {
                description: 'Calculate the factor of safety (assuming allowable stress of 500 MPa):',
                formula: 'n = \\frac{\\tau_\\text{allow}}{\\tau_\\text{max}}',
                substitution: `n = \\frac{500 \\times 10^6}{${maxShearStress}}`,
                result: `n = ${factorOfSafety}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}