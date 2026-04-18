"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep, GraphPanel
} from '@/components/calculator';

export default function BeamLoadMomentPage() {
  const [beamLength, setBeamLength] = useState<number | ''>(4); // m
  const [load, setLoad] = useState<number | ''>(10000); // N

  // Calculations for simply supported beam with point load at center
  const hasValues = typeof beamLength === 'number' && typeof load === 'number' && beamLength > 0 && load > 0;
  const maxShear = hasValues ? load / 2 : null;
  const maxMoment = hasValues ? (load * beamLength) / 4 : null;

  // SFD Data: Shear Force Diagram
  const sfdData = hasValues ? [
    { x: 0, y: maxShear! },
    { x: beamLength! / 2, y: maxShear! },
    { x: beamLength! / 2, y: -maxShear! },
    { x: beamLength!, y: -maxShear! }
  ] : [];

  // BMD Data: Bending Moment Diagram
  const bmdData = hasValues ? Array.from({ length: 21 }, (_, i) => {
    const x = (beamLength! / 20) * i;
    let y: number;
    if (x <= beamLength! / 2) {
      y = maxShear! * x;
    } else {
      y = maxShear! * (beamLength! - x);
    }
    return { x: parseFloat(x.toFixed(3)), y: parseFloat(y.toFixed(2)) };
  }) : [];

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Beam Load & Moment Calculator"
        description="Calculate shear force and bending moment for a simply supported beam with center load."
        domainColorClass="text-civil"
        inputs={
          <>
            <InputField
              label="Beam Length"
              symbol="L"
              value={beamLength}
              onChange={setBeamLength}
              units={[{ value: 'm', label: 'Meters (m)' }]}
              selectedUnit="m"
            />
            <InputField
              label="Point Load"
              symbol="P"
              value={load}
              onChange={setLoad}
              units={[{ value: 'N', label: 'Newtons (N)' }]}
              selectedUnit="N"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Maximum Shear Force"
              symbol="V_max"
              value={maxShear}
              unit="N"
              sigFigs={4}
            />
            <OutputField
              label="Maximum Bending Moment"
              symbol="M_max"
              value={maxMoment}
              unit="N·m"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="V_\\text{max} = \\frac{P}{2}, \\quad M_\\text{max} = \\frac{P L}{4}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the maximum shear force:',
                formula: 'V_\\text{max} = \\frac{P}{2}',
                substitution: `V_\\text{max} = \\frac{${load}}{2}`,
                result: `V_\\text{max} = ${maxShear}\\text{ N}`
              },
              {
                description: 'Calculate the maximum bending moment:',
                formula: 'M_\\text{max} = \\frac{P L}{4}',
                substitution: `M_\\text{max} = \\frac{${load} \\cdot ${beamLength}}{4}`,
                result: `M_\\text{max} = ${maxMoment}\\text{ N·m}`
              }
            ]}
          />
        ) : undefined}
        graph={hasValues ? (
          <div className="space-y-6">
            <GraphPanel
              title="Shear Force Diagram (SFD)"
              data={sfdData}
              xKey="x"
              xAxisLabel="Position along beam (m)"
              yKey="y"
              yAxisLabel="Shear Force (N)"
              domainColor="#F59E0B"
            />
            <GraphPanel
              title="Bending Moment Diagram (BMD)"
              data={bmdData}
              xKey="x"
              xAxisLabel="Position along beam (m)"
              yKey="y"
              yAxisLabel="Bending Moment (N·m)"
              domainColor="#F59E0B"
            />
          </div>
        ) : undefined}
      />
    </div>
  );
}