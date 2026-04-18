"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function IdealGasLawPage() {
  const [pressure, setPressure] = useState<number | ''>(101325); // Pa
  const [volume, setVolume] = useState<number | ''>(0.0224); // m³
  const [moles, setMoles] = useState<number | ''>(1); // mol
  const [temperature, setTemperature] = useState<number | ''>(273); // K

  const R = 8.314; // J/mol·K

  // Determine which one to solve
  const solveFor = [pressure, volume, moles, temperature].findIndex(v => v === '') === -1 ? null :
                   [pressure, volume, moles, temperature].findIndex(v => v === '');

  let calculatedPressure = pressure;
  let calculatedVolume = volume;
  let calculatedMoles = moles;
  let calculatedTemperature = temperature;

  if (solveFor === 0 && volume && moles && temperature) { // solve P
    calculatedPressure = (moles * R * temperature) / volume;
  } else if (solveFor === 1 && pressure && moles && temperature) { // solve V
    calculatedVolume = (moles * R * temperature) / pressure;
  } else if (solveFor === 2 && pressure && volume && temperature) { // solve n
    calculatedMoles = (pressure * volume) / (R * temperature);
  } else if (solveFor === 3 && pressure && volume && moles) { // solve T
    calculatedTemperature = (pressure * volume) / (R * moles);
  }

  const hasValues = calculatedPressure && calculatedVolume && calculatedMoles && calculatedTemperature;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Ideal Gas Law Calculator"
        description="Solve for pressure, volume, moles, or temperature using PV = nRT."
        domainColorClass="text-chemical"
        inputs={
          <>
            <InputField
              label="Pressure"
              symbol="P"
              value={pressure}
              onChange={setPressure}
              units={[{ value: 'Pa', label: 'Pascals (Pa)' }]}
              selectedUnit="Pa"
              placeholder="Leave blank to solve"
            />
            <InputField
              label="Volume"
              symbol="V"
              value={volume}
              onChange={setVolume}
              units={[{ value: 'm3', label: 'm³' }]}
              selectedUnit="m3"
              placeholder="Leave blank to solve"
            />
            <InputField
              label="Moles"
              symbol="n"
              value={moles}
              onChange={setMoles}
              units={[{ value: 'mol', label: 'Moles (mol)' }]}
              selectedUnit="mol"
              placeholder="Leave blank to solve"
            />
            <InputField
              label="Temperature"
              symbol="T"
              value={temperature}
              onChange={setTemperature}
              units={[{ value: 'K', label: 'Kelvin (K)' }]}
              selectedUnit="K"
              placeholder="Leave blank to solve"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Pressure"
              symbol="P"
              value={calculatedPressure}
              unit="Pa"
              sigFigs={4}
            />
            <OutputField
              label="Volume"
              symbol="V"
              value={calculatedVolume}
              unit="m³"
              sigFigs={4}
            />
            <OutputField
              label="Moles"
              symbol="n"
              value={calculatedMoles}
              unit="mol"
              sigFigs={4}
            />
            <OutputField
              label="Temperature"
              symbol="T"
              value={calculatedTemperature}
              unit="K"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="PV = nRT, \\quad R = 8.314\\text{ J/mol·K}" />
        }
        steps={hasValues && solveFor !== null ? (
          <StepByStep
            steps={[
              {
                description: 'Using the ideal gas law:',
                formula: 'PV = nRT'
              },
              {
                description: 'Solving for the unknown variable:',
                substitution: solveFor === 0 ? `P = \\frac{nRT}{V} = \\frac{${moles} \\cdot 8.314 \\cdot ${temperature}}{${volume}}` :
                            solveFor === 1 ? `V = \\frac{nRT}{P} = \\frac{${moles} \\cdot 8.314 \\cdot ${temperature}}{${pressure}}` :
                            solveFor === 2 ? `n = \\frac{PV}{RT} = \\frac{${pressure} \\cdot ${volume}}{8.314 \\cdot ${temperature}}` :
                            `T = \\frac{PV}{nR} = \\frac{${pressure} \\cdot ${volume}}{${moles} \\cdot 8.314}`,
                result: solveFor === 0 ? `P = ${calculatedPressure} Pa` :
                        solveFor === 1 ? `V = ${calculatedVolume} m³` :
                        solveFor === 2 ? `n = ${calculatedMoles} mol` :
                        `T = ${calculatedTemperature} K`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}

export const dynamic = 'force-dynamic';