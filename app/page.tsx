"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";
import { PetSVG } from "@/components/pet/PetSVG";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-cream px-4"
    >
      <div className="content-wrap w-full flex flex-col items-center text-center max-w-3xl">
        
        {/* Cute Creature in the middle */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8"
        >
          <PetSVG mood="happy" size={160} />
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-text-primary">
          {t("combinedTitle")}
        </h1>
        
        {/* Small Project Description */}
        <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-2xl">
          {t("combinedDesc")}
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/onboarding" size="lg">
            Start Journey
          </Button>
          <Button href="/demo" variant="secondary" size="lg">
            Quick Demo
          </Button>
        </div>
        
        {/* Features List (Centered) */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            [t("combinedFeature1Title"), t("combinedFeature1Desc")],
            [t("combinedFeature2Title"), t("combinedFeature2Desc")],
            [t("combinedFeature3Title"), t("combinedFeature3Desc")]
          ].map(([title, body], idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-lavender-light flex items-center justify-center text-lavender-deep font-bold">
                {idx + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold text-text-primary">{title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
