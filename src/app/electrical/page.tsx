import Link from 'next/link';
import { Zap, Calculator } from 'lucide-react';
import DomainFormulas from '@/components/calculator/DomainFormulas';

const calculators = [
  {
    id: 'ohms-law',
    name: "Ohm's Law",
    description: 'Calculate voltage, current, resistance, and power',
    icon: Zap,
  },
  {
    id: 'rc-circuit',
    name: 'RC Circuit',
    description: 'Calculate time constant and charge/discharge curves',
    icon: Calculator,
  },
  {
    id: 'rl-circuit',
    name: 'RL Circuit',
    description: 'Calculate time constant and current rise/fall curves',
    icon: Calculator,
  },
  {
    id: 'rlc-circuit',
    name: 'RLC Circuit',
    description: 'Calculate resonant frequency, Q factor, and impedance',
    icon: Calculator,
  },
  {
    id: 'power-calculator',
    name: 'Power Calculator',
    description: 'Calculate real, reactive, and apparent power',
    icon: Zap,
  },
  {
    id: 'decibels',
    name: 'Decibels',
    description: 'Convert between dB and voltage/power ratios',
    icon: Calculator,
  },
  {
    id: 'op-amp',
    name: 'Op-Amp',
    description: 'Calculate gain for inverting/non-inverting amplifiers',
    icon: Calculator,
  },
  {
    id: 'transformer',
    name: 'Transformer',
    description: 'Calculate voltage and current transformation',
    icon: Calculator,
  },
  {
    id: 'energy-storage',
    name: 'Energy Storage',
    description: 'Calculate energy stored in capacitors and inductors',
    icon: Calculator,
  },
  {
    id: 'led-resistor',
    name: 'LED Resistor',
    description: 'Calculate resistor for LED circuits',
    icon: Calculator,
  },
  // Add more as implemented
];

export default function ElectricalPage() {
  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Electrical Engineering</h1>
        <p className="text-text-secondary">Choose a calculator from the list below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link
              key={calc.id}
              href={`/electrical/${calc.id}`}
              className="group block p-6 rounded-xl border border-border bg-surface hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-electrical/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-electrical" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-electrical transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {calc.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <DomainFormulas domain="electrical" accentClass="text-electrical" />
    </div>
  );
}