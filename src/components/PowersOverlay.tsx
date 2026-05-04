"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { formatPowerOfTen } from "@/lib/scale-helpers";

type Props = {
  zoom: MotionValue<number>;
};

export function PowersOverlay({ zoom }: Props) {
  const power = useTransform(zoom, (z) => formatPowerOfTen(z));

  return (
    <div className="pointer-events-none flex justify-center">
      <div className="text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
          current scale
        </div>
        <motion.div className="mt-1 font-mono text-3xl tracking-wider text-white/85">
          {power}
        </motion.div>
      </div>
    </div>
  );
}
