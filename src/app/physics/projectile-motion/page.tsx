"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep, GraphPanel
} from '@/components/calculator';

export default function ProjectileMotionPage() {
  const [initialVelocity, setInitialVelocity] = useState<number | ''>(20); // m/s
  const [angle, setAngle] = useState<number | ''>(45); // degrees

  // Constants
  const g = 9.81; // m/s²

  // Convert angle to radians
  const thetaRad = typeof angle === 'number' ? (angle * Math.PI) / 180 : null;

  // Calculate components
  const hasValues = typeof initialVelocity === 'number' && thetaRad !== null;
  const v0x = hasValues ? initialVelocity * Math.cos(thetaRad) : null;
  const v0y = hasValues ? initialVelocity * Math.sin(thetaRad) : null;

  // Time of flight
  const timeOfFlight = hasValues && v0y ? (2 * v0y) / g : null;

  // Range
  const range = hasValues && v0x && timeOfFlight ? v0x * timeOfFlight : null;

  // Max height
  const maxHeight = hasValues && v0y ? (v0y * v0y) / (2 * g) : null;

  // Trajectory data
  const trajectoryData = hasValues && timeOfFlight ? Array.from({ length: 51 }, (_, i) => {
    const t = (timeOfFlight! / 50) * i;
    const x = (v0x as number) * t;
    const y = (v0y as number) * t - 0.5 * g * t * t;
    return { x: parseFloat(x.toFixed(2)), y: parseFloat(Math.max(0, y).toFixed(2)) };
  }) : [];

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Projectile Motion Calculator"
        description="Calculate trajectory, range, and max height for projectile motion."
        domainColorClass="text-physics"
        inputs={
          <>
            <InputField
              label="Initial Velocity"
              symbol="v₀"
              value={initialVelocity}
              onChange={setInitialVelocity}
              units={[{ value: 'm/s', label: 'm/s' }]}
              selectedUnit="m/s"
            />
            <InputField
              label="Launch Angle"
              symbol="θ"
              value={angle}
              onChange={setAngle}
              units={[{ value: 'deg', label: 'Degrees (°)' }]}
              selectedUnit="deg"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Horizontal Velocity"
              symbol="v₀x"
              value={v0x}
              unit="m/s"
              sigFigs={4}
            />
            <OutputField
              label="Vertical Velocity"
              symbol="v₀y"
              value={v0y}
              unit="m/s"
              sigFigs={4}
            />
            <OutputField
              label="Time of Flight"
              symbol="t"
              value={timeOfFlight}
              unit="s"
              sigFigs={4}
            />
            <OutputField
              label="Range"
              symbol="R"
              value={range}
              unit="m"
              sigFigs={4}
            />
            <OutputField
              label="Maximum Height"
              symbol="h_max"
              value={maxHeight}
              unit="m"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="R = \\frac{v_0^2 \\sin 2\\theta}{g}, \\quad h_\\text{max} = \\frac{v_0^2 \\sin^2 \\theta}{2g}, \\quad t = \\frac{2 v_0 \\sin \\theta}{g}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate velocity components:',
                formula: 'v_{0x} = v_0 \\cos \\theta, \\quad v_{0y} = v_0 \\sin \\theta',
                substitution: `v_{0x} = ${initialVelocity} \\cos(${angle}^\\circ), \\quad v_{0y} = ${initialVelocity} \\sin(${angle}^\\circ)`,
                result: `v_{0x} = ${v0x} m/s, \\quad v_{0y} = ${v0y} m/s`
              },
              {
                description: 'Calculate time of flight:',
                formula: 't = \\frac{2 v_{0y}}{g}',
                substitution: `t = \\frac{2 \\cdot ${v0y}}{9.81}`,
                result: `t = ${timeOfFlight} s`
              },
              {
                description: 'Calculate range:',
                formula: 'R = v_{0x} \\cdot t',
                substitution: `R = ${v0x} \\cdot ${timeOfFlight}`,
                result: `R = ${range} m`
              },
              {
                description: 'Calculate maximum height:',
                formula: 'h_\\text{max} = \\frac{v_{0y}^2}{2g}',
                substitution: `h_\\text{max} = \\frac{${v0y}^2}{2 \\cdot 9.81}`,
                result: `h_\\text{max} = ${maxHeight} m`
              }
            ]}
          />
        ) : undefined}
        graph={hasValues ? (
          <GraphPanel
            title="Projectile Trajectory"
            data={trajectoryData}
            xKey="x"
            xAxisLabel="Horizontal Distance (m)"
            yKey="y"
            yAxisLabel="Height (m)"
            domainColor="#F59E0B"
          />
        ) : undefined}
      />
    </div>
  );
}