"use client";

import { create } from "zustand";
import { FocusUser } from "@/types";

interface AuthStore {
  user: FocusUser | null;
  loading: boolean;
  setUser: (user: FocusUser | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading })
}));
