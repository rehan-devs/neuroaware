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

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<FullSubmission[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  // Simple client-side gate (change this password!)
  const ADMIN_PASS = "lishipishi6769";

  useEffect(() => {
    if (authed) {
      (async () => {
        const data = await getSubmissions();
        setSubmissions(data);
      })();
    }
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setAuthed(true);
    } else {
      alert("Wrong password");
    }
  };

  const handleClear = async () => {
    if (confirm("Delete ALL submissions? This cannot be undone.")) {
      await deleteAllSubmissions();
      setSubmissions([]);
    }
  };

  const handleDeleteOne = async (id: string) => {
    await deleteSubmission(id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="bg-beige border-2 border-olive rounded-3xl p-10 shadow-[8px_8px_0_#3B4A2B] w-full max-w-sm space-y-6"
        >
          <div className="flex justify-center">
            <Shield className="w-12 h-12 text-olive" />
          </div>
          <h1 className="font-serif text-3xl font-black text-olive text-center">
            Admin Access
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border-2 border-olive rounded-2xl p-4 bg-cream text-olive font-bold outline-none focus:shadow-[4px_4px_0_#3B4A2B]"
          />
          <button
            type="submit"
            className="w-full bg-olive text-cream py-4 rounded-full font-bold shadow-[4px_4px_0_#2A3620] hover:scale-[1.02] transition-transform"
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

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-olive text-cream px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6" />
          <h1 className="font-serif text-xl font-black">NeuroAware Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-cream/70 hidden sm:block">
            {submissions.length} submission{submissions.length !== 1 && "s"}
          </span>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 bg-cream/10 hover:bg-cream/20 rounded-full text-sm font-bold transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-cream text-olive rounded-full text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Site
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-4">
        {submissions.length === 0 && (
          <div className="text-center py-32 text-olive/50">
            <p className="font-serif text-2xl font-bold">No submissions yet</p>
            <p className="mt-2 text-sm">
              They will appear here once users complete the survey.
            </p>
          </div>
        )}

        <AnimatePresence>
          {submissions.map((sub) => {
            const isOpen = expanded === sub.id;
            const formattedDate = sub.created_at
              ? new Date(sub.created_at).toLocaleString()
              : "";

            return (
              <motion.div
                key={sub.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-beige border-2 border-olive rounded-2xl overflow-hidden shadow-[4px_4px_0_#3B4A2B]"
              >
                {/* Summary row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : sub.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-cream/40 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-olive text-cream flex items-center justify-center font-black shrink-0">
                      {sub.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-olive truncate">{sub.name}</p>
                      <p className="text-xs text-body-text truncate">
                        {sub.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-olive/50 hidden sm:block">
                      {formattedDate}
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
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 border-t border-olive/15 space-y-5">
                        {/* Contact chips */}
                        <div className="flex flex-wrap gap-3 pt-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream rounded-full text-xs font-bold text-olive border border-olive/20">
                            <User className="w-3.5 h-3.5" /> {sub.name}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream rounded-full text-xs font-bold text-olive border border-olive/20">
                            <Mail className="w-3.5 h-3.5" /> {sub.email}
                          </span>
                          {sub.phone && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream rounded-full text-xs font-bold text-olive border border-olive/20">
                              <Phone className="w-3.5 h-3.5" /> {sub.phone}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream rounded-full text-xs font-bold text-olive border border-olive/20">
                            <Calendar className="w-3.5 h-3.5" /> {formattedDate}
                          </span>
                        </div>

                        {/* Answers */}
                        <div className="space-y-3">
                          {Object.entries(sub.answers).map(([key, val]) => {
                            if (!val || (Array.isArray(val) && val.length === 0))
                              return null;
                            return (
                              <div
                                key={key}
                                className="bg-cream rounded-xl p-4 border border-olive/10"
                              >
                                <p className="text-xs font-bold text-olive/50 uppercase tracking-wide mb-1">
                                  {QUESTION_LABELS[key] || key}
                                </p>
                                <p className="text-sm font-semibold text-olive">
                                  {Array.isArray(val) ? val.join(", ") : val}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => handleDeleteOne(sub.id)}
                          className="flex items-center gap-2 text-red-700 text-sm font-bold hover:underline"
                        >
                          <Trash2 className="w-4 h-4" /> Delete this submission
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