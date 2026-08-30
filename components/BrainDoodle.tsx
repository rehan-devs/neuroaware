"use client";
import { motion } from "framer-motion";

export function BrainHappy({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Body */}
      <path
        d="M60 110 Q60 180 100 180 Q140 180 140 110 Z"
        fill="#3B4A2B"
      />
      {/* Head - brain shape */}
      <ellipse cx="100" cy="80" rx="55" ry="50" fill="#E8DDD1" stroke="#3B4A2B" strokeWidth="2" />
      <path d="M75 60 Q85 55 95 62" stroke="#3B4A2B" strokeWidth="2" fill="none" />
      <path d="M105 62 Q115 55 125 60" stroke="#3B4A2B" strokeWidth="2" fill="none" />
      {/* Eyes closed happy */}
      <path d="M80 85 Q85 80 90 85" stroke="#3B4A2B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M110 85 Q115 80 120 85" stroke="#3B4A2B" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Smile */}
      <path d="M85 100 Q100 115 115 100" stroke="#3B4A2B" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Sparkle lines */}
      <line x1="30" y1="50" x2="45" y2="55" stroke="#3B4A2B" strokeWidth="2" strokeLinecap="round" />
      <line x1="35" y1="70" x2="48" y2="70" stroke="#3B4A2B" strokeWidth="2" strokeLinecap="round" />
      <line x1="155" y1="55" x2="170" y2="50" stroke="#3B4A2B" strokeWidth="2" strokeLinecap="round" />
      <line x1="152" y1="70" x2="165" y2="70" stroke="#3B4A2B" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  );
}

export function BrainThinking({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M60 110 Q60 180 100 180 Q140 180 140 110 Z" fill="#3B4A2B" />
      <ellipse cx="100" cy="75" rx="50" ry="55" fill="#E8DDD1" stroke="#3B4A2B" strokeWidth="2" />
      {/* Curls */}
      <circle cx="60" cy="50" r="8" fill="none" stroke="#3B4A2B" strokeWidth="2" />
      <circle cx="55" cy="70" r="6" fill="none" stroke="#3B4A2B" strokeWidth="2" />
      {/* Face */}
      <circle cx="85" cy="80" r="4" fill="#3B4A2B" />
      <circle cx="115" cy="80" r="4" fill="#3B4A2B" />
      <ellipse cx="100" cy="100" rx="6" ry="4" fill="#3B4A2B" />
      {/* Arm thinking */}
      <path d="M130 130 Q160 120 155 90" stroke="#3B4A2B" strokeWidth="8" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

export function BrainMeditating({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M55 110 Q55 180 100 180 Q145 180 145 110 Z" fill="#3B4A2B" />
      <ellipse cx="100" cy="80" rx="55" ry="52" fill="#E8DDD1" stroke="#3B4A2B" strokeWidth="2" />
      {/* Closed eyes */}
      <path d="M78 85 Q85 90 92 85" stroke="#3B4A2B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M108 85 Q115 90 122 85" stroke="#3B4A2B" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Peaceful smile */}
      <path d="M90 105 Q100 110 110 105" stroke="#3B4A2B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Zen swirls */}
      <path d="M40 100 Q30 90 40 80 Q50 90 40 100" stroke="#3B4A2B" strokeWidth="2" fill="none" />
      <path d="M160 100 Q170 90 160 80 Q150 90 160 100" stroke="#3B4A2B" strokeWidth="2" fill="none" />
    </motion.svg>
  );
}

export function BrainExcited({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M60 120 Q60 180 100 180 Q140 180 140 120 Z" fill="#3B4A2B" />
      {/* Spiky star head */}
      <path
        d="M100 30 L115 55 L145 50 L128 75 L155 90 L128 100 L145 130 L115 120 L100 145 L85 120 L55 130 L72 100 L45 90 L72 75 L55 50 L85 55 Z"
        fill="#E8DDD1"
        stroke="#3B4A2B"
        strokeWidth="2"
      />
      <circle cx="88" cy="88" r="4" fill="#3B4A2B" />
      <circle cx="112" cy="88" r="4" fill="#3B4A2B" />
      <path d="M88 105 Q100 115 112 105" stroke="#3B4A2B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Raised arms */}
      <path d="M65 140 Q40 120 45 100" stroke="#3B4A2B" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M135 140 Q160 120 155 100" stroke="#3B4A2B" strokeWidth="8" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}