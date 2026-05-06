"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
  isError?: boolean;
  accentColor?: string;
}

export const OTPInput = ({ length = 6, onComplete, isError, accentColor = "#B8A9F0" }: OTPInputProps) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first box on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (isError) {
      setValues(Array(length).fill(""));
      inputRefs.current[0]?.focus();
    }
  }, [isError, length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const newValues = [...values];
    // Take only the last digit if user typed over
    newValues[index] = val.slice(-1);
    setValues(newValues);

    // Auto-focus next
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit
    if (newValues.every((v) => v !== "")) {
      onComplete(newValues.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const newValues = [...values];
    pastedData.split("").forEach((char, i) => {
      if (i < length) newValues[i] = char;
    });
    setValues(newValues);

    if (newValues.every((v) => v !== "")) {
      onComplete(newValues.join(""));
    } else {
      // Focus the next empty box
      const firstEmpty = newValues.findIndex(v => v === "");
      if (firstEmpty !== -1) inputRefs.current[firstEmpty]?.focus();
    }
  };

  return (
    <motion.div 
      className="flex gap-3 justify-center"
      animate={isError ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className={`
            w-[52px] h-[60px] text-center text-2xl font-bold font-mono rounded-xl border-1.5 transition-all outline-none
            ${v ? "bg-lavender-light" : "bg-white/5"}
            ${isError ? "border-petal text-petal" : "border-white/10 focus:border-lavender text-white"}
          `}
          style={{ 
            borderColor: v && !isError ? accentColor : undefined,
            borderWidth: "1.5px"
          }}
        />
      ))}
    </motion.div>
  );
};
