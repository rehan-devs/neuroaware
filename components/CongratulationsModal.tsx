"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainHappy } from "./BrainDoodle";
import { Sparkles, CheckCircle, Heart } from "lucide-react";

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function CongratulationsModal({
  isOpen,
  onClose,
  userName,
}: CongratulationsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-olive-dark/70 backdrop-blur-lg">
        {/* Floating Confetti Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-sage"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
                y: -20,
                scale: Math.random() * 0.8 + 0.5,
              }}
              animate={{
                y: typeof window !== "undefined" ? window.innerHeight + 20 : 1000,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative max-w-lg w-full bg-cream border-4 border-olive rounded-3xl p-8 md:p-12 shadow-[10px_10px_0px_#3B4A2B] text-center"
        >
          {/* Header Icon */}
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BrainHappy className="w-32 h-32" />
            </motion.div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sage/40 text-olive font-extrabold text-xs rounded-full uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-olive" /> Survey Complete
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-black text-olive leading-tight">
            Thank You, {userName || "Friend"}!
          </h2>

          <p className="mt-4 text-body-text text-base md:text-lg leading-relaxed">
            Your insights are invaluable in helping us break taboos around neurological consultations in Pakistan and beyond.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-beige/60 border-2 border-olive/30 text-olive text-sm font-semibold flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-red-700 fill-current" />
            Together, we are making healthcare accessible & stigma-free.
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="mt-8 w-full bg-olive text-cream py-4 rounded-full font-bold text-lg shadow-[4px_4px_0_#2A3620] hover:shadow-[6px_6px_0_#2A3620] transition-shadow flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" /> Done & Return to Home
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}