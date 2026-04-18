"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep, GraphPanel
} from '@/components/calculator';

type RLCircuitType = 'charging' | 'discharging';

export default function RLCircuitPage() {
  const [resistance, setResistance] = useState<number | ''>(10); // Ω
  const [inductance, setInductance] = useState<number | ''>(0.01); // H
  const [voltage, setVoltage] = useState<number | ''>(12); // V
  const [circuitType, setCircuitType] = useState<RLCircuitType>('charging');
  const [time, setTime] = useState<number | ''>(0.001); // s

  // Calculate time constant τ = L/R
  const hasValues = typeof resistance === 'number' && typeof inductance === 'number' && typeof voltage === 'number';
  const timeConstant = hasValues ? inductance / resistance : null;

  // Calculate current at time t
  const steadyStateCurrent = hasValues ? voltage / resistance : null;
  const currentAtTime = hasValues && typeof time === 'number' && timeConstant && steadyStateCurrent ?
                        (circuitType === 'charging' ?
                         steadyStateCurrent * (1 - Math.exp(-time / timeConstant)) :
                         steadyStateCurrent * Math.exp(-time / timeConstant)) : null;

  // Graph Data (Current vs Time)
  const graphData = hasValues && timeConstant && steadyStateCurrent ? Array.from({ length: 21 }, (_, i) => {
    const t = (timeConstant! / 20) * i;
    const i_val = circuitType === 'charging' ?
                  (steadyStateCurrent! * (1 - Math.exp(-t / timeConstant!))) :
                  (steadyStateCurrent! * Math.exp(-t / timeConstant!));
    return {
      x: parseFloat(t.toFixed(6)),
      y: parseFloat(i_val.toFixed(4))
    };
  }) : [];

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="RL Circuit Calculator"
        description={`Calculate time constant and ${circuitType} current in RL circuits.`}
        domainColorClass="text-electrical"
        inputs={
          <>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-text-secondary mb-2">Circuit Type</label>
              <select
                value={circuitType}
                onChange={(e) => setCircuitType(e.target.value as RLCircuitType)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border"
              >
                <option value="charging">Charging</option>
                <option value="discharging">Discharging</option>
              </select>
            </div>
            <InputField
              label="Resistance"
              symbol="R"
              value={resistance}
              onChange={setResistance}
              units={[{ value: 'Ω', label: 'Ohms (Ω)' }]}
              selectedUnit="Ω"
            />
            <InputField
              label="Inductance"
              symbol="L"
              value={inductance}
              onChange={setInductance}
              units={[{ value: 'H', label: 'Henrys (H)' }]}
              selectedUnit="H"
            />
            <InputField
              label="Voltage"
              symbol="V"
              value={voltage}
              onChange={setVoltage}
              units={[{ value: 'V', label: 'Volts (V)' }]}
              selectedUnit="V"
            />
            <InputField
              label="Time"
              symbol="t"
              value={time}
              onChange={setTime}
              units={[{ value: 's', label: 'Seconds (s)' }]}
              selectedUnit="s"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Time Constant"
              symbol="τ"
              value={timeConstant}
              unit="s"
              sigFigs={4}
            />
            <OutputField
              label="Steady State Current"
              symbol="I_ss"
              value={steadyStateCurrent}
              unit="A"
              sigFigs={4}
            />
            <OutputField
              label={`Current at t=${time}s`}
              symbol="I"
              value={currentAtTime}
              unit="A"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula={
            circuitType === 'charging' ?
            "\\tau = \\frac{L}{R}, \\quad I(t) = I_\\text{ss} (1 - e^{-t/\\tau})" :
            "\\tau = \\frac{L}{R}, \\quad I(t) = I_\\text{ss} e^{-t/\\tau}"
          } />
        }
        steps={hasValues && typeof time === 'number' ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the steady state current:',
                formula: 'I_\\text{ss} = \\frac{V}{R}',
                substitution: `I_\\text{ss} = \\frac{${voltage}}{${resistance}}`,
                result: `I_\\text{ss} = ${steadyStateCurrent}\\text{ A}`
              },
              {
                description: 'Calculate the time constant:',
                formula: '\\tau = \\frac{L}{R}',
                substitution: `\\tau = \\frac{${inductance}}{${resistance}}`,
                result: `\\tau = ${timeConstant}\\text{ s}`
              },
              {
                description: `Calculate current for ${circuitType}:`,
                formula: circuitType === 'charging' ? 'I(t) = I_\\text{ss} (1 - e^{-t/\\tau})' : 'I(t) = I_\\text{ss} e^{-t/\\tau}',
                substitution: `I(${time}) = ${steadyStateCurrent} ${circuitType === 'charging' ? '(1 - ' : ''}e^{-${time}/${timeConstant}}${circuitType === 'charging' ? ')' : ''}`,
                result: `I = ${currentAtTime}\\text{ A}`
              }
            ]}
          />
        ) : undefined}
        graph={hasValues ? (
          <GraphPanel
            title={`${circuitType.charAt(0).toUpperCase() + circuitType.slice(1)} Current Curve`}
            data={graphData}
            xKey="x"
            xAxisLabel="Time (s)"
            yKey="y"
            yAxisLabel="Current (A)"
            domainColor="#F59E0B"
          />
        ) : undefined}
      />
    </div>
  );
}