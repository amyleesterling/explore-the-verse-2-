"use client";

import { AnimatePresence, motion } from "framer-motion";
import { thresholdLabels } from "@/lib/scale-data";

type Props = {
  zoom: number;
};

const PROXIMITY = 0.45;

// Rises from below like a sign you're passing on a long road, then drifts away.
export function ThresholdTag({ zoom }: Props) {
  const active = thresholdLabels.find((t) => Math.abs(t.atLog - zoom) < PROXIMITY);

  return (
    <div className="pointer-events-none flex justify-center">
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.atLog}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: [0.2, 0.65, 0.3, 1] }}
            className="text-center"
          >
            <div className="font-display text-base italic text-white/80">
              {active.label}
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
              {active.sub}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
