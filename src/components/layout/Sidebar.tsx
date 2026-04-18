"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Settings, Zap, Building, FlaskConical, 
  Calculator, Atom, Code, DollarSign, CalculatorIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const domains = [
  { id: "mechanical", name: "Mechanical", icon: Settings, route: "/mechanical", colorClass: "bg-mechanical text-mechanical" },
  { id: "electrical", name: "Electrical", icon: Zap, route: "/electrical", colorClass: "bg-electrical text-electrical" },
  { id: "civil", name: "Civil", icon: Building, route: "/civil", colorClass: "bg-civil text-civil" },
  { id: "chemical", name: "Chemical", icon: FlaskConical, route: "/chemical", colorClass: "bg-chemical text-chemical" },
  { id: "mathematics", name: "Mathematics", icon: Calculator, route: "/mathematics", colorClass: "bg-mathematics text-mathematics" },
  { id: "physics", name: "Physics", icon: Atom, route: "/physics", colorClass: "bg-physics text-physics" },
  { id: "cs", name: "Computer Science", icon: Code, route: "/cs", colorClass: "bg-cs text-cs" },
  { id: "economics", name: "Economics", icon: DollarSign, route: "/economics", colorClass: "bg-economics text-economics" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-60 flex-col bg-surface border-r border-border md:flex">
      <Link href="/" className="flex h-16 items-center px-4 hover:opacity-80 transition-opacity">
        <CalculatorIcon className="mr-2 h-6 w-6 text-text-primary" />
        <span className="text-xl font-bold text-text-primary">HyperCalc</span>
      </Link>
      <nav className="flex-1 space-y-1 p-2">
        {domains.map((domain) => {
          const isActive = pathname.startsWith(domain.route);
          const Icon = domain.icon;
          
          return (
            <Link
              key={domain.id}
              href={domain.route}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-elevated",
                isActive ? "bg-surface-elevated text-text-primary" : "text-text-secondary"
              )}
            >
              {isActive && (
                <div className={cn("absolute left-0 h-8 w-1 rounded-r-md", domain.colorClass.split(" ")[0])} />
              )}
              <Icon 
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors", 
                  isActive ? domain.colorClass.split(" ")[1] : "group-hover:text-text-primary"
                )} 
              />
              <span className="truncate">{domain.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <Link href="/formulas" className="flex items-center text-sm font-medium text-text-secondary hover:text-text-primary">
           Formula Library
        </Link>
      </div>
    </aside>
  );
}
