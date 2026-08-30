"use client";
import React from "react";
import {
  MagneticDock,
  type DockItemData,
} from "@/components/ui/magnetic-dock";
import { Home, HelpCircle, Brain, Instagram } from "lucide-react";

export function NavDock() {
  const items: DockItemData[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-full h-full" />,
      onClick: () => {
        document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
      },
      isActive: true,
    },
    {
      id: "about",
      label: "About",
      icon: <Brain className="w-full h-full" />,
      onClick: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "quiz",
      label: "Survey",
      icon: <HelpCircle className="w-full h-full" />,
      onClick: () => {
        document
          .getElementById("questions")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: <Instagram className="w-full h-full" />,
      onClick: () => {
        window.open("https://www.instagram.com/neuroaware.pk", "_blank");
      },
    },
  ];

  return (
    <div className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 flex">
      <MagneticDock
        items={items}
        iconSize={44}
        maxScale={1.4}
        magneticDistance={100}
        showLabels
        variant="glass"
        className="!bg-cream/90 !border-olive/30 !shadow-xl md:!gap-2 !gap-1 !p-2 md:!p-3"
      />
    </div>
  );
}