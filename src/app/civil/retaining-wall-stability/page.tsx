"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep, GraphPanel
} from '@/components/calculator';

export default function RetainingWallStabilityPage() {
  const [wallHeight, setWallHeight] = useState<number | ''>(3); // m
  const [backfillSlope, setBackfillSlope] = useState<number | ''>(0); // degrees
  const [soilUnitWeight, setSoilUnitWeight] = useState<number | ''>(18); // kN/m³
  const [frictionAngle, setFrictionAngle] = useState<number | ''>(30); // degrees
  const [cohesion, setCohesion] = useState<number | ''>(0); // kPa
  const [wallSlope, setWallSlope] = useState<number | ''>(0); // degrees from vertical (positive = batter)
  const [surcharge, setSurcharge] = useState<number | ''>(0); // kPa

  // Calculate active earth pressure coefficient (Rankine theory)
  const hasValues = typeof wallHeight === 'number' && typeof backfillSlope === 'number' &&
                   typeof soilUnitWeight === 'number' && typeof frictionAngle === 'number' &&
                   typeof cohesion === 'number' && typeof wallSlope === 'number' &&
                   typeof surcharge === 'number' &&
                   wallHeight > 0 && soilUnitWeight > 0 && frictionAngle > 0 && frictionAngle < 90;

  let ka: number | null = null;
  let pa: number | null = null; // Total active force per unit width
  let ma: number | null = null; // Moment about base per unit width

  if (hasValues) {
    const β = backfillSlope * Math.PI / 180; // backfill slope in radians
    const φ = frictionAngle * Math.PI / 180; // friction angle in radians
    const α = wallSlope * Math.PI / 180; // wall slope from vertical

    // Rankine active earth pressure coefficient for inclined backfill
    if (φ > β) {
      ka = Math.pow(Math.cos(β), 2) *
           (Math.cos(β) - Math.sqrt(Math.pow(Math.cos(β), 2) - Math.pow(Math.cos(φ), 2))) /
           (Math.pow(Math.cos(β), 2) * (Math.cos(β) + Math.sqrt(Math.pow(Math.cos(β), 2) - Math.pow(Math.cos(φ), 2))));
    } else {
      ka = 0; // limiting case
    }

    // Total active force per unit width of wall
    const σv = soilUnitWeight * wallHeight; // vertical stress at depth H
    const σa = ka * σv; // active earth pressure at depth H
    pa = 0.5 * σa * wallHeight; // triangular distribution

    // Moment about base (assuming triangular pressure distribution)
    ma = pa * (wallHeight / 3); // acts at H/3 from base

    // Add surcharge contribution if present
    if (surcharge > 0) {
      const pa_surcharge = ka * surcharge * wallHeight;
      const ma_surcharge = pa_surcharge * (wallHeight / 2);
      pa += pa_surcharge;
      ma += ma_surcharge;
    }
  }

  // Factor of safety against sliding (simplified - assumes no passive resistance)
  const fsSliding = hasValues && pa !== null ? (cohesion * wallHeight + (soilUnitWeight * Math.pow(wallHeight, 2) * Math.tan(frictionAngle * Math.PI / 180))) / pa : null;

  // Factor of safety against overturning (simplified - assumes rectangular wall section)
  const fsOverturning = hasValues && ma !== null ? (soilUnitWeight * Math.pow(wallHeight, 2) * wallHeight / 2) / ma : null; // Very simplified

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Retaining Wall Stability Calculator"
        description="Calculate active earth pressure and stability factors for a retaining wall."
        domainColorClass="text-civil"
        inputs={
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <InputField
                  label="Wall Height"
                  symbol="H"
                  value={wallHeight}
                  onChange={setWallHeight}
                  units={[{ value: 'm', label: 'Meters (m)' }]}
                  selectedUnit="m"
                />
              </div>
              <div>
                <InputField
                  label="Backfill Slope"
                  symbol="β"
                  value={backfillSlope}
                  onChange={setBackfillSlope}
                  units={[{ value: 'deg', label: 'Degrees (°)' }]}
                  selectedUnit="deg"
                />
              </div>
              <div>
                <InputField
                  label="Soil Unit Weight"
                  symbol="γ"
                  value={soilUnitWeight}
                  onChange={setSoilUnitWeight}
                  units={[{ value: 'kN/m3', label: 'kN/m³' }]}
                  selectedUnit="kN/m3"
                />
              </div>
              <div>
                <InputField
                  label="Soil Friction Angle"
                  symbol="φ"
                  value={frictionAngle}
                  onChange={setFrictionAngle}
                  units={[{ value: 'deg', label: 'Degrees (°)' }]}
                  selectedUnit="deg"
                />
              </div>
              <div>
                <InputField
                  label="Soil Cohesion"
                  symbol="c"
                  value={cohesion}
                  onChange={setCohesion}
                  units={[{ value: 'kPa', label: 'kPa' }]}
                  selectedUnit="kPa"
                />
              </div>
              <div>
                <InputField
                  label="Wall Slope from Vertical"
                  symbol="α"
                  value={wallSlope}
                  onChange={setWallSlope}
                  units={[{ value: 'deg', label: 'Degrees (°)' }, { value: '0', label: 'Vertical' }]}
                  selectedUnit="0"
                />
              </div>
              <div>
                <InputField
                  label="Uniform Surcharge"
                  symbol="q"
                  value={surcharge}
                  onChange={setSurcharge}
                  units={[{ value: 'kPa', label: 'kPa' }, { value: '0', label: 'None' }]}
                  selectedUnit="0"
                />
              </div>
            </div>
          </>
        }
        outputs={
          <>
            <div className="space-y-4">
              {ka !== null && (
                <>
                  <OutputField
                    label="Active Earth Pressure Coefficient"
                    symbol="Kₐ"
                    value={ka}
                    unit=""
                    sigFigs={4}
                  />
                  <OutputField
                    label="Active Earth Pressure at Base"
                    symbol="σₐ"
                    value={hasValues ? ka * soilUnitWeight * wallHeight : null}
                    unit="kPa"
                    sigFigs={4}
                  />
                </>
              )}
              {pa !== null && (
                <>
                  <OutputField
                    label="Total Active Force per Unit Width"
                    symbol="Pₐ"
                    value={pa}
                    unit="kN/m"
                    sigFigs={4}
                  />
                  <OutputField
                    label="Total Active Force"
                    symbol="Pₐ"
                    value={pa}
                    unit="kN/m (per meter of wall)"
                    sigFigs={4}
                  />
                </>
              )}
              {ma !== null && (
                <>
                  <OutputField
                    label="Overturning Moment about Base"
                    symbol="Mₐ"
                    value={ma}
                    unit="kN·m/m"
                    sigFigs={4}
                  />
                </>
              )}
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-text-secondary mb-2">Stability Factors</h3>
                {fsSliding !== null && (
                  <OutputField
                    label="Factor of Safety - Sliding"
                    symbol="FSₛ"
                    value={fsSliding}
                    unit=""
                    sigFigs={3}
                    className={fsSliding! < 1.5 ? "bg-red-50" : fsSliding! < 2.0 ? "bg-yellow-50" : "bg-green-50"}
                  />
                )}
                {fsOverturning !== null && (
                  <OutputField
                    label="Factor of Safety - Overturning"
                    symbol="FSₒ"
                    value={fsOverturning}
                    unit=""
                    sigFigs={3}
                    className={fsOverturning! < 1.5 ? "bg-red-50" : fsOverturning! < 2.0 ? "bg-yellow-50" : "bg-green-50"}
                  />
                )}
               </div>
             </div>
           </>
        }
        formula={
          <FormulaDisplay formula="Kₐ = \\frac{\\cos^2(\\beta) \\left[\\cos(\\beta) - \\sqrt{\\cos^2(\\beta) - \\cos^2(\\phi)\\right]}{\\cos^2(\\beta) \\left[\\cos(\\beta) + \\sqrt{\\cos^2(\\beta) - \\cos^2(\\phi)\\right]},\\quad Pₐ = \\frac{1}{2} Kₐ \\gamma H^2, \\quad Mₐ = Pₐ \\frac{H}{3}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the active earth pressure coefficient (Kₐ) using Rankine theory for inclined backfill:',
                formula: 'Kₐ = \\frac{\\cos^2(\\beta) \\left[\\cos(\\beta) - \\sqrt{\\cos^2(\\beta) - \\cos^2(\\phi)\\right]}{\\cos^2(\\beta) \\left[\\cos(\\beta) + \\sqrt{\\cos^2(\\beta) - \\cos^2(\\phi)\\right]}'
              },
              {
                description: `Substitute values: β = ${backfillSlope}°, φ = ${frictionAngle}°`,
                substitution: `Kₐ = \\frac{\\cos^2(${backfillSlope}°) \\left[\\cos(${backfillSlope}°) - \\sqrt{\\cos^2(${backfillSlope}°) - \\cos^2(${frictionAngle}°)\\right]}{\\cos^2(${backfillSlope}°) \\left[\\cos(${backfillSlope}°) + \\sqrt{\\cos^2(${backfillSlope}°) - \\cos^2(${frictionAngle}°)\\right]} = ${ka?.toFixed(4)}`
              },
              {
                description: 'Calculate total active force per unit width of wall:',
                formula: 'Pₐ = \\frac{1}{2} Kₐ \\gamma H^2'
              },
              {
                description: `Substitute values: γ = ${soilUnitWeight} kN/m³, H = ${wallHeight} m`,
                substitution: `Pₐ = \\frac{1}{2} \\times ${ka?.toFixed(4)} \\times ${soilUnitWeight} \\times ${wallHeight}^2 = ${pa?.toFixed(4)}\\,\\text{kN/m}`
              },
              {
                description: 'Calculate overturning moment about base (assuming triangular pressure distribution):',
                formula: 'Mₐ = Pₐ \\times \\frac{H}{3}'
              },
              {
                description: 'Substitute values:',
                substitution: `Mₐ = ${pa?.toFixed(4)} \\times \\frac{${wallHeight}}{3} = ${ma?.toFixed(4)}\\,\\text{kN·m/m}`
              },
              ...(pa !== null && cohesion !== null && soilUnitWeight !== null && frictionAngle !== null && wallHeight !== null ? [
                {
                  description: 'Calculate factor of safety against sliding (simplified):',
                  formula: 'FSₛ = \\frac{cH + \\gamma H^2 \\tan(\\phi)}{Pₐ}'
                },
                {
                  description: 'Substitute values:',
                  substitution: `FSₛ = \\frac{${cohesion} \\times ${wallHeight} + ${soilUnitWeight} \\times ${wallHeight}^2 \\times \\tan(${frictionAngle}°)}{${pa?.toFixed(4)}} = ${fsSliding?.toFixed(3)}`
                }
              ] : []),
              ...(ma !== null && soilUnitWeight !== null && wallHeight !== null ? [
                {
                  description: 'Calculate factor of safety against overturning (simplified):',
                  formula: 'FSₒ = \\frac{\\gamma H^3 / 6}{Mₐ} \\quad (\\text{assuming rectangular section})'
                },
                {
                  description: 'Substitute values:',
                  substitution: `FSₒ = \\frac{${soilUnitWeight} \\times ${wallHeight}^3 / 6}{${ma?.toFixed(4)}} = ${fsOverturning?.toFixed(3)}`
                }
              ] : [])
            ]}
          />
        ) : undefined}
        graph={hasValues && ka !== null ? (
          <GraphPanel
            title="Active Earth Pressure Distribution with Depth"
            data={Array.from({ length: 11 }, (_, i) => {
              const z = (wallHeight! / 10) * i; // depth from top
              const σz = hasValues ? ka! * soilUnitWeight! * z : 0;
              return { x: parseFloat(z.toFixed(3)), y: parseFloat(σz.toFixed(3)) };
            })}
            xKey="x"
            xAxisLabel="Depth from top of wall (m)"
            yKey="y"
            yAxisLabel="Active Earth Pressure (kPa)"
            domainColor="#F59E0B"
          />
        ) : undefined}
      />
    </div>
  );
}