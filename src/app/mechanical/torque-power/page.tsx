"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function TorquePowerPage() {
  const [torque, setTorque] = useState<number | ''>(50);
  const [torqueUnit, setTorqueUnit] = useState('Nm');
  const [angularVelocity, setAngularVelocity] = useState<number | ''>(100);
  const [angularVelocityUnit, setAngularVelocityUnit] = useState('rad/s');

  // Convert torque to Nm for calculation
  const torqueNm = typeof torque === 'number' ? (torqueUnit === 'Nm' ? torque : torque * 1.35582) : null;

  // Convert angular velocity to rad/s for calculation
  const angularVelocityRads = typeof angularVelocity === 'number' ?
    (angularVelocityUnit === 'rad/s' ? angularVelocity : angularVelocity * (2 * Math.PI) / 60) : null;

  // Calculate Power: P = τ ω
  const hasValues = torqueNm !== null && angularVelocityRads !== null;
  const power = hasValues ? torqueNm * angularVelocityRads : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Torque & Power Calculator"
        description="Calculate power from torque and angular velocity."
        domainColorClass="text-mechanical"
        inputs={
          <>
            <InputField
              label="Torque"
              symbol="τ"
              value={torque}
              onChange={setTorque}
              min={-1e9}
              units={[
                { value: 'Nm', label: 'Newton-meters (N·m)' },
                { value: 'ftlb', label: 'Foot-pounds (ft·lb)' }
              ]}
              selectedUnit={torqueUnit}
              onUnitChange={(unit) => {
                if (unit !== torqueUnit && typeof torque === 'number') {
                  if (unit === 'Nm') {
                    setTorque(torque / 1.35582);
                  } else {
                    setTorque(torque * 1.35582);
                  }
                }
                setTorqueUnit(unit);
              }}
            />
            <InputField
              label="Angular Velocity"
              symbol="ω"
              value={angularVelocity}
              onChange={setAngularVelocity}
              units={[
                { value: 'rad/s', label: 'Radians/second (rad/s)' },
                { value: 'rpm', label: 'RPM' }
              ]}
              selectedUnit={angularVelocityUnit}
              onUnitChange={(unit) => {
                if (unit !== angularVelocityUnit && typeof angularVelocity === 'number') {
                  if (unit === 'rad/s') {
                    setAngularVelocity(angularVelocity * (2 * Math.PI) / 60);
                  } else {
                    setAngularVelocity(angularVelocity * 60 / (2 * Math.PI));
                  }
                }
                setAngularVelocityUnit(unit);
              }}
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Power"
              symbol="P"
              value={power}
              unit="W"
              sigFigs={4}
            />
            <OutputField
              label="Power in kW"
              symbol="P"
              value={power ? power / 1000 : null}
              unit="kW"
              sigFigs={4}
            />
            <OutputField
              label="Power in hp"
              symbol="P"
              value={power ? power / 745.7 : null}
              unit="hp"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="P = \\tau \\omega" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Using the power formula:',
                formula: 'P = \\tau \\omega'
              },
              {
                description: 'Substitute the given values:',
                substitution: `P = ${torque} \\cdot ${angularVelocity}`
              },
              {
                description: 'Calculate the final result:',
                result: `P = ${power}\\text{ W}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}