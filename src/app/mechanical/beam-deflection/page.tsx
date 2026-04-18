"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep, GraphPanel
} from '@/components/calculator';

export default function BeamDeflectionPage() {
  const [length, setLength] = useState<number | ''>(2);
  const [modulus, setModulus] = useState<number | ''>(200e9);
  const [inertia, setInertia] = useState<number | ''>(1e-6);
  const [force, setForce] = useState<number | ''>(1000);
  const [beamType, setBeamType] = useState<'cantilever' | 'simply-supported'>('cantilever');

  // Calculate deflection
  const hasValues = typeof length === 'number' && typeof modulus === 'number' && typeof inertia === 'number' && typeof force === 'number' &&
                    length > 0 && modulus > 0 && inertia > 0 && force > 0;

  let deflection: number | null = null;
  let formula: string = '';
  if (hasValues) {
    if (beamType === 'cantilever') {
      // Cantilever with end load: δ = F L³ / (3 E I)
      deflection = (force * Math.pow(length, 3)) / (3 * modulus * inertia);
      formula = '\\delta = \\frac{F L^3}{3 E I}';
    } else {
      // Simply supported with center load: δ = F L³ / (48 E I)
      deflection = (force * Math.pow(length, 3)) / (48 * modulus * inertia);
      formula = '\\delta = \\frac{F L^3}{48 E I}';
    }
  }

  // Graph Data (Deflection curve)
  const graphData = hasValues ? Array.from({ length: 21 }, (_, i) => {
    const x = (length! / 20) * i;
    let y: number;
    if (x <= length! / 2) {
      y = (force! / 2) * x;
    } else {
      y = (force! / 2) * (length! - x);
    }
    return { x: parseFloat(x.toFixed(3)), y: parseFloat(y.toFixed(6)) };
  }) : [];

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Beam Deflection Calculator"
        description={`Calculate the maximum deflection of a ${beamType === 'cantilever' ? 'cantilever' : 'simply supported'} beam under point load.`}
        domainColorClass="text-mechanical"
        inputs={
          <>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-text-secondary mb-2">Beam Type</label>
              <select
                value={beamType}
                onChange={(e) => setBeamType(e.target.value as 'cantilever' | 'simply-supported')}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border"
              >
                <option value="cantilever">Cantilever Beam (Fixed at one end)</option>
                <option value="simply-supported">Simply Supported Beam (Supported at both ends)</option>
              </select>
            </div>
            <InputField
              label="Beam Length"
              symbol="L"
              value={length}
              onChange={setLength}
              units={[{ value: 'm', label: 'Meters (m)' }]}
              selectedUnit="m"
            />
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
              value={inertia}
              onChange={setInertia}
              units={[{ value: 'm4', label: 'm⁴' }]}
              selectedUnit="m4"
            />
            <InputField
              label="Point Load"
              symbol="F"
              value={force}
              onChange={setForce}
              units={[{ value: 'N', label: 'Newtons (N)' }]}
              selectedUnit="N"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Maximum Deflection"
              symbol="δ"
              value={deflection}
              unit="m"
              sigFigs={6}
            />
            <OutputField
              label="Deflection in mm"
              symbol="δ"
              value={deflection ? deflection * 1000 : null}
              unit="mm"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula={formula} />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: `Using the formula for ${beamType} beam deflection:`,
                formula: formula
              },
              {
                description: 'Substitute the given values:',
                substitution: `\\delta = \\frac{${force} \\cdot ${length}^3}{${beamType === 'cantilever' ? 3 : 48} \\cdot ${modulus} \\cdot ${inertia}}`
              },
              {
                description: 'Calculate the final result:',
                result: `\\delta = ${deflection}\\text{ m}`
              }
            ]}
          />
        ) : undefined}
        graph={hasValues ? (
          <GraphPanel
            title="Beam Deflection Curve"
            data={graphData}
            xKey="x"
            xAxisLabel="Position along beam (m)"
            yKey="y"
            yAxisLabel="Deflection (m)"
            domainColor="#F59E0B"
          />
        ) : undefined}
      />
    </div>
  );
}