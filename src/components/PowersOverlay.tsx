"use client";

import { AnimatePresence, motion, type MotionValue, useTransform } from "framer-motion";
import { formatScientific } from "@/lib/scale-helpers";

type Props = {
  zoom: MotionValue<number>;
  visible: boolean;
};

// Continuous mantissa × 10ⁿ readout instead of a quantized rounded power.
export function PowersOverlay({ zoom, visible }: Props) {
  const reading = useTransform(zoom, (z) => formatScientific(z));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="powers"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none flex justify-center"
        >
          <div className="text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
              current scale
            </div>
            <motion.div className="mt-1 font-mono text-3xl tracking-wider text-white/85">
              {reading}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
