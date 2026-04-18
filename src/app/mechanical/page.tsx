import Link from 'next/link';
import { Settings, Calculator, Zap, Cog, Waves, Flame, Wrench, StretchHorizontal, Lock } from 'lucide-react';
import { calculators as allCalculators } from '@/lib/calculators';
import DomainFormulas from '@/components/calculator/DomainFormulas';

const iconMap = {
  'stress-strain': Settings,
  'beam-deflection': Calculator,
  'torque-power': Zap,
  'gear-ratio': Cog,
  'reynolds-pipe-flow': Waves,
  'heat-transfer': Flame,
  'shaft-design': Wrench,
  'spring-design': StretchHorizontal,
};

const calculators = allCalculators.filter(calc => calc.domain === 'mechanical').map(calc => ({
  ...calc,
  icon: iconMap[calc.id as keyof typeof iconMap] || Calculator,
}));

export default function MechanicalPage() {
  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Mechanical Engineering</h1>
        <p className="text-text-secondary">Choose a calculator from the list below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          const isImplemented = calc.implemented;
          return (
            <div key={calc.id} className="relative">
              {isImplemented ? (
                <Link
                  href={calc.route}
                  className="group block p-6 rounded-xl border border-border bg-surface hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-mechanical/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-mechanical" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-text-primary group-hover:text-mechanical transition-colors">
                        {calc.name}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">
                        {calc.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="p-6 rounded-xl border border-border bg-surface opacity-50 cursor-not-allowed">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-mechanical/10 flex items-center justify-center relative">
                        <Icon className="w-6 h-6 text-mechanical" />
                        <Lock className="w-3 h-3 absolute -top-1 -right-1 text-text-muted" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {calc.name}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">
                        {calc.description}
                      </p>
                      <p className="text-xs text-text-muted mt-2">Coming soon</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DomainFormulas domain="mechanical" accentClass="text-mechanical" />
    </div>
  );
}