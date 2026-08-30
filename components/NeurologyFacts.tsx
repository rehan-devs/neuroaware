"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextBlockAnimation } from "./TextBlockAnimation";
import { Zap, Brain, Activity, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";

const facts = [
  {
    icon: Zap,
    stat: "100,000 Miles",
    title: "Vast Neural Network",
    desc: "If stretched out, the blood vessels in your brain would wrap around the Earth 4 times!",
    tag: "Mind-Blowing",
  },
  {
    icon: Brain,
    stat: "86 Billion",
    title: "Neurons Active",
    desc: "Your brain contains roughly 86 billion neurons, each generating electrical impulses constantly.",
    tag: "Fun Fact",
  },
  {
    icon: Activity,
    stat: "20% Energy",
    title: "Power Hungry",
    desc: "Despite taking up only 2% of your body weight, your brain consumes 20% of your total oxygen & energy.",
    tag: "Did You Know?",
  },
  {
    icon: Lightbulb,
    stat: "23 Watts",
    title: "Light a Bulb",
    desc: "While awake, your brain produces enough electricity to power a small 23-watt LED light bulb!",
    tag: "Energy",
  },
];

export function NeurologyFacts() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % facts.length);
  const prev = () => setIndex((i) => (i - 1 + facts.length) % facts.length);

  const fact = facts[index];
  const Icon = fact.icon;

  return (
    <section className="py-20 md:py-24 bg-beige/60 grain relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <TextBlockAnimation blockColor="#3B4A2B" duration={0.7}>
            <span className="text-xs uppercase tracking-widest font-black text-olive">
              Quick Brain Bytes
            </span>
          </TextBlockAnimation>

          <h2 className="font-serif text-4xl md:text-6xl font-extrabold text-olive mt-3">
            Did you know?
          </h2>
          <p className="mt-3 text-body-text text-sm md:text-lg">
            Tap the arrows to explore, or just keep scrolling — up to you.
          </p>
        </div>

        {/* Card + Arrows */}
        <div className="flex items-center justify-center gap-3 md:gap-6">
          {/* Left Arrow */}
          <button
            onClick={prev}
            className="shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-full bg-cream border-2 border-olive shadow-[3px_3px_0_#3B4A2B] hover:shadow-[5px_5px_0_#3B4A2B] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center text-olive"
            aria-label="Previous fact"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Card */}
          <div className="flex-1 max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30, rotate: -2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: -30, rotate: 2 }}
                transition={{ duration: 0.35 }}
                className="bg-cream p-6 md:p-8 rounded-3xl border-2 border-olive shadow-[5px_5px_0_#3B4A2B] min-h-[240px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-sage/40 text-olive font-bold text-xs rounded-full">
                      {fact.tag}
                    </span>
                    <Icon className="w-6 h-6 text-olive" />
                  </div>
                  <div className="font-serif text-3xl md:text-4xl font-black text-olive mb-2">
                    {fact.stat}
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-olive mb-2">
                    {fact.title}
                  </h3>
                  <p className="text-body-text text-sm md:text-base leading-relaxed">
                    {fact.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {facts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-olive" : "w-2 bg-olive/30"
                  }`}
                  aria-label={`Go to fact ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-full bg-cream border-2 border-olive shadow-[3px_3px_0_#3B4A2B] hover:shadow-[5px_5px_0_#3B4A2B] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center text-olive"
            aria-label="Next fact"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}