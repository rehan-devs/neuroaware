"use client";
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { NeurologyFacts } from "@/components/NeurologyFacts";
import {
  QuestionsSection,
  type AnswersState,
} from "@/components/QuestionsSection";
import { DoodleUserInfoModal } from "@/components/DoodleUserInfoModal";
import { CongratulationsModal } from "@/components/CongratulationsModal";
import { Footer } from "@/components/Footer";
import { NavDock } from "@/components/NavDock";
import { saveSubmission } from "@/lib/submissionStore";

export default function Home() {
  const [answers, setAnswers] = useState<AnswersState | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [userName, setUserName] = useState("");

  const handleQuizComplete = (a: AnswersState) => {
    setAnswers(a);
    setShowUserModal(true);
  };

  const handleUserInfoSubmit = async (info: {
    name: string;
    email: string;
    phone: string;
  }) => {
    if (answers) {
      try {
        await saveSubmission(info, answers);
      } catch {
        alert("Something went wrong saving your response. Please try again.");
        return;
      }
    }
    setUserName(info.name);
    setShowUserModal(false);
    setShowCongrats(true);
  };

  const handleCongratsClose = () => {
    setShowCongrats(false);
    setAnswers(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main id="top">
      <Hero />
      <AboutSection />
      <NeurologyFacts />
      <QuestionsSection onComplete={handleQuizComplete} />
      <Footer />
      <NavDock />

      <DoodleUserInfoModal
        isOpen={showUserModal}
        onSubmit={handleUserInfoSubmit}
      />
      <CongratulationsModal
        isOpen={showCongrats}
        onClose={handleCongratsClose}
        userName={userName}
      />
    </main>
  );
}