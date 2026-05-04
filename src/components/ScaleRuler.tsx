"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import {
  jumpStops,
  maxLog,
  minLog,
  scaleObjects,
  categoryStyles,
} from "@/lib/scale-data";
import { findIndexOfId, log10 } from "@/lib/scale-helpers";

type Props = {
  zoom: MotionValue<number>;
  onJumpTo: (zoomTarget: number) => void;
};

export function ScaleRuler({ zoom, onJumpTo }: Props) {
  // Map zoom (log meters) -> 0..1 along the rail (top = max, bottom = min so we read top→big? Let's do top = big, bottom = small).
  const indicatorY = useTransform(zoom, (z) => {
    const t = (z - minLog) / (maxLog - minLog);
    return `${(1 - t) * 100}%`;
  });

  const ticks: { log: number; label: string }[] = [];
  for (let n = Math.ceil(minLog); n <= Math.floor(maxLog); n++) {
    if (n % 3 !== 0) continue;
    ticks.push({ log: n, label: powerLabel(n) });
  }

  return (
    <div className="pointer-events-auto flex h-full select-none items-stretch gap-4">
      {/* Jump chips */}
      <div className="hidden flex-col justify-center gap-1.5 lg:flex">
        {jumpStops.map((js) => {
          const idx = findIndexOfId(js.id);
          const obj = scaleObjects[idx];
          const tgt = log10(obj.size);
          const tint = categoryStyles[obj.category].tint;
          return (
            <button
              key={js.id}
              type="button"
              onClick={() => onJumpTo(tgt)}
              className="group flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/55 transition hover:text-white/95"
            >
              <span
                className="block h-1.5 w-1.5 rounded-full transition-all group-hover:scale-150"
                style={{ background: tint, boxShadow: `0 0 8px ${tint}` }}
              />
              {js.label}
            </button>
          );
        })}
      </div>

      {/* Vertical rail */}
      <div className="relative flex w-12 flex-col items-center">
        <div className="relative h-full w-px bg-white/10">
          {ticks.map((t) => {
            const top = ((maxLog - t.log) / (maxLog - minLog)) * 100;
            return (
              <div
                key={t.log}
                className="absolute right-0 flex items-center gap-2"
                style={{ top: `${top}%`, transform: "translateY(-50%)" }}
              >
                <div className="h-px w-3 bg-white/20" />
                <span className="font-mono text-[10px] tracking-wider text-white/35">
                  {t.label}
                </span>
              </div>
            );
          })}
        </div>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: indicatorY }}
        >
          <div className="-translate-y-1/2">
            <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7),0_0_36px_rgba(124,224,255,0.6)]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function powerLabel(n: number): string {
  const supers: Record<string, string> = {
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
    "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  };
  const sign = n < 0 ? "⁻" : "";
  const digits = Math.abs(n)
    .toString()
    .split("")
    .map((d) => supers[d] ?? d)
    .join("");
  return `10${sign}${digits} m`;
}
