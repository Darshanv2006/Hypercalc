"use client";

import { Search, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function TopBar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur-md left-0 md:left-60">
      <div className="flex items-center">
         <span className="text-lg font-semibold text-text-primary capitalize hidden md:block">
           Dashboard
         </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
          }}
          className="flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface-elevated">
          <Search className="mr-2 h-4 w-4" />
          <span>Search calculators...</span>
          <kbd className="ml-4 hidden rounded bg-surface px-1.5 py-0.5 text-xs md:inline-block">
            Ctrl+K
          </kbd>
        </button>
        
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary"
          aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
