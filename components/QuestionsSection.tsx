"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextBlockAnimation } from "./TextBlockAnimation";
import { RethemedNeonCheckbox } from "./RethemedNeonCheckbox";
import { SoftInput } from "./SoftInput";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export interface AnswersState {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string[];
  q9: string;
  q10: string;
  q11: string;
  q12: string;
  q13: string;
  q14: string;
  q15: string;
}

interface QuestionsSectionProps {
  onComplete: (answers: AnswersState) => void;
}

const likertOptions = [
  "Strongly agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly disagree",
];

export function QuestionsSection({ onComplete }: QuestionsSectionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<AnswersState>({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: [],
    q9: "",
    q10: "",
    q11: "",
    q12: "",
    q13: "",
    q14: "",
    q15: "",
  });

  const totalSteps = 15;

  const handleSelectRadio = (key: keyof AnswersState, val: string) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  };

  const handleToggleQ8 = (condition: string) => {
    setAnswers((prev) => {
      const exists = prev.q8.includes(condition);
      return {
        ...prev,
        q8: exists
          ? prev.q8.filter((item) => item !== condition)
          : [...prev.q8, condition],
      };
    });
  };

  const canGoNext = () => {
    if (currentStep === 1) return !!answers.q1;
    if (currentStep === 2) return !!answers.q2;
    if (currentStep === 3) return !!answers.q3;
    if (currentStep === 4) return true; // Optional if skipped
    if (currentStep === 5) return !!answers.q5;
    if (currentStep === 6) return !!answers.q6;
    if (currentStep === 7) return answers.q7.trim().length > 0;
    if (currentStep === 8) return answers.q8.length > 0;
    if (currentStep === 9) return !!answers.q9;
    if (currentStep === 10) return !!answers.q10;
    if (currentStep === 11) return !!answers.q11;
    if (currentStep === 12) return !!answers.q12;
    if (currentStep === 13) return !!answers.q13;
    if (currentStep === 14) return !!answers.q14;
    if (currentStep === 15) return !!answers.q15;
    return true;
  };

  const handleNext = () => {
    if (!canGoNext()) return;

    if (currentStep === 3 && answers.q3 === "No") {
      // Skip Q4 if user chose 'No'
      setCurrentStep(5);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (currentStep === 5 && answers.q3 === "No") {
      // Jump back over Q4
      setCurrentStep(3);
      return;
    }
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <section
      id="questions"
      className="py-16 md:py-24 pb-32 md:pb-32 diagonal-split grain min-h-screen flex items-center justify-center px-3 sm:px-6"
    >
      <div className="w-full max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-xs uppercase tracking-wider text-olive">
              Question {currentStep} of {totalSteps}
            </span>
            <span className="font-serif font-black text-sm text-olive">
              {progressPercent}% Completed
            </span>
          </div>
          <div className="w-full h-3 bg-sage/30 rounded-full overflow-hidden border border-olive/20">
            <motion.div
              className="h-full bg-olive rounded-full"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Question Card Box */}
        <div className="bg-cream rounded-2xl md:rounded-3xl border-2 md:border-3 border-olive p-5 sm:p-7 md:p-12 shadow-[5px_5px_0px_#3B4A2B] md:shadow-[8px_8px_0px_#3B4A2B] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Q1: Gender */}
              {currentStep === 1 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q1. What is your gender? *
                    </h3>
                  </TextBlockAnimation>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {["Male", "Female"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectRadio("q1", opt)}
                        className={`p-5 rounded-2xl border-2 border-olive font-bold text-lg text-left transition-all ${
                          answers.q1 === opt
                            ? "bg-olive text-cream shadow-[4px_4px_0_#2A3620]"
                            : "bg-beige/40 text-olive hover:bg-beige"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q2: Age */}
              {currentStep === 2 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q2. What is your age? *
                    </h3>
                  </TextBlockAnimation>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                    {[
                      "Below 18",
                      "18-25",
                      "25-30",
                      "30-40",
                      "40-50",
                      "50-60",
                      "60+",
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectRadio("q2", opt)}
                        className={`p-4 rounded-2xl border-2 border-olive font-bold text-center transition-all ${
                          answers.q2 === opt
                            ? "bg-olive text-cream shadow-[3px_3px_0_#2A3620]"
                            : "bg-beige/40 text-olive hover:bg-beige"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q3: Neurology vs Psychology */}
              {currentStep === 3 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q3. Do you know the basic difference between neurology and psychology? *
                    </h3>
                  </TextBlockAnimation>
                  <div className="space-y-3 mt-6">
                    {["Yes", "No", "To some extent"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectRadio("q3", opt)}
                        className={`w-full p-5 rounded-2xl border-2 border-olive font-bold text-lg text-left transition-all ${
                          answers.q3 === opt
                            ? "bg-olive text-cream shadow-[4px_4px_0_#2A3620]"
                            : "bg-beige/40 text-olive hover:bg-beige"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q4: If yes/to some extent, how much? */}
              {currentStep === 4 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q4. How much do you know about this difference?
                    </h3>
                  </TextBlockAnimation>
                  <p className="text-body-text text-sm mt-2">
                    Share a sentence or two about your understanding.
                  </p>
                  <div className="mt-6">
                    <SoftInput
                      value={answers.q4}
                      onChange={(val) =>
                        setAnswers((prev) => ({ ...prev, q4: val }))
                      }
                      isTextArea
                      placeholder="e.g. Neurology deals with physical nervous system disorders, psychology deals with mind & behavior..."
                    />
                  </div>
                </div>
              )}

              {/* Q5: Susceptible gender */}
              {currentStep === 5 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q5. In your opinion which gender is more susceptible to conditions such as migraine, vertigo, hypertension, etc.? *
                    </h3>
                  </TextBlockAnimation>
                  <div className="space-y-3 mt-6">
                    {["Men", "Women", "Both are equally susceptible"].map(
                      (opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectRadio("q5", opt)}
                          className={`w-full p-5 rounded-2xl border-2 border-olive font-bold text-lg text-left transition-all ${
                            answers.q5 === opt
                              ? "bg-olive text-cream shadow-[4px_4px_0_#2A3620]"
                              : "bg-beige/40 text-olive hover:bg-beige"
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Q6: Visiting doctor minor symptoms */}
              {currentStep === 6 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q6. Who do you believe is more likely to visit a doctor when experiencing minor symptoms? *
                    </h3>
                  </TextBlockAnimation>
                  <p className="text-body-text text-sm mt-2">
                    (e.g. headaches, vertigo, numbness, etc.)
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {["Men", "Women"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectRadio("q6", opt)}
                        className={`p-5 rounded-2xl border-2 border-olive font-bold text-lg text-center transition-all ${
                          answers.q6 === opt
                            ? "bg-olive text-cream shadow-[4px_4px_0_#2A3620]"
                            : "bg-beige/40 text-olive hover:bg-beige"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q7: Reason for Q6 */}
              {currentStep === 7 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q7. Depending on your previous answer, explain why you think so. *
                    </h3>
                  </TextBlockAnimation>
                  <div className="mt-6">
                    <SoftInput
                      value={answers.q7}
                      onChange={(val) =>
                        setAnswers((prev) => ({ ...prev, q7: val }))
                      }
                      isTextArea
                      placeholder="Explain your reasoning here..."
                    />
                  </div>
                </div>
              )}

              {/* Q8: Conditions common in women (Multi-select) */}
              {currentStep === 8 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q8. Which neurological conditions do you think are more common in women? *
                    </h3>
                  </TextBlockAnimation>
                  <p className="text-body-text text-sm mt-2">
                    Select all that apply. Feel free to search conditions up if needed.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                    {[
                      "Migraine",
                      "Stress",
                      "Hypertension",
                      "Alzheimers",
                      "Stroke",
                      "ADHD",
                      "Anxiety",
                      "Depression",
                    ].map((cond) => (
                      <RethemedNeonCheckbox
                        key={cond}
                        label={cond}
                        checked={answers.q8.includes(cond)}
                        onChange={() => handleToggleQ8(cond)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Q9: Women caregivers / nurturers */}
              {currentStep === 9 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q9. Traditionally, particularly in Pakistan, women are regarded as primary nurturers. Do you believe this responsibility makes women more likely to seek medical care?
                    </h3>
                  </TextBlockAnimation>
                  <div className="space-y-3 mt-6">
                    {likertOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectRadio("q9", opt)}
                        className={`w-full p-4 rounded-2xl border-2 border-olive font-bold text-left transition-all ${
                          answers.q9 === opt
                            ? "bg-olive text-cream shadow-[3px_3px_0_#2A3620]"
                            : "bg-beige/40 text-olive hover:bg-beige"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q10: Family encouragement */}
              {currentStep === 10 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q10. Do you think family members are more likely to encourage women to seek medical attention upon experiencing minor symptoms compared to men?
                    </h3>
                  </TextBlockAnimation>
                  <div className="space-y-3 mt-6">
                    {likertOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectRadio("q10", opt)}
                        className={`w-full p-4 rounded-2xl border-2 border-olive font-bold text-left transition-all ${
                          answers.q10 === opt
                            ? "bg-olive text-cream shadow-[3px_3px_0_#2A3620]"
                            : "bg-beige/40 text-olive hover:bg-beige"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q11: Men hiding struggles */}
              {currentStep === 11 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q11. Do you believe men in Pakistan are expected to hide their struggles to appear masculine? *
                    </h3>
                  </TextBlockAnimation>
                  <div className="space-y-3 mt-6">
                    {likertOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectRadio("q11", opt)}
                        className={`w-full p-4 rounded-2xl border-2 border-olive font-bold text-left transition-all ${
                          answers.q11 === opt
                            ? "bg-olive text-cream shadow-[3px_3px_0_#2A3620]"
                            : "bg-beige/40 text-olive hover:bg-beige"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q12: Men & Financial constraint */}
              {currentStep === 12 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q12. Do you believe men are reluctant to visit a doctor due to financial constraint? *
                    </h3>
                  </TextBlockAnimation>
                  <div className="space-y-3 mt-6">
                    {likertOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectRadio("q12", opt)}
                        className={`w-full p-4 rounded-2xl border-2 border-olive font-bold text-left transition-all ${
                          answers.q12 === opt
                            ? "bg-olive text-cream shadow-[3px_3px_0_#2A3620]"
                            : "bg-beige/40 text-olive hover:bg-beige"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q13: Minor symptoms yourself */}
              {currentStep === 13 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q13. Would you visit a doctor if you experience minor symptoms? *
                    </h3>
                  </TextBlockAnimation>
                  <p className="text-body-text text-sm mt-2">
                    (e.g. mild headache, slight sleeplessness, slight dizziness)
                  </p>
                  <div className="space-y-3 mt-6">
                    {likertOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectRadio("q13", opt)}
                        className={`w-full p-4 rounded-2xl border-2 border-olive font-bold text-left transition-all ${
                          answers.q13 === opt
                            ? "bg-olive text-cream shadow-[3px_3px_0_#2A3620]"
                            : "bg-beige/40 text-olive hover:bg-beige"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q14: Moderate symptoms yourself */}
              {currentStep === 14 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q14. Would you visit a doctor if you experience moderate symptoms? *
                    </h3>
                  </TextBlockAnimation>
                  <p className="text-body-text text-sm mt-2">
                    (e.g. consistent sleeplessness or constant dizziness)
                  </p>
                  <div className="space-y-3 mt-6">
                    {likertOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectRadio("q14", opt)}
                        className={`w-full p-4 rounded-2xl border-2 border-olive font-bold text-left transition-all ${
                          answers.q14 === opt
                            ? "bg-olive text-cream shadow-[3px_3px_0_#2A3620]"
                            : "bg-beige/40 text-olive hover:bg-beige"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q15: Severe symptoms yourself */}
              {currentStep === 15 && (
                <div>
                  <TextBlockAnimation blockColor="#3B4A2B">
                    <h3 className="font-serif text-xl md:text-3xl font-extrabold text-olive leading-snug">
                      Q15. Would you visit a doctor if you experience severe symptoms? *
                    </h3>
                  </TextBlockAnimation>
                  <p className="text-body-text text-sm mt-2">
                    (e.g. migraines, insomnia, unbearable vertigo)
                  </p>
                  <div className="space-y-3 mt-6">
                    {likertOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectRadio("q15", opt)}
                        className={`w-full p-4 rounded-2xl border-2 border-olive font-bold text-left transition-all ${
                          answers.q15 === opt
                            ? "bg-olive text-cream shadow-[3px_3px_0_#2A3620]"
                            : "bg-beige/40 text-olive hover:bg-beige"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 mt-8 md:mt-10 pt-5 md:pt-6 border-t border-olive/20">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full font-bold text-sm md:text-base transition-all ${
                currentStep === 1
                  ? "opacity-30 pointer-events-none text-olive"
                  : "bg-beige text-olive hover:bg-sage/40"
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`inline-flex items-center gap-2 px-5 sm:px-8 py-3 md:py-3.5 rounded-full font-bold text-sm md:text-base shadow-[3px_3px_0_#2A3620] transition-all ${
                canGoNext()
                  ? "bg-olive text-cream hover:scale-105 active:scale-95"
                  : "opacity-40 pointer-events-none bg-olive/50 text-cream"
              }`}
            >
              {currentStep === totalSteps ? (
                <>
                  Submit Survey <CheckCircle2 className="w-5 h-5" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}