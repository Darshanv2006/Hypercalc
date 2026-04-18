"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function QuadraticSolverPage() {
  const [a, setA] = useState<number | ''>(1);
  const [b, setB] = useState<number | ''>(-5);
  const [c, setC] = useState<number | ''>(6);

  // Calculate discriminant D = b² - 4ac
  const hasValues = typeof a === 'number' && typeof b === 'number' && typeof c === 'number' && a !== 0;
  const discriminant = hasValues ? b * b - 4 * a * c : null;

  let root1: number | null = null;
  let root2: number | null = null;
  if (hasValues && discriminant !== null) {
    if (discriminant > 0) {
      root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    } else if (discriminant === 0) {
      root1 = root2 = -b / (2 * a);
    }
  }

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Quadratic Equation Solver"
        description="Solve ax² + bx + c = 0 for real roots."
        domainColorClass="text-mathematics"
        inputs={
          <>
            <InputField
              label="Coefficient a"
              value={a}
              onChange={setA}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
            <InputField
              label="Coefficient b"
              value={b}
              onChange={setB}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
            <InputField
              label="Coefficient c"
              value={c}
              onChange={setC}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Discriminant"
              symbol="D"
              value={discriminant}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Root 1"
              symbol="x₁"
              value={root1}
              unit=""
              sigFigs={4}
            />
            <OutputField
              label="Root 2"
              symbol="x₂"
              value={root2}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" />
        }
        steps={hasValues && discriminant !== null ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the discriminant:',
                formula: 'D = b^2 - 4ac',
                substitution: `D = ${b}^2 - 4 \\cdot ${a} \\cdot ${c}`,
                result: `D = ${discriminant}`
              },
              ...(discriminant > 0 ? [
                {
                  description: 'Calculate the roots:',
                  formula: 'x = \\frac{-b \\pm \\sqrt{D}}{2a}',
                  substitution: `x_1 = \\frac{${-b} + \\sqrt{${discriminant}}}{${2 * a}}, \\quad x_2 = \\frac{${-b} - \\sqrt{${discriminant}}}{${2 * a}}`,
                  result: `x_1 = ${root1}, \\quad x_2 = ${root2}`
                }
              ] : discriminant === 0 ? [
                {
                  description: 'Single root (discriminant = 0):',
                  formula: 'x = \\frac{-b}{2a}',
                  substitution: `x = \\frac{${-b}}{${2 * a}}`,
                  result: `x = ${root1}`
                }
              ] : [
                {
                  description: 'No real roots (discriminant < 0)',
                  result: 'No real solutions'
                }
              ])
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}