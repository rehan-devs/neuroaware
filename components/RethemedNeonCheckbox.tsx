"use client";
import React from "react";

interface RethemedNeonCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function RethemedNeonCheckbox({
  checked,
  onChange,
  label,
}: RethemedNeonCheckboxProps) {
  return (
    <label
      onClick={() => onChange(!checked)}
      className="group flex items-center gap-4 p-4 rounded-2xl bg-cream border-2 border-olive cursor-pointer select-none transition-all duration-200 hover:shadow-[4px_4px_0_#3B4A2B] hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className="relative w-7 h-7 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-7 h-7 rounded-lg border-2 border-olive transition-all duration-300 flex items-center justify-center ${
            checked ? "bg-olive shadow-[0_0_12px_rgba(59,74,43,0.5)]" : "bg-cream"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-5 h-5 text-cream transition-transform duration-300 ${
              checked ? "scale-100" : "scale-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3,12.5l7,7L21,5" />
          </svg>
        </div>
      </div>

      <span
        className={`font-semibold text-base md:text-lg transition-colors ${
          checked ? "text-olive font-extrabold" : "text-body-text"
        }`}
      >
        {label}
      </span>
    </label>
  );
}