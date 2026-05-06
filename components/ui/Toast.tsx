"use client";

import { AnimatePresence, motion } from "framer-motion";

export const Toast = ({ message, show }: { message: string; show: boolean }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-6 right-6 z-50 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary shadow-soft"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
