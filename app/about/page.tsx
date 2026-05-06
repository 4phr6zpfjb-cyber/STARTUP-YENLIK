"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-cream py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl"
      >
        <h1 className="text-4xl font-bold text-text-primary mb-8">{t("navAbout")}</h1>
        
        <div className="space-y-8 text-lg text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">{t("mission")}</h2>
            <p>
              TimeBuddy was created to solve a modern crisis: the hijacking of our attention. 
              We believe that willpower alone is not enough to fight the highly optimized algorithms of social media.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">{t("howItHelps")}</h2>
            <p>
              By introducing gentle friction at the moment of habit, we give your brain a chance to 
              re-engage its prefrontal cortex. It&apos;s not about blocking; it&apos;s about awareness.
            </p>
          </section>

          <div className="pt-8 flex gap-4">
            <Button href="/demo">{t("tryDemo")}</Button>
            <Button href="/" variant="secondary">Back to Home</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
