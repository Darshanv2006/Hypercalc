"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep, GraphPanel
} from '@/components/calculator';

export default function QuadraticCalculator() {
  const [a, setA] = useState<number | ''>(1);
  const [b, setB] = useState<number | ''>(-5);
  const [c, setC] = useState<number | ''>(6);

  const hasValues = typeof a === 'number' && typeof b === 'number' && typeof c === 'number' && a !== 0;

  let x1: string | number | null = null;
  let x2: string | number | null = null;
  let discriminant = 0;
  let isComplex = false;

  if (hasValues) {
    const A = a as number;
    const B = b as number;
    const C = c as number;
    discriminant = B * B - 4 * A * C;

    if (discriminant >= 0) {
      x1 = (-B + Math.sqrt(discriminant)) / (2 * A);
      x2 = (-B - Math.sqrt(discriminant)) / (2 * A);
    } else {
      isComplex = true;
      const real = (-B / (2 * A)).toFixed(4);
      const img = (Math.sqrt(-discriminant) / (2 * A)).toFixed(4);
      x1 = `${real} + ${img}i`;
      x2 = `${real} - ${img}i`;
    }
  }

  // Graph Data (Parabola: y = ax^2 + bx + c)
  const graphData = hasValues ? Array.from({ length: 21 }, (_, i) => {
    const A = a as number;
    const B = b as number;
    const C = c as number;
    const vertexX = -B / (2 * A);
    // Plot from vertexX - 5 to vertexX + 5
    const currX = vertexX - 5 + (i * 0.5);
    const currY = A * currX * currX + B * currX + C;
    return {
      x: parseFloat(currX.toFixed(2)),
      y: parseFloat(currY.toFixed(2))
    };
  }) : [];

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Quadratic Equation Calculator"
        description="Calculate the roots (including complex roots) and graph the parabola of ax² + bx + c = 0."
        domainColorClass="text-mathematics"
        inputs={
          <>
            <InputField
              label="Coefficient a"
              symbol="a"
              value={a}
              onChange={setA}
              selectedUnit=""
            />
            <InputField
              label="Coefficient b"
              symbol="b"
              value={b}
              onChange={setB}
              selectedUnit=""
            />
            <InputField
              label="Constant c"
              symbol="c"
              value={c}
              onChange={setC}
              selectedUnit=""
            />
          </>
        }
        outputs={
          <>
             <OutputField
               label="Root 1"
               symbol="x₁"
               value={x1}
               unit=""
               sigFigs={4}
             />
             <OutputField
               label="Root 2"
               symbol="x₂"
               value={x2}
               unit=""
               sigFigs={4}
             />
             <OutputField
               label="Discriminant"
               symbol="Δ"
               value={hasValues ? discriminant : null}
               unit=""
               sigFigs={4}
             />
          </>
        }
        formula={
          <FormulaDisplay 
            formula="x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" 
            formulaId="math_07"
          />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate the discriminant (Δ):',
                formula: '\\Delta = b^2 - 4ac',
                substitution: `\\Delta = (${b})^2 - 4(${a})(${c})`,
                result: `\\Delta = ${discriminant}`
              },
              {
                description: isComplex ? 'Discriminant is negative, so roots are complex.' : 'Calculate the roots using the quadratic formula:',
                formula: 'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}',
                substitution: `x = \\frac{-(${b}) \\pm \\sqrt{${discriminant}}}{2(${a})}`,
                result: `x_1 = ${x1}, \\quad x_2 = ${x2}`
              }
            ]}
          />
        ) : undefined}
        graph={hasValues ? (
          <GraphPanel
            title="Parabola Graph (y = ax² + bx + c)"
            data={graphData}
            xKey="x"
            xAxisLabel="x"
            yKey="y"
            yAxisLabel="y"
            domainColor="#6366F1" // mathematics indigo
          />
        ) : undefined}
      />
    </div>
  );
}
