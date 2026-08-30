"use client";
import React, { useState } from "react";

interface SendButtonProps {
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
}

export function SendButton({
  onClick,
  label = "Send Message",
  disabled = false,
}: SendButtonProps) {
  const [sent, setSent] = useState(false);

  const handleClick = () => {
    if (disabled || sent) return;
    setSent(true);
    onClick?.();
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="send-btn group relative"
      style={{
        ["--primary" as string]: "#3B4A2B",
        ["--neutral-1" as string]: "#F5EDE3",
        ["--neutral-2" as string]: "#E8DDD1",
        ["--radius" as string]: "14px",
      }}
    >
      <style jsx>{`
        .send-btn {
          cursor: pointer;
          border-radius: var(--radius);
          border: none;
          box-shadow: 0 0.5px 0.5px 1px rgba(255, 255, 255, 0.2),
            0 10px 20px rgba(0, 0, 0, 0.15), 0 4px 5px 0px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
          min-width: 200px;
          padding: 18px 24px;
          height: 64px;
          font-family: "Nunito", sans-serif;
          font-size: 17px;
          font-weight: 700;
          background: linear-gradient(to top, var(--neutral-1), var(--neutral-2));
          color: var(--primary);
        }
        .send-btn:hover {
          transform: scale(1.03);
        }
        .send-btn:active {
          transform: scale(1);
        }
        .send-btn:disabled {
          opacity: 0.5;
          pointer-events: none;
        }
        .state {
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 2;
        }
        .state span {
          display: inline-block;
        }
        .icon {
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
        }
        .send-btn:hover .icon-default {
          transform: rotate(45deg) scale(1.15);
        }
        .state-sent {
          display: none;
        }
        .send-btn.sent .state-default {
          display: none;
        }
        .send-btn.sent .state-sent {
          display: flex;
        }
      `}</style>

      <div className={`state state-default ${sent ? "hidden" : "flex"}`}>
        <div className="icon icon-default">
          <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.22 21.63c-1.18 0-2.85-.83-4.17-4.8l-.72-2.16-2.16-.72C3.21 12.63 2.38 10.96 2.38 9.78c0-1.17.83-2.85 4.79-4.18l8.49-2.83c2.12-.71 3.89-.5 4.98.58 1.09 1.08 1.3 2.86.59 4.98l-2.83 8.49c-1.33 3.98-3 4.81-4.18 4.81zm-6.58-14.6C5.02 7.96 4.03 9.06 4.03 9.78c0 .72.99 1.82 3.77 2.74l2.52.84c.22.07.4.25.47.47l.84 2.52c.92 2.78 2.03 3.77 2.75 3.77.72 0 1.82-.99 2.75-3.77l2.83-8.49c.51-1.54.42-2.8-.23-3.45-.65-.65-1.91-.74-3.45-.23L7.64 7.03z" />
            <path d="M10.11 14.4a.75.75 0 01-.53-1.28l3.58-3.59a.75.75 0 011.06 1.06l-3.58 3.58a.75.75 0 01-.53.23z" />
          </svg>
        </div>
        <p>
          {label.split("").map((ch, i) => (
            <span key={i} style={{ ["--i" as string]: i }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </p>
      </div>

      <div className={`state state-sent ${sent ? "flex" : "hidden"}`}>
        <div className="icon">
          <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25 21.25 17.1 21.25 12 17.1 2.75 12 2.75z" />
            <path d="M10.58 15.58a.75.75 0 01-.53-.22L7.22 12.53a.75.75 0 011.06-1.06l2.3 2.3 5.14-5.14a.75.75 0 011.06 1.06l-5.67 5.67a.75.75 0 01-.53.22z" />
          </svg>
        </div>
        <p className="font-bold">Sent!</p>
      </div>
    </button>
  );
}