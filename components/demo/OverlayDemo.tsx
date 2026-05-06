"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DemoPhase } from "@/store/demoStore";
import { PetSVG } from "@/components/pet/PetSVG";

const fmt = (total: number) => `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, "0")}`;

export const OverlayDemo = ({ phase, blockCountdown }: { phase: DemoPhase; blockCountdown: number }) => {
  const reduced = useReducedMotion();
  const progress = (300 - blockCountdown) / 300;
  const circumference = 251;
  return (
    <AnimatePresence>
      {phase === "blocked" && (
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-xl4 bg-[rgba(240,238,255,0.97)] p-8 text-center"
        >
          <div className="animate-shake">
            <PetSVG mood="sad" size={160} />
          </div>
          <h3 className="mt-4 text-2xl font-bold">Time to take a break</h3>
          <p className="mt-2 text-sm text-text-secondary">You&apos;ve been on Instagram for 2 hours today.</p>
          <p className="my-5 text-3xl font-bold text-petal-deep">Resuming in {fmt(blockCountdown)}</p>
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="40" stroke="#EBEBEB" strokeWidth="4" fill="none" />
            <circle
              cx="45"
              cy="45"
              r="40"
              stroke="#B8A9F0"
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - circumference * progress}
              transform="rotate(-90 45 45)"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
