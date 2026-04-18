"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function MatrixOperationsPage() {
  // Matrix A
  const [a11, setA11] = useState<number | ''>(1);
  const [a12, setA12] = useState<number | ''>(2);
  const [a21, setA21] = useState<number | ''>(3);
  const [a22, setA22] = useState<number | ''>(4);
  // Matrix B
  const [b11, setB11] = useState<number | ''>(0);
  const [b12, setB12] = useState<number | ''>(1);
  const [b21, setB21] = useState<number | ''>(2);
  const [b22, setB22] = useState<number | ''>(3);

  // Helper to check if a value is a valid number
  const isNum = (v: number | ''): v is number => typeof v === 'number' && !isNaN(v);

  // Matrix A values
  const aValid = isNum(a11) && isNum(a12) && isNum(a21) && isNum(a22);
  const aDet = aValid ? (a11 * a22 - a12 * a21) : null;
  const aInvValid = aValid && aDet !== null && aDet !== 0;
  const aInv = aInvValid ? {
    a11: a22 / aDet,
    a12: -a12 / aDet,
    a21: -a21 / aDet,
    a22: a11 / aDet
  } : null;
  const aTran = aValid ? {
    a11: a11,
    a12: a21,
    a21: a12,
    a22: a22
  } : null;

  // Matrix B values
  const bValid = isNum(b11) && isNum(b12) && isNum(b21) && isNum(b22);
  const bDet = bValid ? (b11 * b22 - b12 * b21) : null;
  const bInvValid = bValid && bDet !== null && bDet !== 0;
  const bInv = bInvValid ? {
    b11: b22 / bDet,
    b12: -b12 / bDet,
    b21: -b21 / bDet,
    b22: b11 / bDet
  } : null;
  const bTran = bValid ? {
    b11: b11,
    b12: b21,
    b21: b12,
    b22: b22
  } : null;

  // Matrix multiplication A * B
  const multValid = aValid && bValid;
  const mult = multValid ? {
    c11: a11 * b11 + a12 * b21,
    c12: a11 * b12 + a12 * b22,
    c21: a21 * b11 + a22 * b21,
    c22: a21 * b12 + a22 * b22
  } : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Matrix Operations Calculator (2x2)"
        description="Calculate determinant, inverse, transpose for two matrices and their product."
        domainColorClass="text-mathematics"
        inputs={
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Matrix A</h3>
                <div className="grid grid-cols-2 gap-2">
                  <InputField
                    label="a₁₁"
                    value={a11}
                    onChange={setA11}
                    units={[{ value: '', label: '' }]}
                    selectedUnit=""
                    className="col-span-1"
                  />
                  <InputField
                    label="a₁₂"
                    value={a12}
                    onChange={setA12}
                    units={[{ value: '', label: '' }]}
                    selectedUnit=""
                    className="col-span-1"
                  />
                  <InputField
                    label="a₂₁"
                    value={a21}
                    onChange={setA21}
                    units={[{ value: '', label: '' }]}
                    selectedUnit=""
                    className="col-span-1"
                  />
                  <InputField
                    label="a₂₂"
                    value={a22}
                    onChange={setA22}
                    units={[{ value: '', label: '' }]}
                    selectedUnit=""
                    className="col-span-1"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Matrix B</h3>
                <div className="grid grid-cols-2 gap-2">
                  <InputField
                    label="b₁₁"
                    value={b11}
                    onChange={setB11}
                    units={[{ value: '', label: '' }]}
                    selectedUnit=""
                    className="col-span-1"
                  />
                  <InputField
                    label="b₁₂"
                    value={b12}
                    onChange={setB12}
                    units={[{ value: '', label: '' }]}
                    selectedUnit=""
                    className="col-span-1"
                  />
                  <InputField
                    label="b₂₁"
                    value={b21}
                    onChange={setB21}
                    units={[{ value: '', label: '' }]}
                    selectedUnit=""
                    className="col-span-1"
                  />
                  <InputField
                    label="b₂₂"
                    value={b22}
                    onChange={setB22}
                    units={[{ value: '', label: '' }]}
                    selectedUnit=""
                    className="col-span-1"
                  />
                </div>
              </div>
            </div>
          </>
        }
        outputs={
          <>
            <div className="space-y-6">
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-text-primary mb-4">Matrix A Results</h3>
                <div className="space-y-2">
                  {aDet !== null && (
                    <>
                      <OutputField
                        label="Determinant"
                        symbol="det(A)"
                        value={aDet}
                        unit=""
                        sigFigs={4}
                      />
                    </>
                  )}
                  {aInvValid && (
                    <>
                      <OutputField
                        label="Inverse Element (1,1)"
                        symbol="A⁻¹₁₁"
                        value={aInv!.a11}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Inverse Element (1,2)"
                        symbol="A⁻¹₁₂"
                        value={aInv!.a12}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Inverse Element (2,1)"
                        symbol="A⁻¹₂₁"
                        value={aInv!.a21}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Inverse Element (2,2)"
                        symbol="A⁻¹₂₂"
                        value={aInv!.a22}
                        unit=""
                        sigFigs={4}
                      />
                    </>
                  )}
                  {!aInvValid && aValid && (
                     <OutputField
                       label="Inverse"
                       symbol="A⁻¹"
                       value={null}
                       unit=""
                       className="text-red-500"
                     >
                      Matrix is singular (determinant = 0)
                    </OutputField>
                  )}
                  {aTran && (
                    <>
                      <OutputField
                        label="Transpose Element (1,1)"
                        symbol="Aᵀ₁₁"
                        value={aTran.a11}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Transpose Element (1,2)"
                        symbol="Aᵀ₁₂"
                        value={aTran.a12}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Transpose Element (2,1)"
                        symbol="Aᵀ₂₁"
                        value={aTran.a21}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Transpose Element (2,2)"
                        symbol="Aᵀ₂₂"
                        value={aTran.a22}
                        unit=""
                        sigFigs={4}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-text-primary mb-4">Matrix B Results</h3>
                <div className="space-y-2">
                  {bDet !== null && (
                    <>
                      <OutputField
                        label="Determinant"
                        symbol="det(B)"
                        value={bDet}
                        unit=""
                        sigFigs={4}
                      />
                    </>
                  )}
                  {bInvValid && (
                    <>
                      <OutputField
                        label="Inverse Element (1,1)"
                        symbol="B⁻¹₁₁"
                        value={bInv!.b11}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Inverse Element (1,2)"
                        symbol="B⁻¹₁₂"
                        value={bInv!.b12}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Inverse Element (2,1)"
                        symbol="B⁻¹₂₁"
                        value={bInv!.b21}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Inverse Element (2,2)"
                        symbol="B⁻¹₂₂"
                        value={bInv!.b22}
                        unit=""
                        sigFigs={4}
                      />
                    </>
                  )}
                  {!bInvValid && bValid && (
                     <OutputField
                       label="Inverse"
                       symbol="B⁻¹"
                       value={null}
                       unit=""
                       className="text-red-500"
                     >
                      Matrix is singular (determinant = 0)
                    </OutputField>
                  )}
                  {bTran && (
                    <>
                      <OutputField
                        label="Transpose Element (1,1)"
                        symbol="Bᵀ₁₁"
                        value={bTran.b11}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Transpose Element (1,2)"
                        symbol="Bᵀ₁₂"
                        value={bTran.b12}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Transpose Element (2,1)"
                        symbol="Bᵀ₂₁"
                        value={bTran.b21}
                        unit=""
                        sigFigs={4}
                      />
                      <OutputField
                        label="Transpose Element (2,2)"
                        symbol="Bᵀ₂₂"
                        value={bTran.b22}
                        unit=""
                        sigFigs={4}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-text-primary mb-4">Matrix Multiplication (A × B)</h3>
                {multValid && mult && (
                  <>
                    <OutputField
                      label="Element (1,1)"
                      symbol="(AB)₁₁"
                      value={mult.c11}
                      unit=""
                      sigFigs={4}
                    />
                    <OutputField
                      label="Element (1,2)"
                      symbol="(AB)₁₂"
                      value={mult.c12}
                      unit=""
                      sigFigs={4}
                    />
                    <OutputField
                      label="Element (2,1)"
                      symbol="(AB)₂₁"
                      value={mult.c21}
                      unit=""
                      sigFigs={4}
                    />
                    <OutputField
                      label="Element (2,2)"
                      symbol="(AB)₂₂"
                      value={mult.c22}
                      unit=""
                      sigFigs={4}
                    />
                  </>
                )}
                {!multValid && (
                   <OutputField
                     label="Multiplication"
                     symbol="A × B"
                     value={null}
                     unit=""
                     className="text-red-500"
                   >
                     Invalid matrix values
                   </OutputField>
                 )}
               </div>
             </div>
           </>
        }
        formula={
          <>
            <FormulaDisplay formula="\\text{For matrix } M = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}" />
            <FormulaDisplay formula="\\det(M) = ad - bc" />
            <FormulaDisplay formula="M^{-1} = \\frac{1}{ad-bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\quad (\\text{if } \\det(M) \\neq 0)" />
            <FormulaDisplay formula="M^T = \\begin{bmatrix} a & c \\\\ b & d \\end{bmatrix}" />
            <FormulaDisplay formula="\\text{If } A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}, B = \\begin{bmatrix} e & f \\\\ g & h \\end{bmatrix}" />
            <FormulaDisplay formula="AB = \\begin{bmatrix} ae+bg & af+bh \\\\ ce+dg & cf+dh \\end{bmatrix}" />
          </>
        }
        steps={aValid || bValid || multValid ? (
          <StepByStep
            steps={[
              ...(aValid ? [
                {
                  description: 'Step 1: Calculate determinant of matrix A:',
                  formula: '\\det(A) = a_{11}a_{22} - a_{12}a_{21}'
                },
                {
                  description: 'Substitute values:',
                  substitution: `\\det(A) = ${a11} \\times ${a22} - ${a12} \\times ${a21} = ${aDet}`
                },
                ...(aInvValid ? [
                  {
                    description: 'Step 2: Calculate inverse of matrix A (since det(A) ≠ 0):',
                    formula: 'A^{-1} = \\frac{1}{\\det(A)} \\begin{bmatrix} a_{22} & -a_{12} \\\\ -a_{21} & a_{11} \\end{bmatrix}'
                  },
                  {
                    description: 'Substitute values:',
                    substitution: `A^{-1} = \\frac{1}{${aDet}} \\begin{bmatrix} ${a22} & -${a12} \\\\ -${a21} & ${a11} \\end{bmatrix} = \\begin{bmatrix} ${aInv!.a11.toFixed(4)} & ${aInv!.a12.toFixed(4)} \\\\ ${aInv!.a21.toFixed(4)} & ${aInv!.a22.toFixed(4)} \\end{bmatrix}`
                  }
                ] : []),
                {
                  description: 'Step 3: Calculate transpose of matrix A:',
                  formula: 'A^T = \\begin{bmatrix} a_{11} & a_{21} \\\\ a_{12} & a_{22} \\end{bmatrix}'
                },
                {
                  description: 'Substitute values:',
                  substitution: `A^T = \\begin{bmatrix} ${a11} & ${a21} \\\\ ${a12} & ${a22} \\end{bmatrix}`
                }
              ] : []),
              ...(bValid ? [
                {
                  description: 'Step 4: Calculate determinant of matrix B:',
                  formula: '\\det(B) = b_{11}b_{22} - b_{12}b_{21}'
                },
                {
                  description: 'Substitute values:',
                  substitution: `\\det(B) = ${b11} \\times ${b22} - ${b12} \\times ${b21} = ${bDet}`
                },
                ...(bInvValid ? [
                  {
                    description: 'Step 5: Calculate inverse of matrix B (since det(B) ≠ 0):',
                    formula: 'B^{-1} = \\frac{1}{\\det(B)} \\begin{bmatrix} b_{22} & -b_{12} \\\\ -b_{21} & b_{11} \\end{bmatrix}'
                  },
                  {
                    description: 'Substitute values:',
                    substitution: `B^{-1} = \\frac{1}{${bDet}} \\begin{bmatrix} ${b22} & -${b12} \\\\ -${b21} & ${b11} \\end{bmatrix} = \\begin{bmatrix} ${bInv!.b11.toFixed(4)} & ${bInv!.b12.toFixed(4)} \\\\ ${bInv!.b21.toFixed(4)} & ${bInv!.b22.toFixed(4)} \\end{bmatrix}`
                  }
                ] : []),
                {
                  description: 'Step 6: Calculate transpose of matrix B:',
                  formula: 'B^T = \\begin{bmatrix} b_{11} & b_{21} \\\\ b_{12} & b_{22} \\end{bmatrix}'
                },
                {
                  description: 'Substitute values:',
                  substitution: `B^T = \\begin{bmatrix} ${b11} & ${b21} \\\\ ${b12} & ${b22} \\end{bmatrix}`
                }
              ] : []),
              ...(multValid ? [
                {
                  description: 'Step 7: Calculate matrix product A × B:',
                  formula: '(AB)_{ij} = \\sum_{k=1}^{2} a_{ik} b_{kj}'
                },
                {
                  description: 'Calculate each element:',
                  result: `(AB)_{11} = a_{11}b_{11} + a_{12}b_{21} = ${a11} \\times ${b11} + ${a12} \\times ${b21} = ${mult.c11}\\\\` +
                          `(AB)_{12} = a_{11}b_{12} + a_{12}b_{22} = ${a11} \\times ${b12} + ${a12} \\times ${b22} = ${mult.c12}\\\\` +
                          `(AB)_{21} = a_{21}b_{11} + a_{22}b_{21} = ${a21} \\times ${b11} + ${a22} \\times ${b21} = ${mult.c21}\\\\` +
                          `(AB)_{22} = a_{21}b_{12} + a_{22}b_{22} = ${a21} \\times ${b12} + ${a22} \\times ${b22} = ${mult.c22}`
                }
              ] : [])
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}