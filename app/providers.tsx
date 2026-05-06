"use client";

import { ReactNode } from "react";
import { useAuth } from "@/lib/useAuth";

export const Providers = ({ children }: { children: ReactNode }) => {
  useAuth();
  return <>{children}</>;
};
