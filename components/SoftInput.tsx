"use client";
import React from "react";

interface SoftInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  isTextArea?: boolean;
}

export function SoftInput({
  value,
  onChange,
  placeholder = "Type your response here...",
  isTextArea = false,
}: SoftInputProps) {
  if (isTextArea) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full border-2 border-olive/30 outline-none rounded-2xl p-4 bg-[#E2D8CB] text-olive font-medium shadow-[inset_2px_5px_10px_rgba(0,0,0,0.15)] transition-all duration-300 focus:bg-cream focus:border-olive focus:scale-[1.01] focus:shadow-[0px_8px_30px_rgba(59,74,43,0.15)]"
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border-2 border-olive/30 outline-none rounded-2xl p-4 bg-[#E2D8CB] text-olive font-medium shadow-[inset_2px_5px_10px_rgba(0,0,0,0.15)] transition-all duration-300 focus:bg-cream focus:border-olive focus:scale-[1.01] focus:shadow-[0px_8px_30px_rgba(59,74,43,0.15)]"
    />
  );
}