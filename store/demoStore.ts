"use client";

import { create } from "zustand";
import { PetMood } from "@/types";

export type DemoPhase = "tracking" | "warning" | "blocked" | "recovery";

interface DemoState {
  phase: DemoPhase;
  seconds: number;
  limitSeconds: number;
  violationCount: number;
  petMood: PetMood;
  isRunning: boolean;
  appName: string;
  blockCountdown: number;
  tick: () => void;
  toggle: () => void;
  reset: () => void;
  skipToLimit: () => void;
  setBlocked: () => void;
  countdownTick: () => void;
}

const getMood = (violations: number): PetMood => {
  if (violations === 0) return "happy";
  if (violations === 1) return "tired";
  return "sad";
};

export const useDemoStore = create<DemoState>((set, get) => ({
  phase: "tracking",
  seconds: 0,
  limitSeconds: 7200,
  violationCount: 0,
  petMood: "happy",
  isRunning: false,
  appName: "Instagram",
  blockCountdown: 300,
  tick: () =>
    set((state) => {
      const nextSeconds = state.seconds + 1;
      if (state.phase !== "blocked" && nextSeconds >= state.limitSeconds) {
        return { seconds: state.limitSeconds, phase: "blocked", isRunning: false };
      }
      if (nextSeconds >= Math.floor(state.limitSeconds * 0.9) && state.phase === "tracking") {
        return { seconds: nextSeconds, phase: "warning" };
      }
      return { seconds: nextSeconds };
    }),
  toggle: () => set((state) => ({ isRunning: !state.isRunning })),
  reset: () =>
    set({
      phase: "tracking",
      seconds: 0,
      violationCount: 0,
      petMood: "happy",
      isRunning: false,
      blockCountdown: 300
    }),
  skipToLimit: () => set((state) => ({ seconds: 7080, phase: "warning" })),
  setBlocked: () => set({ phase: "blocked", isRunning: false, blockCountdown: 300 }),
  countdownTick: () => {
    const current = get();
    if (current.blockCountdown <= 1) {
      const nextViolation = current.violationCount + 1;
      set({
        phase: "recovery",
        seconds: current.limitSeconds,
        violationCount: nextViolation,
        petMood: getMood(nextViolation),
        blockCountdown: 300
      });
      return;
    }
    set((state) => ({ blockCountdown: state.blockCountdown - 1 }));
  }
}));
