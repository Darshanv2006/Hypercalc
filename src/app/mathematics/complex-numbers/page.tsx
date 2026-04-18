"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function ComplexNumbersPage() {
  // First complex number: a + bi
  const [aReal, setAReal] = useState<number | ''>(3);
  const [aImag, setAImag] = useState<number | ''>(4);
  // Second complex number: c + di
  const [cReal, setCReal] = useState<number | ''>(1);
  const [dImag, setDImag] = useState<number | ''>(2);
  // Operation selector
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide' | 'magnitude' | 'argument' | 'conjugate'>('add');

  // Helper to check if value is valid number
  const isNum = (v: number | ''): v is number => typeof v === 'number' && !isNaN(v);

  // Check if inputs are valid
  const aValid = isNum(aReal) && isNum(aImag);
  const bValid = isNum(cReal) && isNum(dImag); // using cReal, dImag for second complex

  // Complex number operations
  let resultReal: number | null = null;
  let resultImag: number | null = null;
  let magnitude: number | null = null;
  let argument: number | null = null; // in radians
  let error: string | null = null;

  // Perform selected operation
  if (operation === 'add' || operation === 'subtract' || operation === 'multiply' || operation === 'divide') {
    if (!aValid || !bValid) {
      error = 'Please enter valid numbers for both complex numbers';
    } else {
      const a = aReal!;
      const b = aImag!;
      const c = cReal!;
      const d = dImag!;

      if (operation === 'add') {
        resultReal = a + c;
        resultImag = b + d;
      } else if (operation === 'subtract') {
        resultReal = a - c;
        resultImag = b - d;
      } else if (operation === 'multiply') {
        resultReal = a * c - b * d;
        resultImag = a * d + b * c;
      } else if (operation === 'divide') {
        const denom = c * c + d * d;
        if (Math.abs(denom) < 1e-10) {
          error = 'Cannot divide by zero complex number';
        } else {
          resultReal = (a * c + b * d) / denom;
          resultImag = (b * c - a * d) / denom;
        }
      }
    }
  } else if (operation === 'magnitude' || operation === 'argument' || operation === 'conjugate') {
    if (!aValid) {
      error = 'Please enter valid numbers for the complex number';
    } else {
      const a = aReal!;
      const b = aImag!;
      if (operation === 'magnitude') {
        magnitude = Math.sqrt(a * a + b * b);
      } else if (operation === 'argument') {
        argument = Math.atan2(b, a);
      } else if (operation === 'conjugate') {
        resultReal = a;
        resultImag = -b;
      }
    }
  }

  // Format complex number for display
  const formatComplex = (real: number, imag: number): string => {
    if (Math.abs(imag) < 1e-10) return real.toFixed(4);
    if (Math.abs(real) < 1e-10) return `${imag.toFixed(4)}i`;
    const imagSign = imag >= 0 ? '+' : '';
    return `${real.toFixed(4)}${imagSign}${imag.toFixed(4)}i`;
  };

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Complex Numbers Calculator"
        description="Perform arithmetic operations and calculate properties of complex numbers."
        domainColorClass="text-mathematics"
        inputs={
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-2">Operation</label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as 'add' | 'subtract' | 'multiply' | 'divide' | 'magnitude' | 'argument' | 'conjugate')}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border"
              >
                <option value="add">Addition (z₁ + z₂)</option>
                <option value="subtract">Subtraction (z₁ - z₂)</option>
                <option value="multiply">Multiplication (z₁ × z₂)</option>
                <option value="divide">Division (z₁ ÷ z₂)</option>
                <option value="magnitude">Magnitude |z₁|</option>
                <option value="argument">Argument arg(z₁)</option>
                <option value="conjugate">Conjugate z̄₁</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">First Complex Number (z₁)</h3>
                <div className="space-y-3">
                  <InputField
                    label="Real part (a)"
                    symbol="Re(z₁)"
                    value={aReal}
                    onChange={setAReal}
                    units={[{ value: '', label: '' }]}
                    selectedUnit=""
                  />
                  <InputField
                    label="Imaginary part (b)"
                    symbol="Im(z₁)"
                    value={aImag}
                    onChange={setAImag}
                    units={[{ value: '', label: '' }]}
                    selectedUnit=""
                  />
                </div>
                {aValid && (
                  <div className="mt-3 p-3 bg-surface rounded-lg">
                    <div className="font-medium">z₁ = {formatComplex(aReal!, aImag!)}</div>
                  </div>
                )}
              </div>
              {(operation === 'add' || operation === 'subtract' || operation === 'multiply' || operation === 'divide') && (
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Second Complex Number (z₂)</h3>
                  <div className="space-y-3">
                    <InputField
                      label="Real part (c)"
                      symbol="Re(z₂)"
                      value={cReal}
                      onChange={setCReal}
                      units={[{ value: '', label: '' }]}
                      selectedUnit=""
                    />
                    <InputField
                      label="Imaginary part (d)"
                      symbol="Im(z₂)"
                      value={dImag}
                      onChange={setDImag}
                      units={[{ value: '', label: '' }]}
                      selectedUnit=""
                    />
                  </div>
                  {bValid && (
                    <div className="mt-3 p-3 bg-surface rounded-lg">
                      <div className="font-medium">z₂ = {formatComplex(cReal!, dImag!)}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        }
        outputs={
          <>
            {error && (
              <div className="mb-4 p-3 bg-red-50 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}
            {!error && (
              <>
                {(operation === 'add' || operation === 'subtract' || operation === 'multiply' || operation === 'divide') && resultReal !== null && resultImag !== null && (
                  <>
                    <OutputField
                      label="Result (Real Part)"
                      symbol="Re(Result)"
                      value={resultReal}
                      unit=""
                      sigFigs={6}
                    />
                    <OutputField
                      label="Result (Imaginary Part)"
                      symbol="Im(Result)"
                      value={resultImag}
                      unit=""
                      sigFigs={6}
                    />
                     <OutputField
                       label="Result (Complex Form)"
                       symbol="z"
                       value={null}
                       unit=""
                       className="font-mono"
                     >
                      {formatComplex(resultReal!, resultImag!)}
                    </OutputField>
                  </>
                )}
                {operation === 'magnitude' && magnitude !== null && (
                  <>
                    <OutputField
                      label="Magnitude"
                      symbol="|z₁|"
                      value={magnitude}
                      unit=""
                      sigFigs={6}
                    />
                  </>
                )}
                {operation === 'argument' && argument !== null && (
                  <>
                    <OutputField
                      label="Argument (radians)"
                      symbol="arg(z₁)"
                      value={argument}
                      unit="rad"
                      sigFigs={6}
                    />
                    <OutputField
                      label="Argument (degrees)"
                      symbol="arg(z₁)"
                      value={(argument! * 180) / Math.PI}
                      unit="°"
                      sigFigs={4}
                    />
                  </>
                )}
                {operation === 'conjugate' && resultReal !== null && resultImag !== null && (
                  <>
                    <OutputField
                      label="Conjugate (Real Part)"
                      symbol="Re(z̄₁)"
                      value={resultReal}
                      unit=""
                      sigFigs={6}
                    />
                    <OutputField
                      label="Conjugate (Imaginary Part)"
                      symbol="Im(z̄₁)"
                      value={resultImag}
                      unit=""
                      sigFigs={6}
                    />
                     <OutputField
                       label="Conjugate (Complex Form)"
                       symbol="z̄₁"
                       value={null}
                       unit=""
                       className="font-mono"
                     >
                      {formatComplex(resultReal!, resultImag!)}
                    </OutputField>
                  </>
                )}
              </>
            )}
          </>
        }
        formula={
          <>
            <p className="text-sm text-text-secondary mb-2">
              Let z₁ = a + bi and z₂ = c + di where a, b, c, d ∈ ℝ
            </p>
            <FormulaDisplay formula="z_1 + z_2 = (a+c) + (b+d)i" />
            <FormulaDisplay formula="z_1 - z_2 = (a-c) + (b-d)i" />
            <FormulaDisplay formula="z_1 \\times z_2 = (ac - bd) + (ad + bc)i" />
            <FormulaDisplay formula="\\frac{z_1}{z_2} = \\frac{(ac+bd) + (bc-ad)i}{c^2+d^2} \\quad (z_2 \\neq 0)" />
            <FormulaDisplay formula="|z_1| = \\sqrt{a^2 + b^2}" />
            <FormulaDisplay formula="\\arg(z_1) = \\tan^{-1}\\left(\\frac{b}{a}\\right)" />
            <FormulaDisplay formula="\\overline{z_1} = a - bi" />
          </>
        }
        steps={!error ? (
          <StepByStep
            steps={[
              ...((operation === 'add' || operation === 'subtract' || operation === 'multiply' || operation === 'divide') && aValid && bValid ? [
                {
                  description: 'Step 1: Identify the real and imaginary parts:',
                  result: `z_1 = ${aReal!} + ${aImag!}i\\\\z_2 = ${cReal!} + ${dImag!}i`
                },
                {
                  description: `Step 2: Apply the ${operation} operation:`,
                  result: operation === 'add'
                    ? `(z_1 + z_2) = (${aReal!}+${cReal!}) + (${aImag!}+${dImag!})i = ${resultReal!.toFixed(4)} + ${resultImag!.toFixed(4)}i`
                    : operation === 'subtract'
                    ? `(z_1 - z_2) = (${aReal!}-${cReal!}) + (${aImag!}-${dImag!})i = ${resultReal!.toFixed(4)} + ${resultImag!.toFixed(4)}i`
                    : operation === 'multiply'
                    ? `(z_1 × z_2) = (${aReal!}×${cReal!}-${aImag!}×${dImag!}) + (${aReal!}×${dImag!}+${aImag!}×${cReal!})i = ${resultReal!.toFixed(4)} + ${resultImag!.toFixed(4)}i`
                    : operation === 'divide'
                    ? `(z_1 ÷ z_2) = \\frac{${aReal!} + ${aImag!}i}{${cReal!} + ${dImag!}i} = \\frac{(${aReal!}+${aImag!}i)(${cReal!}-${dImag!}i)}{(${cReal!})^2 + (${dImag!})^2} = ${resultReal!.toFixed(4)} + ${resultImag!.toFixed(4)}i`
                    : ''
                }
              ] : []),
              ...((operation === 'magnitude' || operation === 'argument') && aValid ? [
                {
                  description: operation === 'magnitude'
                    ? `Step 1: Calculate the magnitude using |z| = √(a² + b²):`
                    : 'Step 1: Calculate the argument using arg(z) = tan⁻¹(b/a):',
                  result: operation === 'magnitude'
                    ? `\\sqrt{(${aReal!})^2 + (${aImag!})^2} = ${magnitude!.toFixed(4)}`
                    : `\\tan^{-1}\\left(\\frac{${aImag!}}{${aReal!}}\\right) = ${argument!.toFixed(4)}\\,\\text{rad} = ${(argument! * 180 / Math.PI).toFixed(2)}°`
                }
              ] : []),
              ...((operation === 'conjugate') && aValid ? [
                {
                  description: 'Step 1: Calculate the conjugate by negating the imaginary part:',
                  result: `\\overline{z_1} = ${aReal!} - ${aImag!}i = ${resultReal!.toFixed(4)} + ${resultImag!.toFixed(4)}i`
                }
              ] : [])
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}