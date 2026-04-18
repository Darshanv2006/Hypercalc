"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep, GraphPanel
} from '@/components/calculator';

type RCCircuitType = 'charging' | 'discharging';

export default function RCCircuitPage() {
  const [resistance, setResistance] = useState<number | ''>(1000); // Ω
  const [capacitance, setCapacitance] = useState<number | ''>(0.001); // F
  const [voltage, setVoltage] = useState<number | ''>(10); // V
  const [circuitType, setCircuitType] = useState<RCCircuitType>('charging');
  const [time, setTime] = useState<number | ''>(0.005); // s

  // Calculate time constant τ = R C
  const hasValues = typeof resistance === 'number' && typeof capacitance === 'number' && typeof voltage === 'number';
  const timeConstant = hasValues ? resistance * capacitance : null;

  // Calculate voltage at time t
  const voltageAtTime = hasValues && typeof time === 'number' && timeConstant ?
                        (circuitType === 'charging' ?
                         voltage * (1 - Math.exp(-time / timeConstant)) :
                         voltage * Math.exp(-time / timeConstant)) : null;

  // Graph Data (Voltage vs Time)
  const graphData = hasValues ? Array.from({ length: 21 }, (_, i) => {
    const t = (timeConstant! / 20) * i;
    const v = circuitType === 'charging' ?
              (voltage as number) * (1 - Math.exp(-t / timeConstant!)) :
              (voltage as number) * Math.exp(-t / timeConstant!);
    return {
      x: parseFloat(t.toFixed(6)),
      y: parseFloat(v.toFixed(4))
    };
  }) : [];

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="RC Circuit Calculator"
        description={`Calculate time constant and ${circuitType} voltage in RC circuits.`}
        domainColorClass="text-electrical"
        inputs={
          <>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-text-secondary mb-2">Circuit Type</label>
              <select
                value={circuitType}
                onChange={(e) => setCircuitType(e.target.value as RCCircuitType)}
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
              label="Capacitance"
              symbol="C"
              value={capacitance}
              onChange={setCapacitance}
              units={[{ value: 'F', label: 'Farads (F)' }]}
              selectedUnit="F"
            />
            <InputField
              label="Initial/Final Voltage"
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
              label={`Capacitor Voltage at t=${time}s`}
              symbol="V_c"
              value={voltageAtTime}
              unit="V"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula={
            circuitType === 'charging' ?
            "\\tau = R C, \\quad V_c(t) = V (1 - e^{-t/\\tau})" :
            "\\tau = R C, \\quad V_c(t) = V e^{-t/\\tau}"
          } />
        }
        steps={hasValues && typeof time === 'number' ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the time constant:',
                formula: '\\tau = R C',
                substitution: `\\tau = ${resistance} \\cdot ${capacitance}`,
                result: `\\tau = ${timeConstant}\\text{ s}`
              },
              {
                description: `Calculate capacitor voltage for ${circuitType}:`,
                formula: circuitType === 'charging' ? 'V_c(t) = V (1 - e^{-t/\\tau})' : 'V_c(t) = V e^{-t/\\tau}',
                substitution: `V_c(${time}) = ${voltage} ${circuitType === 'charging' ? '(1 - ' : ''}e^{-${time}/${timeConstant}}${circuitType === 'charging' ? ')' : ''}`,
                result: `V_c = ${voltageAtTime}\\text{ V}`
              }
            ]}
          />
        ) : undefined}
        graph={hasValues ? (
          <GraphPanel
            title={`${circuitType.charAt(0).toUpperCase() + circuitType.slice(1)} Curve`}
            data={graphData}
            xKey="x"
            xAxisLabel="Time (s)"
            yKey="y"
            yAxisLabel="Capacitor Voltage (V)"
            domainColor="#F59E0B"
          />
        ) : undefined}
      />
    </div>
  );
}