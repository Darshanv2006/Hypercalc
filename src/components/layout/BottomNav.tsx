"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Settings, Zap, Building, FlaskConical, 
  Calculator, Atom, Code, DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

const domains = [
  { id: "mechanical", icon: Settings, route: "/mechanical", colorClass: "text-mechanical" },
  { id: "electrical", icon: Zap, route: "/electrical", colorClass: "text-electrical" },
  { id: "civil", icon: Building, route: "/civil", colorClass: "text-civil" },
  { id: "chemical", icon: FlaskConical, route: "/chemical", colorClass: "text-chemical" },
  { id: "mathematics", icon: Calculator, route: "/mathematics", colorClass: "text-mathematics" },
  { id: "physics", icon: Atom, route: "/physics", colorClass: "text-physics" },
  { id: "cs", icon: Code, route: "/cs", colorClass: "text-cs" },
  { id: "economics", icon: DollarSign, route: "/economics", colorClass: "text-economics" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-surface md:hidden">
      {domains.map((domain) => {
        const isActive = pathname.startsWith(domain.route);
        const Icon = domain.icon;
        
        return (
          <Link
            key={domain.id}
            href={domain.route}
            className="flex flex-col items-center justify-center p-2 transition-colors hover:bg-surface-elevated rounded-lg"
          >
            <Icon 
              className={cn(
                "h-6 w-6 transition-colors", 
                isActive ? domain.colorClass : "text-text-secondary"
              )} 
            />
            {isActive && <div className={cn("mt-1 h-1 w-1 rounded-full bg-current", domain.colorClass)} />}
          </Link>
        );
      })}
    </nav>
  );
}
