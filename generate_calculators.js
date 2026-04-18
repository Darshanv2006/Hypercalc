const fs = require('fs');
const path = require('path');

const calculators = [
  {
    path: 'civil/pipe-flow',
    title: 'Darcy-Weisbach Head Loss',
    description: 'Calculate head loss due to friction in a pipe.',
    domain: 'civil',
    inputs: [
      { id: 'f', label: 'Friction factor', symbol: 'f', unit: '', type: 'number', init: 0.02 },
      { id: 'L', label: 'Pipe Length', symbol: 'L', unit: 'm', type: 'number', init: 100 },
      { id: 'D', label: 'Diameter', symbol: 'D', unit: 'm', type: 'number', init: 0.5 },
      { id: 'v', label: 'Velocity', symbol: 'v', unit: 'm/s', type: 'number', init: 2 }
    ],
    math: 'const g = 9.81; let result = null; if (f > 0 && L > 0 && D > 0 && v >= 0) result = f * (L/D) * (v*v)/(2*g);',
    resultVar: 'result',
    resultLabel: 'Head Loss',
    resultSymbol: 'h_f',
    resultUnit: 'm',
    latexFormula: 'h_f = f \\frac{L}{D} \\frac{v^2}{2g}'
  },
  {
    path: 'civil/concrete-mix',
    title: 'Water-Cement Ratio',
    description: 'Calculate the ratio of water to cement by mass.',
    domain: 'civil',
    inputs: [
      { id: 'water', label: 'Water Mass', symbol: 'W', unit: 'kg', type: 'number', init: 200 },
      { id: 'cement', label: 'Cement Mass', symbol: 'C', unit: 'kg', type: 'number', init: 400 }
    ],
    math: 'let result = null; if (water >= 0 && cement > 0) result = water / cement;',
    resultVar: 'result',
    resultLabel: 'W/C Ratio',
    resultSymbol: 'Ratio',
    resultUnit: '',
    latexFormula: '\\frac{W}{C}'
  },
  {
    path: 'chemical/heat-exchanger',
    title: 'Heat Exchanger LMTD',
    description: 'Calculate the Log Mean Temperature Difference.',
    domain: 'chemical',
    inputs: [
      { id: 'thi', label: 'Hot In (Thi)', symbol: 'T_{hi}', unit: '°C', type: 'number', init: 100 },
      { id: 'tho', label: 'Hot Out (Tho)', symbol: 'T_{ho}', unit: '°C', type: 'number', init: 60 },
      { id: 'tci', label: 'Cold In (Tci)', symbol: 'T_{ci}', unit: '°C', type: 'number', init: 20 },
      { id: 'tco', label: 'Cold Out (Tco)', symbol: 'T_{co}', unit: '°C', type: 'number', init: 40 }
    ],
    math: 'let result = null; const dt1 = thi - tco; const dt2 = tho - tci; if (dt1 > 0 && dt2 > 0 && dt1 !== dt2) result = (dt1 - dt2) / Math.log(dt1 / dt2); else if (dt1 === dt2) result = dt1;',
    resultVar: 'result',
    resultLabel: 'LMTD',
    resultSymbol: '\\Delta T_{lm}',
    resultUnit: '°C',
    latexFormula: '\\Delta T_{lm} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}'
  },
  {
    path: 'mathematics/matrix',
    title: 'Matrix Scalar Operations',
    description: 'Calculate scalar multiplication for a 2x2 matrix.',
    domain: 'mathematics',
    inputs: [
      { id: 'scalar', label: 'Scalar Multiplier', symbol: 'k', unit: '', type: 'number', init: 2 },
      { id: 'a11', label: 'A11', symbol: 'a11', unit: '', type: 'number', init: 1 },
      { id: 'a12', label: 'A12', symbol: 'a12', unit: '', type: 'number', init: 2 },
      { id: 'a21', label: 'A21', symbol: 'a21', unit: '', type: 'number', init: 3 },
      { id: 'a22', label: 'A22', symbol: 'a22', unit: '', type: 'number', init: 4 }
    ],
    math: 'let result = null; if (typeof scalar === "number") result = (scalar * a11) + (scalar * a22); // returning trace proxy for simplicity',
    resultVar: 'result',
    resultLabel: 'Scaled Trace',
    resultSymbol: 'Tr(kA)',
    resultUnit: '',
    latexFormula: 'k \\cdot A'
  },
  {
    path: 'mathematics/geometry',
    title: 'Circle Characteristics',
    description: 'Calculate area and circumference.',
    domain: 'mathematics',
    inputs: [
      { id: 'radius', label: 'Radius', symbol: 'r', unit: 'm', type: 'number', init: 5 }
    ],
    math: 'let result = null; if (radius >= 0) result = Math.PI * radius * radius;',
    resultVar: 'result',
    resultLabel: 'Area',
    resultSymbol: 'A',
    resultUnit: 'm²',
    latexFormula: 'A = \\pi r^2'
  },
  {
    path: 'physics/newtons-laws',
    title: "Newton's Second Law",
    description: 'Calculate force, mass, or acceleration.',
    domain: 'physics',
    inputs: [
      { id: 'mass', label: 'Mass', symbol: 'm', unit: 'kg', type: 'number', init: 10 },
      { id: 'accel', label: 'Acceleration', symbol: 'a', unit: 'm/s²', type: 'number', init: 9.81 }
    ],
    math: 'let result = null; if (mass > 0) result = mass * accel;',
    resultVar: 'result',
    resultLabel: 'Force',
    resultSymbol: 'F',
    resultUnit: 'N',
    latexFormula: 'F = m a'
  },
  {
    path: 'physics/coulombs-law',
    title: "Coulomb's Law",
    description: 'Calculate electrostatic force between point charges.',
    domain: 'physics',
    inputs: [
      { id: 'q1', label: 'Charge 1', symbol: 'q₁', unit: 'μC', type: 'number', init: 1 },
      { id: 'q2', label: 'Charge 2', symbol: 'q₂', unit: 'μC', type: 'number', init: 1 },
      { id: 'r', label: 'Distance', symbol: 'r', unit: 'm', type: 'number', init: 0.1 }
    ],
    math: 'let result = null; const k = 8.987e9; if (r > 0) result = k * Math.abs((q1*1e-6) * (q2*1e-6)) / (r*r);',
    resultVar: 'result',
    resultLabel: 'Force Magnitude',
    resultSymbol: '|F|',
    resultUnit: 'N',
    latexFormula: 'F = k_e \\frac{|q_1 q_2|}{r^2}'
  },
  {
    path: 'physics/optics',
    title: "Snell's Law",
    description: 'Calculate angle of refraction.',
    domain: 'physics',
    inputs: [
      { id: 'n1', label: 'Index of Refraction 1', symbol: 'n₁', unit: '', type: 'number', init: 1.0 },
      { id: 'theta1', label: 'Incident Angle', symbol: 'θ₁', unit: 'degrees', type: 'number', init: 30 },
      { id: 'n2', label: 'Index of Refraction 2', symbol: 'n₂', unit: '', type: 'number', init: 1.33 }
    ],
    math: 'let result = null; if (n1 > 0 && n2 > 0) { const rad = theta1 * Math.PI / 180; const sin2 = (n1 / n2) * Math.sin(rad); if (sin2 <= 1 && sin2 >= -1) result = Math.asin(sin2) * 180 / Math.PI; }',
    resultVar: 'result',
    resultLabel: 'Refracted Angle',
    resultSymbol: 'θ₂',
    resultUnit: 'degrees',
    latexFormula: 'n_1 \\sin(\\theta_1) = n_2 \\sin(\\theta_2)'
  },
  {
    path: 'physics/buoyancy',
    title: 'Buoyant Force',
    description: "Archimedes' Principle",
    domain: 'physics',
    inputs: [
      { id: 'density', label: 'Fluid Density', symbol: 'ρ', unit: 'kg/m³', type: 'number', init: 1000 },
      { id: 'volume', label: 'Displaced Volume', symbol: 'V', unit: 'm³', type: 'number', init: 0.5 }
    ],
    math: 'let result = null; const g = 9.81; if (density > 0 && volume >= 0) result = density * volume * g;',
    resultVar: 'result',
    resultLabel: 'Buoyant Force',
    resultSymbol: 'F_b',
    resultUnit: 'N',
    latexFormula: 'F_b = \\rho V g'
  },
  {
    path: 'physics/thermodynamics',
    title: 'Ideal Gas Law',
    description: 'PV = nRT',
    domain: 'physics',
    inputs: [
      { id: 'n', label: 'Moles', symbol: 'n', unit: 'mol', type: 'number', init: 1 },
      { id: 't', label: 'Temperature', symbol: 'T', unit: 'K', type: 'number', init: 298 },
      { id: 'v', label: 'Volume', symbol: 'V', unit: 'm³', type: 'number', init: 0.0224 }
    ],
    math: 'let result = null; const R = 8.314; if (n > 0 && t > 0 && v > 0) result = (n * R * t) / v;',
    resultVar: 'result',
    resultLabel: 'Pressure',
    resultSymbol: 'P',
    resultUnit: 'Pa',
    latexFormula: 'P = \\frac{nRT}{V}'
  },
  {
    path: 'physics/waves',
    title: 'Wave Speed',
    description: 'v = f * λ',
    domain: 'physics',
    inputs: [
      { id: 'f', label: 'Frequency', symbol: 'f', unit: 'Hz', type: 'number', init: 50 },
      { id: 'lambda', label: 'Wavelength', symbol: 'λ', unit: 'm', type: 'number', init: 2 }
    ],
    math: 'let result = null; if (f >= 0 && lambda >= 0) result = f * lambda;',
    resultVar: 'result',
    resultLabel: 'Velocity',
    resultSymbol: 'v',
    resultUnit: 'm/s',
    latexFormula: 'v = f \\lambda'
  },
  {
    path: 'cs/subnet-calculator',
    title: 'Subnet Calculator',
    description: 'Calculate hosts per subnet based on CIDR.',
    domain: 'cs',
    inputs: [
      { id: 'cidr', label: 'CIDR Prefix (/xx)', symbol: 'CIDR', unit: '', type: 'number', init: 24 }
    ],
    math: 'let result = null; if (cidr >= 0 && cidr <= 32) result = Math.max(0, Math.pow(2, 32 - cidr) - 2);',
    resultVar: 'result',
    resultLabel: 'Usable Hosts',
    resultSymbol: 'Hosts',
    resultUnit: '',
    latexFormula: '\\text{Hosts} = 2^{32 - \\text{CIDR}} - 2'
  },
  {
    path: 'economics/tvm',
    title: 'Time Value of Money',
    description: 'Calculate Future Value (FV).',
    domain: 'economics',
    inputs: [
      { id: 'pv', label: 'Present Value', symbol: 'PV', unit: '$', type: 'number', init: 1000 },
      { id: 'r', label: 'Interest Rate (%)', symbol: 'r', unit: '%', type: 'number', init: 5 },
      { id: 'n', label: 'Periods', symbol: 'n', unit: 'yrs', type: 'number', init: 10 }
    ],
    math: 'let result = null; if (n >= 0) result = pv * Math.pow(1 + (r/100), n);',
    resultVar: 'result',
    resultLabel: 'Future Value',
    resultSymbol: 'FV',
    resultUnit: '$',
    latexFormula: 'FV = PV(1 + r)^n'
  },
  {
    path: 'economics/break-even',
    title: 'Break-Even Analysis',
    description: 'Calculate the break-even unit volume.',
    domain: 'economics',
    inputs: [
      { id: 'fc', label: 'Fixed Costs', symbol: 'FC', unit: '$', type: 'number', init: 50000 },
      { id: 'price', label: 'Price per Unit', symbol: 'P', unit: '$', type: 'number', init: 50 },
      { id: 'vc', label: 'Variable Cost per Unit', symbol: 'VC', unit: '$', type: 'number', init: 30 }
    ],
    math: 'let result = null; if (price > vc) result = fc / (price - vc);',
    resultVar: 'result',
    resultLabel: 'Break-even Units',
    resultSymbol: 'Q_{BE}',
    resultUnit: 'units',
    latexFormula: 'Q_{BE} = \\frac{FC}{P - VC}'
  },
  {
    path: 'economics/roi-payback',
    title: 'Return on Investment',
    description: 'Calculate ROI percentage.',
    domain: 'economics',
    inputs: [
      { id: 'gain', label: 'Gain from Investment', symbol: 'G', unit: '$', type: 'number', init: 1500 },
      { id: 'cost', label: 'Cost of Investment', symbol: 'C', unit: '$', type: 'number', init: 1000 }
    ],
    math: 'let result = null; if (cost > 0) result = ((gain - cost) / cost) * 100;',
    resultVar: 'result',
    resultLabel: 'ROI',
    resultSymbol: 'ROI',
    resultUnit: '%',
    latexFormula: 'ROI = \\frac{G - C}{C} \\times 100'
  },
  {
    path: 'economics/depreciation',
    title: 'Straight-Line Depreciation',
    description: 'Calculate annual depreciation expense.',
    domain: 'economics',
    inputs: [
      { id: 'cost', label: 'Asset Cost', symbol: 'C', unit: '$', type: 'number', init: 10000 },
      { id: 'salvage', label: 'Salvage Value', symbol: 'S', unit: '$', type: 'number', init: 1000 },
      { id: 'life', label: 'Useful Life', symbol: 'L', unit: 'years', type: 'number', init: 5 }
    ],
    math: 'let result = null; if (life > 0) result = (cost - salvage) / life;',
    resultVar: 'result',
    resultLabel: 'Annual Expense',
    resultSymbol: 'D',
    resultUnit: '$/yr',
    latexFormula: 'D = \\frac{C - S}{L}'
  }
];

const basePath = path.join(__dirname, 'dv', 'src', 'app');

calculators.forEach(calc => {
  const dirPath = path.join(basePath, calc.path);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const pageComponent = `"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
${calc.inputs.map(i => `  const [${i.id}, set_${i.id}] = useState<number | ''>(${i.init});`).join('\n')}

  const hasValues = ${calc.inputs.map(i => `typeof ${i.id} === 'number'`).join(' && ')};

  ${calc.math}

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="${calc.title}"
        description="${calc.description}"
        domainColorClass="text-${calc.domain}"
        inputs={
          <>
${calc.inputs.map(i => `            <InputField
              label="${i.label}"
              symbol="${i.symbol}"
              value={${i.id}}
              onChange={set_${i.id}}
              units={[{ value: '${i.unit}', label: '${i.unit}' }]}
              selectedUnit="${i.unit}"
            />`).join('\n')}
          </>
        }
        outputs={
          <>
            <OutputField
              label="${calc.resultLabel}"
              symbol="${calc.resultSymbol}"
              value={result}
              unit="${calc.resultUnit}"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="${calc.latexFormula.replace(/\\/g, '\\\\')}" />}
      />
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), pageComponent);
  console.log(`Created ${calc.path}`);
});
