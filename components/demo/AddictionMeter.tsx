"use client";

import { motion } from "framer-motion";
import { PetSVG } from "@/components/pet/PetSVG";

export const AddictionMeter = ({ violationCount }: { violationCount: number }) => {
  const cards = [
    { id: "happy", label: "Doing great!", note: "Under limit today", active: violationCount === 0, bg: "bg-butter-light border-butter", mood: "happy" as const },
    { id: "tired", label: "Getting tired...", note: "Exceeded once today", active: violationCount === 1, bg: "bg-petal-light border-petal", mood: "tired" as const },
    { id: "sad", label: "Really sad now", note: "Multiple violations", active: violationCount >= 2, bg: "bg-lavender-light border-lavender-deep", mood: "sad" as const }
  ];

  return (
    <section className="mt-12">
      <h3 className="mb-4 text-center text-2xl font-semibold">Addiction Level System</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`rounded-xl3 border-[1.5px] p-4 text-center ${card.bg} ${card.active ? "shadow-soft" : "opacity-50"}`}
            animate={{ scale: card.active ? 1.05 : 1 }}
          >
            <div className="flex justify-center">
              <PetSVG mood={card.mood} size={64} />
            </div>
            <p className="mt-2 font-semibold">{card.label}</p>
            <p className="text-sm text-text-secondary">{card.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
