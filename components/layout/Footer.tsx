"use client";

import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  if (pathname === "/auth") return null;

  return (
    <footer className="border-t border-border py-8">
      <div className="content-wrap text-center text-sm text-text-muted">TimeBuddy © {new Date().getFullYear()} · Built for mindful digital habits.</div>
    </footer>
  );
};
