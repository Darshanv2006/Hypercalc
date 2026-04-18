"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep, GraphPanel
} from '@/components/calculator';

export default function KinematicsCalculator() {
  const [u, setU] = useState<number | ''>(0);
  const [a, setA] = useState<number | ''>(9.81);
  const [t, setT] = useState<number | ''>(5);

  const hasValues = typeof u === 'number' && typeof a === 'number' && typeof t === 'number' && t >= 0;

  // s = ut + 0.5 * a * t^2
  const displacement = hasValues ? (u as number) * (t as number) + 0.5 * (a as number) * Math.pow(t as number, 2) : null;
  
  // v = u + at
  const finalVelocity = hasValues ? (u as number) + (a as number) * (t as number) : null;

  // Graph Data (Displacement vs Time)
  const graphData = hasValues ? Array.from({ length: 11 }, (_, i) => {
    const currT = ((t as number) / 10) * i;
    const currS = (u as number) * currT + 0.5 * (a as number) * Math.pow(currT, 2);
    return {
      x: parseFloat(currT.toFixed(2)),
      y: parseFloat(currS.toFixed(2))
    };
  }) : [];

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Kinematics (SUVAT) Calculator"
        description="Calculate displacement and final velocity using uniform acceleration equations."
        domainColorClass="text-physics"
        inputs={
          <>
            <InputField
              label="Initial Velocity"
              symbol="u"
              value={u}
              onChange={setU}
              units={[{ value: 'm/s', label: 'm/s' }]}
              selectedUnit="m/s"
            />
            <InputField
              label="Acceleration"
              symbol="a"
              value={a}
              onChange={setA}
              units={[{ value: 'm/s2', label: 'm/s²' }, { value: 'g', label: 'g (9.81)' }]}
              selectedUnit="m/s2"
            />
            <InputField
              label="Time"
              symbol="t"
              value={t}
              onChange={setT}
              units={[{ value: 's', label: 'Seconds (s)' }]}
              selectedUnit="s"
            />
          </>
        }
        outputs={
          <>
             <OutputField
               label="Displacement"
               symbol="s"
               value={displacement}
               unit="meters (m)"
               sigFigs={4}
             />
             <OutputField
               label="Final Velocity"
               symbol="v"
               value={finalVelocity}
               unit="m/s"
               sigFigs={4}
             />
          </>
        }
        formula={
          <FormulaDisplay 
            formula="s = ut + \\frac{1}{2}at^2 \\quad \\text{and} \\quad v = u + at" 
            formulaId="phys_01"
          />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate Displacement (s):',
                formula: 's = ut + \\frac{1}{2}at^2',
                substitution: `s = (${u})(${t}) + 0.5(${a})(${t})^2`,
                result: `s = ${displacement} \\text{ m}`
              },
              {
                description: 'Calculate Final Velocity (v):',
                formula: 'v = u + at',
                substitution: `v = (${u}) + (${a})(${t})`,
                result: `v = ${finalVelocity} \\text{ m/s}`
              }
            ]}
          />
        ) : undefined}
        graph={hasValues ? (
          <GraphPanel
            title="Displacement vs Time"
            data={graphData}
            xKey="x"
            xAxisLabel="Time (t) [s]"
            yKey="y"
            yAxisLabel="Displacement (s) [m]"
            domainColor="#06B6D4" // physics cyan
          />
        ) : undefined}
      />
    </div>
  );
}