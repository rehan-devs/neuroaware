"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextBlockAnimationProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  duration?: number;
  className?: string;
}

export function TextBlockAnimation({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "#3B4A2B",
  duration = 0.6,
  className = "",
}: TextBlockAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !blockRef.current || !contentRef.current) return;

    const block = blockRef.current;
    const content = contentRef.current;

    gsap.set(content, { opacity: 0 });
    gsap.set(block, { scaleX: 0, transformOrigin: "left center" });

    const tl = gsap.timeline({
      delay,
      scrollTrigger: animateOnScroll
        ? {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        : undefined,
    });

    tl.to(block, {
      scaleX: 1,
      duration: duration,
      ease: "expo.inOut",
      transformOrigin: "left center",
    })
      .set(content, { opacity: 1 }, `-=${duration * 0.4}`)
      .to(block, {
        scaleX: 0,
        duration: duration,
        ease: "expo.inOut",
        transformOrigin: "right center",
      });

    return () => {
      tl.kill();
    };
  }, [animateOnScroll, delay, blockColor, duration]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-hidden ${className}`}
    >
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
      <div
        ref={blockRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ backgroundColor: blockColor }}
      />
    </div>
  );
}