"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, OutputField,
  FormulaDisplay
} from '@/components/calculator';

const mixDesigns = {
  M15: { cement: 290, sand: 822, aggregate: 1232, water: 145 },
  M20: { cement: 400, sand: 645, aggregate: 1230, water: 200 },
  M25: { cement: 500, sand: 715, aggregate: 1280, water: 250 },
  M30: { cement: 550, sand: 760, aggregate: 1360, water: 275 }
};

export default function ConcreteMixDesignPage() {
  const [grade, setGrade] = useState<'M15' | 'M20' | 'M25' | 'M30'>('M20');

  const mix = mixDesigns[grade];
  const totalVolume = 1; // m³

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Concrete Mix Design Calculator"
        description="Get standard mix proportions for different concrete grades."
        domainColorClass="text-civil"
        inputs={
          <>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-text-secondary mb-2">Concrete Grade</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as 'M15' | 'M20' | 'M25' | 'M30')}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border"
              >
                <option value="M15">M15 (15 MPa)</option>
                <option value="M20">M20 (20 MPa)</option>
                <option value="M25">M25 (25 MPa)</option>
                <option value="M30">M30 (30 MPa)</option>
              </select>
            </div>
          </>
        }
        outputs={
          <>
            <OutputField
              label="Cement"
              value={mix.cement}
              unit="kg/m³"
            />
            <OutputField
              label="Sand"
              value={mix.sand}
              unit="kg/m³"
            />
            <OutputField
              label="Aggregate"
              value={mix.aggregate}
              unit="kg/m³"
            />
            <OutputField
              label="Water"
              value={mix.water}
              unit="L/m³"
            />
            <OutputField
              label="Water-Cement Ratio"
              value={mix.water / mix.cement}
              unit=""
              sigFigs={3}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="\\text{Mix proportions per m}^3\\text{ of concrete}" />
        }
      />
    </div>
  );
}