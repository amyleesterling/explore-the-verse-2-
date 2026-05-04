"use client";

import { motion } from "framer-motion";
import { categoryStyles, type ScaleCategory } from "@/lib/scale-data";

type Props = {
  category: ScaleCategory;
  proximity: number;
};

// A full-screen colored veil whose tint follows the current focal category.
// Soft enough to read as atmosphere, not as a filter.
export function AmbientPalette({ category, proximity }: Props) {
  const tint = categoryStyles[category].tint;
  // Even when far from focal, keep a low ambient base so the palette
  // never disappears completely.
  const intensity = 0.18 + proximity * 0.18;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        zIndex: 1,
        mixBlendMode: "screen",
      }}
      animate={{
        background: [
          `radial-gradient(ellipse 70% 55% at 50% 38%, ${tint}${alpha(intensity)}, transparent 60%),` +
            `radial-gradient(ellipse 60% 45% at 18% 80%, ${tint}${alpha(intensity * 0.55)}, transparent 65%),` +
            `radial-gradient(ellipse 60% 45% at 82% 78%, ${tint}${alpha(intensity * 0.45)}, transparent 65%)`,
        ],
      }}
      transition={{ duration: 1.6, ease: "easeInOut" }}
    />
  );
}

function alpha(a: number): string {
  const v = Math.round(Math.max(0, Math.min(1, a)) * 255)
    .toString(16)
    .padStart(2, "0");
  return v;
}
