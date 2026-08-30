"use client";
import React, { useEffect, useState } from "react";
import {
  getSubmissions,
  deleteSubmission,
  deleteAllSubmissions,
  type FullSubmission,
} from "@/lib/submissionStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Trash2,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  User,
  Calendar,
  ArrowLeft,
  Lock,
} from "lucide-react";
import Link from "next/link";

const QUESTION_LABELS: Record<string, string> = {
  q1: "Gender",
  q2: "Age",
  q3: "Know difference between neurology & psychology?",
  q4: "How much do you know?",
  q5: "Which gender more susceptible to migraine/vertigo/etc?",
  q6: "Who is more likely to visit doctor for minor symptoms?",
  q7: "Why do you think so?",
  q8: "Conditions more common in women",
  q9: "Caregiver role → women more likely to seek care?",
  q10: "Family more likely to encourage women vs men?",
  q11: "Men expected to hide struggles for masculinity?",
  q12: "Men reluctant due to financial constraint?",
  q13: "Would YOU visit doctor for minor symptoms?",
  q14: "Would YOU visit doctor for moderate symptoms?",
  q15: "Would YOU visit doctor for severe symptoms?",
};

const ADMIN_PASS = "lishipishi6769";

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<FullSubmission[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authed) return;
    (async () => {
      setLoading(true);
      const data = await getSubmissions();
      setSubmissions(data);
      setLoading(false);
    })();
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) setAuthed(true);
    else alert("Wrong password");
  };

  const handleClear = async () => {
    if (!confirm("Delete ALL submissions? This cannot be undone.")) return;
    await deleteAllSubmissions();
    setSubmissions([]);
  };

  const handleDeleteOne = async (id: string) => {
    await deleteSubmission(id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (expanded === id) setExpanded(null);
  };

  // ── LOGIN SCREEN ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4 sm:p-6">
        <form
          onSubmit={handleLogin}
          className="bg-beige border-2 border-olive rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0_#3B4A2B] w-full max-w-sm space-y-5"
        >
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-full bg-olive flex items-center justify-center">
              <Lock className="w-6 h-6 text-cream" />
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-olive text-center">
            Admin Access
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border-2 border-olive rounded-xl sm:rounded-2xl p-3.5 sm:p-4 bg-cream text-olive font-bold outline-none focus:shadow-[4px_4px_0_#3B4A2B] text-base"
          />
          <button
            type="submit"
            className="w-full bg-olive text-cream py-3.5 sm:py-4 rounded-full font-bold shadow-[4px_4px_0_#2A3620] active:scale-[0.98] transition-transform text-base"
          >
            Enter Dashboard
          </button>
          <Link
            href="/"
            className="block text-center text-sm text-olive/60 hover:text-olive"
          >
            ← Back to site
          </Link>
        </form>
      </div>
    );
  }

  // ── DASHBOARD ──
  return (
    <div className="min-h-screen bg-cream pb-10">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-olive text-cream px-3 sm:px-6 py-3 sm:py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Left */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            <div className="min-w-0">
              <h1 className="font-serif text-base sm:text-xl font-black truncate">
                NeuroAware Admin
              </h1>
              <p className="text-[10px] sm:text-xs text-cream/60 sm:hidden">
                {submissions.length} submission
                {submissions.length !== 1 && "s"}
              </p>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <span className="text-xs sm:text-sm text-cream/70 hidden sm:block">
              {submissions.length} submission
              {submissions.length !== 1 && "s"}
            </span>

            <button
              onClick={handleClear}
              className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 bg-cream/10 hover:bg-cream/20 active:bg-cream/25 rounded-full text-xs sm:text-sm font-bold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:inline">Clear</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 bg-cream text-olive rounded-full text-xs sm:text-sm font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Site</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-10 space-y-3 sm:space-y-4">
        {loading && (
          <p className="text-center text-olive/50 py-20 text-sm font-bold">
            Loading submissions…
          </p>
        )}

        {!loading && submissions.length === 0 && (
          <div className="text-center py-20 sm:py-32 text-olive/50 px-4">
            <p className="font-serif text-xl sm:text-2xl font-bold">
              No submissions yet
            </p>
            <p className="mt-2 text-xs sm:text-sm">
              They will appear here once users complete the survey.
            </p>
          </div>
        )}

        <AnimatePresence>
          {submissions.map((sub) => {
            const isOpen = expanded === sub.id;
            return (
              <motion.div
                key={sub.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="bg-beige border-2 border-olive rounded-xl sm:rounded-2xl overflow-hidden shadow-[3px_3px_0_#3B4A2B] sm:shadow-[4px_4px_0_#3B4A2B]"
              >
                {/* Summary row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : sub.id)}
                  className="w-full flex items-center justify-between gap-2 p-3.5 sm:p-5 text-left hover:bg-cream/40 active:bg-cream/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-olive text-cream flex items-center justify-center font-black shrink-0 text-sm sm:text-base">
                      {sub.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-olive text-sm sm:text-base truncate">
                        {sub.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-body-text truncate">
                        {sub.email}
                      </p>
                      <p className="text-[10px] text-olive/40 mt-0.5 sm:hidden">
                        {new Date(sub.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-olive/50 hidden sm:block whitespace-nowrap">
                      {new Date(sub.created_at).toLocaleString()}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-olive" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-olive" />
                    )}
                  </div>
                </button>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3.5 sm:px-5 pb-5 sm:pb-6 border-t border-olive/15 space-y-4">
                        {/* Contact chips */}
                        <div className="flex flex-wrap gap-2 pt-3.5 sm:pt-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-cream rounded-full text-[11px] sm:text-xs font-bold text-olive border border-olive/20 max-w-full">
                            <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                            <span className="truncate">{sub.name}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-cream rounded-full text-[11px] sm:text-xs font-bold text-olive border border-olive/20 max-w-full">
                            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                            <span className="truncate">{sub.email}</span>
                          </span>
                          {sub.phone && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-cream rounded-full text-[11px] sm:text-xs font-bold text-olive border border-olive/20">
                              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                              {sub.phone}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-cream rounded-full text-[11px] sm:text-xs font-bold text-olive border border-olive/20">
                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                            {new Date(sub.created_at).toLocaleString()}
                          </span>
                        </div>

                        {/* Answers */}
                        <div className="space-y-2 sm:space-y-3">
                          {Object.entries(sub.answers).map(([key, val]) => {
                            if (
                              !val ||
                              (Array.isArray(val) && val.length === 0)
                            )
                              return null;
                            return (
                              <div
                                key={key}
                                className="bg-cream rounded-lg sm:rounded-xl p-3 sm:p-4 border border-olive/10"
                              >
                                <p className="text-[10px] sm:text-xs font-bold text-olive/50 uppercase tracking-wide mb-1 leading-snug">
                                  {QUESTION_LABELS[key] || key}
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-olive break-words leading-relaxed">
                                  {Array.isArray(val) ? val.join(", ") : val}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => handleDeleteOne(sub.id)}
                          className="flex items-center gap-2 text-red-700 text-xs sm:text-sm font-bold hover:underline active:opacity-70 pt-1"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          Delete this submission
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </main>
    </div>
  );
}