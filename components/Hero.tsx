"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BrainHappy } from "./BrainDoodle";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // On mobile, brain fades/scales IN as you scroll down
  const brainOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [0, 0.5, 1]);
  const brainScale = useTransform(scrollYProgress, [0, 0.35], [0.6, 1]);
  const brainY = useTransform(scrollYProgress, [0, 0.35], [80, 0]);

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[130vh] md:min-h-screen diagonal-split grain overflow-hidden flex items-start md:items-center pt-20 md:pt-0"
    >
      {/* Floating decorative shapes */}
      <motion.div
        className="absolute top-20 right-10 w-16 h-16 rounded-full bg-sage/30 blur-xl"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-24 h-24 rounded-full bg-olive/10 blur-2xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT: Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-sage/40 text-olive-dark text-xs md:text-sm font-bold tracking-wider mb-6"
          >
            ✦ WELCOME TO NEUROAWARE ✦
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-7xl lg:text-8xl font-black text-olive leading-[0.95] tracking-tight"
          >
            Everything <br />
            you need to <br />
            <span className="inline-block relative">
              know
              <motion.span
                className="absolute -bottom-2 left-0 h-3 bg-sage/60 -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>{" "}
            <span className="inline-block bg-sage/50 rounded-2xl px-4 py-1 text-2xl md:text-5xl lg:text-6xl align-middle">
              about us
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-base md:text-xl text-body-text max-w-lg leading-relaxed"
          >
            Spreading awareness on ideas that hinder medical consultation for
            neurology.{" "}
            <span className="font-bold text-olive">Let's talk about it.</span>
          </motion.p>

          <motion.button
            onClick={scrollToNext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 group inline-flex items-center gap-3 bg-olive text-cream px-8 py-4 rounded-full font-bold text-base md:text-lg shadow-[4px_4px_0_#2A3620] hover:shadow-[6px_6px_0_#2A3620] transition-shadow"
          >
            Start the journey
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </div>

        {/* RIGHT: Illustration — desktop: normal, mobile: reveal on scroll */}
        <>
          {/* Desktop version */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="relative hidden md:flex justify-center"
          >
            <BrainHappy className="w-64 md:w-96 h-auto drop-shadow-2xl" />
            <motion.div
              className="absolute top-10 -left-4 text-3xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute bottom-10 -right-4 text-2xl text-olive"
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              ✧
            </motion.div>
          </motion.div>

          {/* Mobile version — appears on scroll */}
          <motion.div
            style={{ opacity: brainOpacity, scale: brainScale, y: brainY }}
            className="relative flex md:hidden justify-center mt-10"
          >
            <BrainHappy className="w-64 h-auto drop-shadow-2xl" />
            <motion.div
              className="absolute top-6 -left-2 text-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute bottom-6 -right-2 text-xl text-olive"
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              ✧
            </motion.div>
          </motion.div>
        </>
      </div>
    </section>
  );
}