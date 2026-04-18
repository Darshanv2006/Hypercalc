import Link from 'next/link';
import { Calculator } from 'lucide-react';
import DomainFormulas from '@/components/calculator/DomainFormulas';

const calculators = [
  {
    id: 'quadratic-solver',
    name: 'Quadratic Solver',
    description: 'Solve quadratic equations',
    icon: Calculator,
  },
  {
    id: 'statistics',
    name: 'Statistics',
    description: 'Calculate mean, median, mode, standard deviation',
    icon: Calculator,
  },
  // Add more as implemented
];

export default function MathematicsPage() {
  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Mathematics</h1>
        <p className="text-text-secondary">Choose a calculator from the list below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link
              key={calc.id}
              href={`/mathematics/${calc.id}`}
              className="group block p-6 rounded-xl border border-border bg-surface hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-mathematics/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-mathematics" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-mathematics transition-colors">
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

      <DomainFormulas domain="mathematics" accentClass="text-mathematics" />
    </div>
  );
}