import { ReactNode } from "react";

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return <div className={`rounded-xl3 border border-border bg-surface ${className}`}>{children}</div>;
};
