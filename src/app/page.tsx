import Link from "next/link";
import {
  Settings,
  Zap,
  Building,
  FlaskConical,
  Calculator,
  Atom,
  Code,
  DollarSign,
  BookOpen,
} from "lucide-react";
import { getDomainStats } from "@/lib/api";
import HomeHero from "@/components/home/HomeHero";

const domains = [
  {
    id: "mechanical",
    name: "Mechanical",
    icon: Settings,
    route: "/mechanical",
    desc: "Stress, beams, thermodynamics.",
    color: "text-mechanical",
    border: "hover:border-mechanical",
    bg: "bg-mechanical/10",
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: Zap,
    route: "/electrical",
    desc: "Circuits, Ohm's law, power.",
    color: "text-electrical",
    border: "hover:border-electrical",
    bg: "bg-electrical/10",
  },
  {
    id: "civil",
    name: "Civil",
    icon: Building,
    route: "/civil",
    desc: "Concrete, retaining walls.",
    color: "text-civil",
    border: "hover:border-civil",
    bg: "bg-civil/10",
  },
  {
    id: "chemical",
    name: "Chemical",
    icon: FlaskConical,
    route: "/chemical",
    desc: "Molar mass, ideal gas.",
    color: "text-chemical",
    border: "hover:border-chemical",
    bg: "bg-chemical/10",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Calculator,
    route: "/mathematics",
    desc: "Matrices, vectors, statistics.",
    color: "text-mathematics",
    border: "hover:border-mathematics",
    bg: "bg-mathematics/10",
  },
  {
    id: "physics",
    name: "Physics",
    icon: Atom,
    route: "/physics",
    desc: "Kinematics, optics, forces.",
    color: "text-physics",
    border: "hover:border-physics",
    bg: "bg-physics/10",
  },
  {
    id: "cs",
    name: "Computer Science",
    icon: Code,
    route: "/cs",
    desc: "Bitwise, subnets, big-o.",
    color: "text-cs",
    border: "hover:border-cs",
    bg: "bg-cs/10",
  },
  {
    id: "economics",
    name: "Economics",
    icon: DollarSign,
    route: "/economics",
    desc: "TVM, NPV, depreciation.",
    color: "text-economics",
    border: "hover:border-economics",
    bg: "bg-economics/10",
  },
];

export default async function Home() {
  const domainStats = await getDomainStats();
  const counts = Object.fromEntries(
    domainStats.map(({ domain, count }) => [domain, count]),
  ) as Record<string, number>;

  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <HomeHero formulaTotal={total} domainCount={Object.keys(counts).length} />

      <section
        id="explore"
        className="z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-4 sm:px-0"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((domain) => {
            const Icon = domain.icon;
            const count = counts[domain.id];

            return (
              <div key={domain.id} className="animate-in fade-in duration-500">
                <Link
                  href={domain.route}
                  className={`group flex h-full flex-col rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-surface-elevated hover:shadow-2xl hover:shadow-black/10 ${domain.border}`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${domain.bg}`}
                    >
                      <Icon className={`h-6 w-6 ${domain.color}`} />
                    </div>
                    {count !== undefined && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-xs font-semibold ${domain.color}`}
                      >
                        <BookOpen className="h-3 w-3" />
                        {count} formulas
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-text-primary">
                    {domain.name}
                  </h3>
                  <p className="text-sm font-medium text-text-secondary">
                    {domain.desc}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
