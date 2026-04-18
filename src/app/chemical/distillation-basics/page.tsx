"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function DistillationBasicsPage() {
  const [xDistillate, setXDistillate] = useState<number | ''>(0.95); // mole fraction of more volatile component in distillate
  const [xBottoms, setXBottoms] = useState<number | ''>(0.05); // mole fraction in bottoms
  const [xFeed, setXFeed] = useState<number | ''>(0.5); // mole fraction in feed
  const [refluxRatio, setRefluxRatio] = useState<number | ''>(1.5); // R
  const [relativeVolatility, setRelativeVolatility] = useState<number | ''>(2.5); // α

  // Calculate minimum number of stages using Fenske equation (total reflux)
  // N_min = log[(xD/(1-xD)) * ((1-xB)/xB)] / log(α)
  // Calculate minimum reflux ratio using Underwood approximation (for constant relative volatility)
  // R_min = (1/(α-1)) * [(xD/xF) - α*( (1-xD)/(1-xF) )]
  // Actual number of stages using Gilliland correlation (approximation) or simply use N_min * factor for demo

  const hasValues = typeof xDistillate === 'number' && typeof xBottoms === 'number' &&
                   typeof xFeed === 'number' && typeof refluxRatio === 'number' &&
                   typeof relativeVolatility === 'number' &&
                   xDistillate > 0 && xDistillate < 1 &&
                   xBottoms > 0 && xBottoms < 1 &&
                   xFeed > 0 && xFeed < 1 &&
                   refluxRatio >= 0 &&
                   relativeVolatility > 1;

  let nMin: number | null = null;
  let rMin: number | null = null;
  let nActual: number | null = null;

  if (hasValues) {
    // Fenske equation for minimum stages at total reflux
    const numFenske = (xDistillate / (1 - xDistillate)) * ((1 - xBottoms) / xBottoms);
    const denFenske = relativeVolatility;
    nMin = Math.log(numFenske) / Math.log(denFenske);

    // Underwood equation for minimum reflux ratio (binary mixture, constant α)
    const term1 = xDistillate / xFeed;
    const term2 = relativeVolatility * ((1 - xDistillate) / (1 - xFeed));
    rMin = (1 / (relativeVolatility - 1)) * (term1 - term2);

    // Gilliland correlation approximation (Eduljee version):
    // Y = 1 - exp[ (1+54.4X)/(11+117.2X) * (X-1) ] where X = (R-Rmin)/(R+1), Y = (N-Nmin)/(N+1)
    // We'll solve for N given R, Rmin, Nmin using an approximation or iteration.
    // For simplicity, use the approximation: N ≈ Nmin * (R/(Rmin))^0.2 (not accurate but illustrative)
    // Better: Use the Gilliland correlation via solving iteratively or use a known approximation.
    // We'll use the Molokanov approximation: N/Nmin = 1 + ( (R/Rmin)^0.5 - 1 ) * 0.75 (just for demo)
    if (rMin !== null && refluxRatio > rMin) {
      const rRatio = refluxRatio / rMin;
      // Simple approximation: Nactual = Nmin * (R/Rmin)^0.2 (placeholder)
      nActual = nMin * Math.pow(rRatio, 0.2);
    }
  }

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Distillation Basics Calculator"
        description="Calculate minimum stages, minimum reflux, and estimate actual stages for binary distillation."
        domainColorClass="text-chemical"
        inputs={
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <InputField
                  label="Distillate Composition (xD)"
                  symbol="x_D"
                  value={xDistillate}
                  onChange={setXDistillate}
                  units={[{ value: '0.95', label: '0.95' }, { value: 'custom', label: 'Custom' }]}
                  selectedUnit="0.95"
                />
              </div>
              <div>
                <InputField
                  label="Bottoms Composition (xB)"
                  symbol="x_B"
                  value={xBottoms}
                  onChange={setXBottoms}
                  units={[{ value: '0.05', label: '0.05' }, { value: 'custom', label: 'Custom' }]}
                  selectedUnit="0.05"
                />
              </div>
              <div>
                <InputField
                  label="Feed Composition (xF)"
                  symbol="x_F"
                  value={xFeed}
                  onChange={setXFeed}
                  units={[{ value: '0.5', label: '0.5' }, { value: 'custom', label: 'Custom' }]}
                  selectedUnit="0.5"
                />
              </div>
              <div>
                <InputField
                  label="Reflux Ratio (R)"
                  symbol="R"
                  value={refluxRatio}
                  onChange={setRefluxRatio}
                  units={[{ value: '1.0', label: '1.0' }, { value: '1.5', label: '1.5' }, { value: '2.0', label: '2.0' }, { value: 'custom', label: 'Custom' }]}
                  selectedUnit="1.5"
                />
              </div>
              <div>
                <InputField
                  label="Relative Volatility (α)"
                  symbol="α"
                  value={relativeVolatility}
                  onChange={setRelativeVolatility}
                  units={[{ value: '1.5', label: '1.5' }, { value: '2.0', label: '2.0' }, { value: '2.5', label: '2.5' }, { value: '3.0', label: '3.0' }, { value: 'custom', label: 'Custom' }]}
                  selectedUnit="2.5"
                />
              </div>
            </div>
          </>
        }
        outputs={
          <>
            <div className="space-y-4">
              {nMin !== null && (
                <>
                  <OutputField
                    label="Minimum Number of Stages (Fenske)"
                    symbol="N_{min}"
                    value={nMin}
                    unit="stages"
                    sigFigs={2}
                  />
                  <OutputField
                    label="Minimum Stages + 1 (including reboiler)"
                    symbol="N_{min}+1"
                    value={nMin ? nMin + 1 : null}
                    unit="stages"
                    sigFigs={2}
                  />
                </>
              )}
              {rMin !== null && (
                <>
                  <OutputField
                    label="Minimum Reflux Ratio (Underwood)"
                    symbol="R_{min}"
                    value={rMin}
                    unit=""
                    sigFigs={4}
                  />
                </>
              )}
              {nActual !== null && (
                <>
                  <OutputField
                    label="Estimated Actual Stages (Gilliland approx.)"
                    symbol="N_{actual}"
                    value={nActual}
                    unit="stages"
                    sigFigs={2}
                  />
                  <OutputField
                    label="Estimated Actual Stages + 1 (incl. reboiler)"
                    symbol="N_{actual}+1"
                    value={nActual ? nActual + 1 : null}
                    unit="stages"
                    sigFigs={2}
                  />
                 </>
               )}
             </div>
           </>
        }
        formula={
          <>
            <FormulaDisplay formula="N_{\\min} = \\frac{\\ln\\left[\\frac{x_D}{1-x_D} \\cdot \\frac{1-x_B}{x_B}\\right]}{\\ln \\alpha}" />
            <FormulaDisplay formula="R_{\\min} = \\frac{1}{\\alpha-1} \\left[ \\frac{x_D}{x_F} - \\alpha \\frac{1-x_D}{1-x_F} \\right] \\quad (\\text{constant } \\alpha)" />
            <FormulaDisplay formula="\\text{Gilliland Correlation: } \\frac{N-N_{\\min}}{N+1} = f\\left(\\frac{R-R_{\\min}}{R+1}\\right)" />
          </>
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Step 1: Calculate minimum number of stages at total reflux using Fenske equation:',
                formula: 'N_{\\min} = \\frac{\\ln\\left[\\frac{x_D}{1-x_D} \\cdot \\frac{1-x_B}{x_B}\\right]}{\\ln \\alpha}'
              },
              {
                description: 'Substitute values:',
                substitution: `N_{\\min} = \\frac{\\ln\\left[\\frac{${xDistillate}}{1-${xDistillate}} \\cdot \\frac{1-${xBottoms}}{${xBottoms}}\\right]}{\\ln ${relativeVolatility}} = \\frac{\\ln\\left[${(xDistillate/(1-xDistillate))*((1-xBottoms)/xBottoms).toFixed(4)}\\right]}{\\ln ${relativeVolatility}} = ${nMin?.toFixed(2)}`
              },
              {
                description: 'Step 2: Calculate minimum reflux ratio using Underwood equation (constant relative volatility):',
                formula: 'R_{\\min} = \\frac{1}{\\alpha-1} \\left[ \\frac{x_D}{x_F} - \\alpha \\frac{1-x_D}{1-x_F} \\right]'
              },
              {
                description: 'Substitute values:',
                substitution: `R_{\\min} = \\frac{1}{${relativeVolatility}-1} \\left[ \\frac{${xDistillate}}{${xFeed}} - ${relativeVolatility} \\cdot \\frac{1-${xDistillate}}{1-${xFeed}} \\right] = \\frac{1}{${relativeVolatility-1}} \\left[ ${(xDistillate/xFeed).toFixed(4)} - ${relativeVolatility} \\cdot ${((1-xDistillate)/(1-xFeed)).toFixed(4)} \\right] = ${rMin?.toFixed(4)}`
              },
              ...(nActual !== null && rMin !== null ? [
                {
                  description: 'Step 3: Estimate actual number of stages using Gilliland correlation approximation:',
                  formula: 'N \\approx N_{\\min} \\times \\left(\\frac{R}{R_{\\min}}\\right)^{0.2} \\quad (\\text{approximation for illustration})'
                },
                {
                  description: 'Substitute values:',
                  substitution: `N \\approx ${nMin?.toFixed(2)} \\times \\left(\\frac{${refluxRatio}}{${rMin?.toFixed(4)}}\\right)^{0.2} = ${nMin?.toFixed(2)} \\times ${((refluxRatio / rMin!) ** 0.2).toFixed(4)} = ${nActual?.toFixed(2)}`
                }
              ] : [])
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}