"use client";
import React from "react";
import { InstagramButton } from "./InstagramButton";
import { BrainHappy } from "./BrainDoodle";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-olive text-cream pb-24 md:pb-28">
      {/* Soft top wave */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-cream rounded-b-[50%] scale-x-150 origin-top" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <BrainHappy className="w-28 h-28 mx-auto" />
        </motion.div>

        <p className="text-sage text-xs font-bold tracking-[0.2em] uppercase mb-3">
          NeuroAware
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-black leading-tight max-w-2xl">
          Break the silence.
          <br />
          Start the conversation.
        </h2>
        <p className="mt-5 max-w-md text-cream/70 text-base md:text-lg leading-relaxed">
          Spreading awareness on ideas that hinder medical consultation for
          neurology. Your voice matters.
        </p>

        {/* Instagram CTA */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-sm font-bold text-sage">Follow our journey</p>
          <InstagramButton href="https://www.instagram.com/neuroaware.pk" />
          <a
            href="https://www.instagram.com/neuroaware.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/60 text-sm hover:text-cream transition-colors"
          >
            @neuroaware.pk
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-cream/15 pt-6 text-sm text-cream/50">
          <span className="font-serif italic">NeuroAware · est. 2026</span>
          <nav className="flex gap-6 items-center">
            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-cream transition-colors"
            >
              About
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("questions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-cream transition-colors"
            >
              Survey
            </button>
            <button
              onClick={scrollToTop}
              className="hover:text-cream transition-colors inline-flex items-center gap-1"
            >
              <ArrowUp className="w-4 h-4" /> Top
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}