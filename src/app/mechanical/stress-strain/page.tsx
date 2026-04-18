"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep, GraphPanel
} from '@/components/calculator';

export default function StressStrainPage() {
  const [force, setForce] = useState<number | ''>(10000);
  const [area, setArea] = useState<number | ''>(0.01);
  const [displacement, setDisplacement] = useState<number | ''>(0.001);
  const [length, setLength] = useState<number | ''>(0.1);

  // Calculate Stress: sigma = F / A
  const hasStressValues = typeof force === 'number' && typeof area === 'number' && area > 0;
  const stress = hasStressValues ? force / area : null;

  // Calculate Strain: epsilon = delta / L
  const hasStrainValues = typeof displacement === 'number' && typeof length === 'number' && length > 0;
  const strain = hasStrainValues ? displacement / length : null;

  // Calculate Young's Modulus: E = sigma / epsilon
  const hasModulusValues = stress !== null && strain !== null && strain > 0;
  const modulus = hasModulusValues ? (stress as number) / (strain as number) : null;

  // Graph Data (Stress vs Strain)
  const graphData = hasModulusValues ? Array.from({ length: 11 }, (_, i) => {
    const e = (strain as number) * (i / 10);
    return {
      x: parseFloat(e.toFixed(6)),
      y: parseFloat((e * (modulus as number)).toFixed(2))
    };
  }) : [];

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Stress & Strain Calculator"
        description="Calculate stress, strain, and Young's modulus for a material under axial loading."
        domainColorClass="text-mechanical"
        inputs={
          <>
            <InputField
              label="Axial Force"
              symbol="F"
              value={force}
              onChange={setForce}
              units={[{ value: 'N', label: 'Newtons (N)' }]}
              selectedUnit="N"
            />
            <InputField
              label="Cross-sectional Area"
              symbol="A"
              value={area}
              onChange={setArea}
              units={[{ value: 'm2', label: 'Sq Meters (m²)' }]}
              selectedUnit="m2"
            />
            <InputField
              label="Displacement"
              symbol="δ"
              value={displacement}
              onChange={setDisplacement}
              units={[{ value: 'm', label: 'Meters (m)' }]}
              selectedUnit="m"
            />
            <InputField
              label="Original Length"
              symbol="L"
              value={length}
              onChange={setLength}
              units={[{ value: 'm', label: 'Meters (m)' }]}
              selectedUnit="m"
            />
          </>
        }
        outputs={
          <>
             <OutputField
               label="Normal Stress"
               symbol="σ"
               value={stress}
               unit="Pa"
               sigFigs={4}
             />
             <OutputField
               label="Stress in MPa"
               symbol="σ"
               value={stress ? stress / 1e6 : null}
               unit="MPa"
               sigFigs={4}
             />
             <OutputField
               label="Strain"
               symbol="ε"
               value={strain}
               unit=""
               sigFigs={6}
             />
             <OutputField
               label="Young's Modulus"
               symbol="E"
               value={modulus}
               unit="Pa"
               sigFigs={4}
             />
          </>
        }
        formula={
          <FormulaDisplay formula="\\sigma = \\frac{F}{A}, \\quad \\varepsilon = \\frac{\\delta}{L}, \\quad E = \\frac{\\sigma}{\\varepsilon}" />
        }
        steps={(hasStressValues || hasStrainValues) ? (
          <StepByStep
            steps={[
              ...(hasStressValues ? [
                {
                  description: 'Calculate the normal stress using the formula:',
                  formula: '\\sigma = \\frac{F}{A}',
                  substitution: `\\sigma = \\frac{${force}\\text{ N}}{${area}\\text{ m}^2}`,
                  result: `\\sigma = ${stress}\\text{ Pa}`
                }
              ] : []),
              ...(hasStrainValues ? [
                {
                  description: 'Calculate the strain using the formula:',
                  formula: '\\varepsilon = \\frac{\\delta}{L}',
                  substitution: `\\varepsilon = \\frac{${displacement}\\text{ m}}{${length}\\text{ m}}`,
                  result: `\\varepsilon = ${strain}`
                }
              ] : []),
              ...(hasModulusValues ? [
                {
                  description: 'Calculate Young\'s modulus using the formula:',
                  formula: 'E = \\frac{\\sigma}{\\varepsilon}',
                  substitution: `E = \\frac{${stress}\\text{ Pa}}{${strain}}`,
                  result: `E = ${modulus}\\text{ Pa}`
                }
              ] : [])
            ]}
          />
        ) : undefined}
        graph={hasModulusValues ? (
          <GraphPanel
            title="Stress-Strain Diagram"
            data={graphData}
            xKey="x"
            xAxisLabel="Strain (ε)"
            yKey="y"
            yAxisLabel="Stress (σ) [Pa]"
            domainColor="#F59E0B"
          />
        ) : undefined}
      />
    </div>
  );
}