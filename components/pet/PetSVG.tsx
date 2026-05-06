import { motion } from "framer-motion";
import { PetMood, CreatureType } from "@/types";

interface Props {
  mood: PetMood | "eyes";
  type?: CreatureType;
  size?: number;
}

export const PetSVG = ({ mood, type = "fox", size = 120 }: Props) => {
  const isEyesOnly = mood === "eyes";

  const palette = {
    fox: { primary: "#FF8C42", secondary: "#FFF", bg: "#FDF4E3", accent: "#E07A5F" },
    bear: { primary: "#A5A58D", secondary: "#DDBEA9", bg: "#F0F0EA", accent: "#6B705C" },
    ghost: { primary: "#B8A9F0", secondary: "#E8E3FF", bg: "#F8F6FF", accent: "#9D8189" }
  }[type];

  // Animation constants
  const blinkTransition = {
    duration: 0.15,
    repeat: Infinity,
    repeatType: "reverse" as const,
    repeatDelay: type === "fox" ? 3 : type === "bear" ? 5 : 4
  };

  if (isEyesOnly) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Left Eye */}
          <motion.ellipse
            cx="35" cy="50" rx="4" ry="6" fill="white"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 1, 0, 1] }}
            transition={{ times: [0, 0.1, 0.8, 0.9, 1], duration: 4, repeat: Infinity, repeatDelay: 2 }}
          />
          {/* Right Eye */}
          <motion.ellipse
            cx="65" cy="50" rx="4" ry="6" fill="white"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 1, 0, 1] }}
            transition={{ times: [0, 0.1, 0.8, 0.9, 1], duration: 4, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.g>
      </svg>
    );
  }

  return (
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Glow */}
      <circle cx="50" cy="50" r="45" fill={palette.bg} opacity="0.5" />
      
      {/* Body */}
      <motion.ellipse 
        cx="50" cy="75" rx={type === "bear" ? "28" : "22"} ry="18" 
        fill={palette.primary} 
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Ears */}
      {type === "fox" && (
        <>
          <path d="M30 35 L20 15 L45 28 Z" fill={palette.primary} />
          <path d="M70 35 L80 15 L55 28 Z" fill={palette.primary} />
        </>
      )}
      {type === "bear" && (
        <>
          <circle cx="32" cy="28" r="10" fill={palette.primary} />
          <circle cx="68" cy="28" r="10" fill={palette.primary} />
        </>
      )}

      {/* Head */}
      <motion.circle 
        cx="50" cy="45" r="30" 
        fill={type === "ghost" ? "rgba(255,255,255,0.8)" : palette.primary}
        animate={type === "ghost" ? { opacity: [0.6, 0.9, 0.6] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Face features */}
      <g transform="translate(0, 5)">
        {/* Eyes */}
        <motion.ellipse 
          cx="38" cy="40" rx="3" ry={type === "bear" ? "2" : "4"} 
          fill="#1A1A1A"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={blinkTransition}
        />
        <motion.ellipse 
          cx="62" cy="40" rx="3" ry={type === "bear" ? "2" : "4"} 
          fill="#1A1A1A"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={blinkTransition}
        />

        {/* Mouth/Nose */}
        {mood === "happy" && <path d="M45 55 Q50 60 55 55" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />}
        {mood === "sad" && <path d="M45 60 Q50 55 55 60" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />}
        {mood === "tired" && <line x1="45" y1="58" x2="55" y2="58" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />}
      </g>

      {/* Ghost Fade */}
      {type === "ghost" && (
        <motion.path 
          d="M20 75 Q50 95 80 75" 
          stroke={palette.primary} 
          strokeWidth="4" 
          strokeLinecap="round" 
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.svg>
  );
};

