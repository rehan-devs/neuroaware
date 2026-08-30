import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function smoothScrollTo(target: string | number | HTMLElement) {
  if (typeof window === "undefined") return;

  const lenis = (window as unknown as { lenis?: { scrollTo: (target: string | number | HTMLElement, options?: { duration?: number }) => void } }).lenis;

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4 });
  } else if (typeof target === "string") {
    const id = target.startsWith("#") ? target.slice(1) : target;
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}