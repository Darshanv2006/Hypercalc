"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

type HeatTransferType = 'conduction' | 'convection' | 'radiation';

export default function HeatTransferPage() {
  const [type, setType] = useState<HeatTransferType>('conduction');
  const [thermalConductivity, setThermalConductivity] = useState<number | ''>(50); // W/mK
  const [area, setArea] = useState<number | ''>(1); // m²
  const [thickness, setThickness] = useState<number | ''>(0.01); // m
  const [tempDiff, setTempDiff] = useState<number | ''>(100); // K
  const [convectiveCoeff, setConvectiveCoeff] = useState<number | ''>(10); // W/m²K
  const [emissivity, setEmissivity] = useState<number | ''>(0.9);
  const [temp1, setTemp1] = useState<number | ''>(373); // K
  const [temp2, setTemp2] = useState<number | ''>(293); // K

  let heatTransfer: number | null = null;
  let formula = '';
  let hasValues = false;

  if (type === 'conduction') {
    hasValues = typeof thermalConductivity === 'number' && typeof area === 'number' && typeof thickness === 'number' && typeof tempDiff === 'number' &&
                thermalConductivity > 0 && area > 0 && thickness > 0;
    if (hasValues) {
      heatTransfer = ((thermalConductivity as number) * (area as number) * (tempDiff as number)) / (thickness as number);
      formula = 'Q = \\frac{k A \\Delta T}{L}';
    }
  } else if (type === 'convection') {
    hasValues = typeof convectiveCoeff === 'number' && typeof area === 'number' && typeof tempDiff === 'number' &&
                convectiveCoeff > 0 && area > 0;
    if (hasValues) {
      heatTransfer = (convectiveCoeff as number) * (area as number) * (tempDiff as number);
      formula = 'Q = h A \\Delta T';
    }
  } else if (type === 'radiation') {
    hasValues = typeof emissivity === 'number' && typeof area === 'number' && typeof temp1 === 'number' && typeof temp2 === 'number' &&
                emissivity >= 0 && emissivity <= 1 && area > 0 && temp1 > 0 && temp2 > 0;
    if (hasValues) {
      const sigma = 5.67e-8; // Stefan-Boltzmann constant
      heatTransfer = (emissivity as number) * sigma * (area as number) * (Math.pow(temp1 as number, 4) - Math.pow(temp2 as number, 4));
      formula = 'Q = \\epsilon \\sigma A (T_1^4 - T_2^4)';
    }
  }

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Heat Transfer Calculator"
        description="Calculate heat transfer rate by conduction, convection, or radiation."
        domainColorClass="text-mechanical"
        inputs={
          <>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-text-secondary mb-2">Heat Transfer Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as HeatTransferType)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border"
              >
                <option value="conduction">Conduction</option>
                <option value="convection">Convection</option>
                <option value="radiation">Radiation</option>
              </select>
            </div>
            {type === 'conduction' && (
              <>
                <InputField
                  label="Thermal Conductivity"
                  symbol="k"
                  value={thermalConductivity}
                  onChange={setThermalConductivity}
                  units={[{ value: 'W/mK', label: 'W/m·K' }]}
                  selectedUnit="W/mK"
                />
                <InputField
                  label="Area"
                  symbol="A"
                  value={area}
                  onChange={setArea}
                  units={[{ value: 'm2', label: 'm²' }]}
                  selectedUnit="m2"
                />
                <InputField
                  label="Thickness"
                  symbol="L"
                  value={thickness}
                  onChange={setThickness}
                  units={[{ value: 'm', label: 'm' }]}
                  selectedUnit="m"
                />
                <InputField
                  label="Temperature Difference"
                  symbol="ΔT"
                  value={tempDiff}
                  onChange={setTempDiff}
                  units={[{ value: 'K', label: 'Kelvin (K)' }]}
                  selectedUnit="K"
                />
              </>
            )}
            {type === 'convection' && (
              <>
                <InputField
                  label="Convective Heat Transfer Coefficient"
                  symbol="h"
                  value={convectiveCoeff}
                  onChange={setConvectiveCoeff}
                  units={[{ value: 'W/m2K', label: 'W/m²·K' }]}
                  selectedUnit="W/m2K"
                />
                <InputField
                  label="Area"
                  symbol="A"
                  value={area}
                  onChange={setArea}
                  units={[{ value: 'm2', label: 'm²' }]}
                  selectedUnit="m2"
                />
                <InputField
                  label="Temperature Difference"
                  symbol="ΔT"
                  value={tempDiff}
                  onChange={setTempDiff}
                  units={[{ value: 'K', label: 'Kelvin (K)' }]}
                  selectedUnit="K"
                />
              </>
            )}
            {type === 'radiation' && (
              <>
                <InputField
                  label="Emissivity"
                  symbol="ε"
                  value={emissivity}
                  onChange={setEmissivity}
                  units={[{ value: '', label: 'Dimensionless' }]}
                  selectedUnit=""
                />
                <InputField
                  label="Area"
                  symbol="A"
                  value={area}
                  onChange={setArea}
                  units={[{ value: 'm2', label: 'm²' }]}
                  selectedUnit="m2"
                />
                <InputField
                  label="Surface Temperature"
                  symbol="T₁"
                  value={temp1}
                  onChange={setTemp1}
                  units={[{ value: 'K', label: 'Kelvin (K)' }]}
                  selectedUnit="K"
                />
                <InputField
                  label="Ambient Temperature"
                  symbol="T₂"
                  value={temp2}
                  onChange={setTemp2}
                  units={[{ value: 'K', label: 'Kelvin (K)' }]}
                  selectedUnit="K"
                />
              </>
            )}
          </>
        }
        outputs={
          <>
            <OutputField
              label="Heat Transfer Rate"
              symbol="Q"
              value={heatTransfer}
              unit="W"
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
                description: `Using the ${type} heat transfer formula:`,
                formula: formula
              },
              {
                description: 'Substitute the given values:',
                substitution: type === 'conduction' ? `Q = \\frac{${thermalConductivity} \\cdot ${area} \\cdot ${tempDiff}}{${thickness}}` :
                            type === 'convection' ? `Q = ${convectiveCoeff} \\cdot ${area} \\cdot ${tempDiff}` :
                            `Q = ${emissivity} \\cdot 5.67 \\times 10^{-8} \\cdot ${area} \\cdot (${temp1}^4 - ${temp2}^4)`
              },
              {
                description: 'Calculate the heat transfer rate:',
                result: `Q = ${heatTransfer}\\text{ W}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}