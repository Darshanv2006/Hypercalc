"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [cidr, set_cidr] = useState<number | ''>(24);

  const hasValues = typeof cidr === 'number';

  let result = null; if (cidr >= 0 && cidr <= 32) result = Math.max(0, Math.pow(2, 32 - cidr) - 2);

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Subnet Calculator"
        description="Calculate hosts per subnet based on CIDR."
        domainColorClass="text-cs"
        inputs={
          <>
            <InputField
              label="CIDR Prefix (/xx)"
              symbol="CIDR"
              value={cidr}
              onChange={set_cidr}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Usable Hosts"
              symbol="Hosts"
              value={result}
              unit=""
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="\\text{Hosts} = 2^{32 - \\text{CIDR}} - 2" />}
      />
    </div>
  );
}
