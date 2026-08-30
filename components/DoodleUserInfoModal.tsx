"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./DoodleModal.module.css";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

interface DoodleUserInfoModalProps {
  isOpen: boolean;
  onSubmit: (info: UserInfo) => void;
}

export function DoodleUserInfoModal({
  isOpen,
  onSubmit,
}: DoodleUserInfoModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleFrontNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please fill out both Name and Email.");
      return;
    }
    setError("");
    setIsFlipped(true);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-olive-dark/60 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className={styles.doodleWrapper}>
            {/* Toggle Checkbox */}
            <input
              type="checkbox"
              id="doodle-flip"
              className={styles.doodleToggle}
              checked={isFlipped}
              onChange={(e) => setIsFlipped(e.target.checked)}
            />

            {/* Header Switch */}
            <div className={styles.doodleHeader}>
              <span className={`${styles.doodleModeText} ${styles.loginText}`}>
                Step 1: Contact
              </span>
              <label
                className={styles.doodleSwitchLabel}
                htmlFor="doodle-flip"
                tabIndex={0}
              >
                <span className={styles.doodleSwitchHandle}></span>
              </label>
              <span className={`${styles.doodleModeText} ${styles.signupText}`}>
                Step 2: Phone (Optional)
              </span>
            </div>

            {/* 3D Scene */}
            <div className={styles.doodleCardScene}>
              {/* SVGs */}
              <svg
                className={`${styles.doodleSvg} ${styles.doodleStar}`}
                viewBox="0 0 24 24"
                fill="#B5B5A4"
                stroke="#3B4A2B"
                strokeWidth="1.5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <svg
                className={`${styles.doodleSvg} ${styles.doodleSparkle}`}
                viewBox="0 0 24 24"
                fill="#3B4A2B"
                stroke="#3B4A2B"
                strokeWidth="1.5"
              >
                <path d="M12 2 Q12 12 22 12 Q12 12 12 22 Q12 12 2 12 Q12 12 12 2 Z" />
              </svg>

              <div className={styles.doodleCardInner}>
                {/* FRONT: Name & Email */}
                <div className={styles.doodleCardFront}>
                  <div className={styles.doodleTitle}>Almost Done!</div>
                  <p className="text-xs text-olive font-bold mb-3 text-center">
                    Please provide your name & email to submit your survey.
                  </p>
                  
                  <form className={styles.doodleForm} onSubmit={handleFrontNext}>
                    <div className={styles.doodleInputWrapper}>
                      <input
                        className={styles.doodleInput}
                        placeholder="Your Name *"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.doodleInputWrapper}>
                      <input
                        className={styles.doodleInput}
                        placeholder="Your Email *"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    {error && (
                      <p className="text-xs font-bold text-red-600">{error}</p>
                    )}

                    <button type="submit" className={styles.doodleBtn}>
                      Next ➔
                    </button>
                  </form>
                </div>

                {/* BACK: Phone (Optional) & Finish */}
                <div className={styles.doodleCardBack}>
                  <div className={`${styles.doodleTitle} ${styles.doodleTitleAlt}`}>
                    One Last Detail!
                  </div>
                  <p className="text-xs text-olive font-bold mb-3 text-center">
                    Contact phone number is optional, but helps us reach out.
                  </p>

                  <form className={styles.doodleForm} onSubmit={handleFinalSubmit}>
                    <div className={styles.doodleInputWrapper}>
                      <input
                        className={styles.doodleInput}
                        placeholder="Phone Number (Optional)"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`${styles.doodleBtn} ${styles.doodleBtnAlt}`}
                    >
                      Confirm & Submit!
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}