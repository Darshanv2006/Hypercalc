"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GlobalSearch = dynamic(() => import("@/components/GlobalSearch"), {
  ssr: false,
  loading: () => null,
});

export default function LayoutClient() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
  );
}
