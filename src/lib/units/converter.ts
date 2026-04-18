import { useState, useEffect } from 'react';

// Conversion factors to SI base/standard units
const CONVERSION_FACTORS: Record<string, Record<string, number>> = {
  length: {
    m: 1,
    cm: 0.01,
    mm: 0.001,
    in: 0.0254,
    ft: 0.3048,
  },
  force: {
    N: 1,
    kN: 1000,
    lbf: 4.44822,
  },
  pressure: {
    Pa: 1,
    kPa: 1000,
    MPa: 1000000,
    bar: 100000,
    psi: 6894.76,
  },
  power: {
    W: 1,
    kW: 1000,
    hp: 745.7,
  },
  angle: {
    rad: 1,
    deg: Math.PI / 180,
  }
};

// Functions to convert to and from SI
export function convertToSI(value: number, fromUnit: string, category: string): number {
  if (category === 'temp') {
    if (fromUnit === 'C') return value + 273.15;
    if (fromUnit === 'F') return (value - 32) * 5/9 + 273.15;
    return value; // K
  }
  
  const factors = CONVERSION_FACTORS[category];
  if (!factors || !factors[fromUnit]) return value;
  return value * factors[fromUnit];
}

export function convertFromSI(value: number, toUnit: string, category: string): number {
  if (category === 'temp') {
    if (toUnit === 'C') return value - 273.15;
    if (toUnit === 'F') return (value - 273.15) * 9/5 + 32;
    return value; // K
  }
  
  const factors = CONVERSION_FACTORS[category];
  if (!factors || !factors[toUnit]) return value;
  return value / factors[toUnit];
}

export function useUnitConverter(category: string, defaultUnit: string, storageKey?: string) {
  const [unit, setUnit] = useState<string>(() => {
    if (storageKey) {
      const saved = localStorage.getItem(`hypercalc_unit_${storageKey}`);
      return saved || defaultUnit;
    }
    return defaultUnit;
  });

  const changeUnit = (newUnit: string) => {
    setUnit(newUnit);
    if (storageKey) {
      localStorage.setItem(`hypercalc_unit_${storageKey}`, newUnit);
    }
  };

  const toSI = (value: number | '') => {
    if (value === '') return '';
    return convertToSI(value, unit, category);
  };

  const fromSI = (value: number | '') => {
    if (value === '') return '';
    return convertFromSI(value, unit, category);
  };

  return { unit, setUnit: changeUnit, toSI, fromSI };
}
