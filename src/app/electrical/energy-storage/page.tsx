"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

type EnergyType = 'capacitor' | 'inductor';

export default function EnergyStoragePage() {
  const [type, setType] = useState<EnergyType>('capacitor');
  const [capacitance, setCapacitance] = useState<number | ''>(0.001); // F
  const [inductance, setInductance] = useState<number | ''>(0.01); // H
  const [voltage, setVoltage] = useState<number | ''>(10); // V
  const [current, setCurrent] = useState<number | ''>(1); // A

  // Calculate energy
  const hasValues = type === 'capacitor' ?
                    (typeof capacitance === 'number' && typeof voltage === 'number' && capacitance > 0) :
                    (typeof inductance === 'number' && typeof current === 'number' && inductance > 0);
  const energy = hasValues ?
                 (type === 'capacitor' ? 0.5 * (capacitance as number) * (voltage as number) ** 2 : 0.5 * (inductance as number) * (current as number) ** 2) : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Energy Storage Calculator"
        description={`Calculate stored energy in ${type === 'capacitor' ? 'capacitors' : 'inductors'}.`}
        domainColorClass="text-electrical"
        inputs={
          <>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-text-secondary mb-2">Component Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as EnergyType)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border"
              >
                <option value="capacitor">Capacitor</option>
                <option value="inductor">Inductor</option>
              </select>
            </div>
            {type === 'capacitor' && (
              <>
                <InputField
                  label="Capacitance"
                  symbol="C"
                  value={capacitance}
                  onChange={setCapacitance}
                  units={[{ value: 'F', label: 'Farads (F)' }]}
                  selectedUnit="F"
                />
                <InputField
                  label="Voltage"
                  symbol="V"
                  value={voltage}
                  onChange={setVoltage}
                  units={[{ value: 'V', label: 'Volts (V)' }]}
                  selectedUnit="V"
                />
              </>
            )}
            {type === 'inductor' && (
              <>
                <InputField
                  label="Inductance"
                  symbol="L"
                  value={inductance}
                  onChange={setInductance}
                  units={[{ value: 'H', label: 'Henrys (H)' }]}
                  selectedUnit="H"
                />
                <InputField
                  label="Current"
                  symbol="I"
                  value={current}
                  onChange={setCurrent}
                  units={[{ value: 'A', label: 'Amperes (A)' }]}
                  selectedUnit="A"
                />
              </>
            )}
          </>
        }
        outputs={
          <>
            <OutputField
              label="Stored Energy"
              symbol="E"
              value={energy}
              unit="J"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula={
            type === 'capacitor' ?
            "E = \\frac{1}{2} C V^2" :
            "E = \\frac{1}{2} L I^2"
          } />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: `Calculate stored energy in ${type}:`,
                formula: type === 'capacitor' ? 'E = \\frac{1}{2} C V^2' : 'E = \\frac{1}{2} L I^2',
                substitution: type === 'capacitor' ? `E = \\frac{1}{2} \\cdot ${capacitance} \\cdot ${voltage}^2` : `E = \\frac{1}{2} \\cdot ${inductance} \\cdot ${current}^2`,
                result: `E = ${energy}\\text{ J}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}