"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField
} from '@/components/calculator';

export default function BaseConverterPage() {
  const [decimalInput, setDecimalInput] = useState<number | ''>(42);

  const binary = typeof decimalInput === 'number' ? decimalInput.toString(2) : '';
  const octal = typeof decimalInput === 'number' ? decimalInput.toString(8) : '';
  const hexadecimal = typeof decimalInput === 'number' ? decimalInput.toString(16).toUpperCase() : '';

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Number Base Converter"
        description="Convert decimal numbers to binary, octal, and hexadecimal."
        domainColorClass="text-cs"
        inputs={
          <>
            <InputField
              label="Decimal Number"
              value={decimalInput}
              onChange={setDecimalInput}
              units={[{ value: '', label: 'Decimal' }]}
              selectedUnit=""
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Binary"
              value={binary}
              unit=""
            />
            <OutputField
              label="Octal"
              value={octal}
              unit=""
            />
            <OutputField
              label="Hexadecimal"
              value={hexadecimal}
              unit=""
            />
          </>
        }
      />
    </div>
  );
}