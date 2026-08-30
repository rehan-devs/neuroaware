"use client";
import { motion } from "framer-motion";
import { BrainThinking, BrainMeditating, BrainExcited } from "./BrainDoodle";

const cards = [
  {
    number: "01",
    title: "Who are we?",
    body: "We are two A-Levels students trying to understand why social taboos still affect how often people visit doctors — based on what we observed while shadowing a neurologist.",
    Illustration: BrainThinking,
    flip: false,
  },
  {
    number: "02",
    title: "What is our goal?",
    body: "To spread awareness within our community that consultancy is important even for mild symptoms — because you never know when a condition can escalate.",
    Illustration: BrainMeditating,
    flip: true,
  },
  {
    number: "03",
    title: "How can you help?",
    body: "By answering the questions below. Your answers help us understand the barriers people face — and share our findings with a wider audience.",
    Illustration: BrainExcited,
    flip: false,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 diagonal-split grain overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-20 md:space-y-32">
        {cards.map((card, i) => {
          const { Illustration } = card;
          return (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                card.flip ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Text side */}
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <span className="font-serif text-7xl md:text-9xl font-black text-olive leading-none">
                    {card.number}
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-olive leading-tight pt-3">
                    {card.title}
                  </h2>
                </div>
                <p className="text-base md:text-xl text-body-text leading-relaxed max-w-lg">
                  {card.body}
                </p>
              </div>

              {/* Illustration side */}
              <div className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: card.flip ? -3 : 3 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Illustration className="w-56 md:w-80 h-auto" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}