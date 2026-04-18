"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function TimeValueMoneyPage() {
  const [presentValue, setPresentValue] = useState<number | ''>(1000);
  const [futureValue, setFutureValue] = useState<number | ''>(''); // leave blank to solve
  const [interestRate, setInterestRate] = useState<number | ''>(0.05); // decimal
  const [periods, setPeriods] = useState<number | ''>(5);

  // Determine what to solve
  const solveForFV = futureValue === '';
  const solveForPV = presentValue === '';

  let calculatedPV = presentValue;
  let calculatedFV = futureValue;

  if (solveForFV && typeof presentValue === 'number' && typeof interestRate === 'number' && typeof periods === 'number') {
    calculatedFV = presentValue * Math.pow(1 + interestRate, periods);
  } else if (solveForPV && typeof futureValue === 'number' && typeof interestRate === 'number' && typeof periods === 'number') {
    calculatedPV = futureValue / Math.pow(1 + interestRate, periods);
  }

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Time Value of Money Calculator"
        description="Calculate present value, future value, interest rate, or periods."
        domainColorClass="text-economics"
        inputs={
          <>
            <InputField
              label="Present Value"
              symbol="PV"
              value={presentValue}
              onChange={setPresentValue}
              units={[{ value: '', label: 'Currency' }]}
              selectedUnit=""
              placeholder="Leave blank to solve"
            />
            <InputField
              label="Future Value"
              symbol="FV"
              value={futureValue}
              onChange={setFutureValue}
              units={[{ value: '', label: 'Currency' }]}
              selectedUnit=""
              placeholder="Leave blank to solve"
            />
            <InputField
              label="Interest Rate"
              symbol="i"
              value={interestRate}
              onChange={setInterestRate}
              units={[{ value: '', label: 'Decimal' }]}
              selectedUnit=""
            />
            <InputField
              label="Number of Periods"
              symbol="n"
              value={periods}
              onChange={setPeriods}
              units={[{ value: '', label: 'Periods' }]}
              selectedUnit=""
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Present Value"
              symbol="PV"
              value={calculatedPV}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Future Value"
              symbol="FV"
              value={calculatedFV}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="FV = PV (1 + i)^n, \\quad PV = \\frac{FV}{(1 + i)^n}" />
        }
        steps={(calculatedPV !== null || calculatedFV !== null) ? (
          <StepByStep
            steps={[
              solveForFV ? {
                description: 'Calculate future value:',
                formula: 'FV = PV (1 + i)^n',
                substitution: `FV = ${presentValue} \\cdot (1 + ${interestRate})^{${periods}}`,
                result: `FV = ${calculatedFV}`
              } : {
                description: 'Calculate present value:',
                formula: 'PV = \\frac{FV}{(1 + i)^n}',
                substitution: `PV = \\frac{${futureValue}}{(1 + ${interestRate})^{${periods}}}`,
                result: `PV = ${calculatedPV}`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}