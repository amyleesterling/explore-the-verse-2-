"use client";

import { AnimatePresence, motion } from "framer-motion";
import { thresholdLabels } from "@/lib/scale-data";

type Props = {
  zoom: number;
};

const PROXIMITY = 0.45;

export function ThresholdTag({ zoom }: Props) {
  const active = thresholdLabels.find((t) => Math.abs(t.atLog - zoom) < PROXIMITY);

  return (
    <div className="pointer-events-none flex justify-center">
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.atLog}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-center"
          >
            <div className="font-display text-base text-white/70">{active.label}</div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
              {active.sub}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
