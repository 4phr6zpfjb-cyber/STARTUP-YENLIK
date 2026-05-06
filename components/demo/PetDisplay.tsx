"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PetMood } from "@/types";
import { PetSVG } from "@/components/pet/PetSVG";

export const PetDisplay = ({ mood }: { mood: PetMood }) => {
  const reduced = useReducedMotion();
  const anim =
    mood === "happy"
      ? { y: [0, -8, 0], transition: { repeat: Infinity, duration: 2 } }
      : mood === "tired"
        ? { rotate: [-3, 3, -3], transition: { repeat: Infinity, duration: 3 } }
        : { y: [0, 4, 0], transition: { repeat: Infinity, duration: 4 } };
  return (
    <div className="my-6 flex justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={mood}
          initial={reduced ? false : { opacity: 0, scale: 0.8, rotate: -10 }}
          animate={reduced ? {} : anim}
          exit={reduced ? {} : { opacity: 0, scale: 0.8, rotate: -10 }}
          transition={{ duration: 0.4 }}
        >
          <PetSVG mood={mood} size={120} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
