"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { categoryStyles, type ScaleObject as TScaleObject } from "@/lib/scale-data";
import { log10 } from "@/lib/scale-helpers";

const REFERENCE_FRACTION = 0.46; // when zoom matches obj.size, the object renders as this fraction of the smaller viewport dim
const FADE_SPREAD = 1.4; // log units of full-fade radius

type Props = {
  obj: TScaleObject;
  zoom: MotionValue<number>;
  stageMin: number;
  isSelected: boolean;
  onSelect: () => void;
};

export function ScaleObject({ obj, zoom, stageMin, isSelected, onSelect }: Props) {
  const objLog = log10(obj.size);
  const style = categoryStyles[obj.category];

  const sizePx = useTransform(zoom, (z) => {
    const delta = objLog - z;
    return REFERENCE_FRACTION * stageMin * Math.pow(10, delta);
  });

  const opacity = useTransform(zoom, (z) => {
    const dist = Math.abs(objLog - z);
    if (dist > FADE_SPREAD) return 0;
    return Math.pow(1 - dist / FADE_SPREAD, 2);
  });

  // Title fades in only when very close to the focal scale.
  const labelOpacity = useTransform(zoom, (z) => {
    const dist = Math.abs(objLog - z);
    if (dist > 0.6) return 0;
    return Math.pow(1 - dist / 0.6, 1.6);
  });

  // Slight z-bias so the focal object renders on top
  const zIndex = useTransform(zoom, (z) => {
    const dist = Math.abs(objLog - z);
    return Math.round(1000 - dist * 100);
  });

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={`Focus on ${obj.name}`}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none"
      style={{
        width: sizePx,
        height: sizePx,
        opacity,
        zIndex,
      }}
      transition={{ type: "spring", damping: 25, stiffness: 80 }}
    >
      <div
        className="relative h-full w-full rounded-full"
        style={{
          background: makeBodyGradient(obj.category, style.tint),
          boxShadow: makeGlow(style.glow, isSelected),
          border: `1px solid ${style.ring}`,
        }}
      >
        {/* Subtle inner highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35), rgba(255,255,255,0) 45%)",
            mixBlendMode: "screen",
          }}
        />
        {/* Category-specific overlay flourishes */}
        {obj.category === "stellar" && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-[40%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,220,130,0.35), rgba(255,220,130,0.05) 40%, transparent 65%)",
              filter: "blur(20px)",
            }}
          />
        )}
        {obj.category === "galactic" && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(255,255,255,0.18), transparent 30%, rgba(200,170,255,0.18) 50%, transparent 70%, rgba(255,255,255,0.12))",
              mixBlendMode: "screen",
              maskImage: "radial-gradient(circle, black 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 75%)",
              animation: "orbit 90s linear infinite",
            }}
          />
        )}
        {obj.category === "cosmic" && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2) 0 1px, transparent 1px)," +
                "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.15) 0 1px, transparent 1px)," +
                "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.18) 0 1.5px, transparent 1px)," +
                "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0 1px, transparent 1px)",
              backgroundSize: "100% 100%",
              mixBlendMode: "screen",
            }}
          />
        )}
        {obj.category === "quantum" && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-[20%] rounded-full"
            style={{
              border: `1px solid ${style.ring}`,
              opacity: 0.3,
              animation: "orbit 16s linear infinite",
            }}
          />
        )}
      </div>

      <motion.div
        className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-center"
        style={{ opacity: labelOpacity }}
      >
        <div className="font-display text-base tracking-wide text-white/90">
          {obj.name}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {obj.sizeLabel}
        </div>
      </motion.div>
    </motion.button>
  );
}

function makeBodyGradient(category: TScaleObject["category"], tint: string) {
  switch (category) {
    case "stellar":
      return `radial-gradient(circle at 50% 50%, #fff8d6 0%, ${tint} 35%, rgba(255,160,90,0.6) 75%, rgba(120,40,20,0) 100%)`;
    case "planetary":
      return `radial-gradient(circle at 38% 32%, rgba(255,255,255,0.4) 0%, ${tint} 35%, rgba(80,40,80,0.7) 80%, rgba(20,10,30,0.95) 100%)`;
    case "galactic":
      return `radial-gradient(circle, rgba(255,255,255,0.55) 0%, ${tint} 18%, rgba(80,60,140,0.5) 60%, rgba(10,8,30,0.95) 95%)`;
    case "cosmic":
      return `radial-gradient(circle, rgba(255,255,255,0.25) 0%, ${tint}80 25%, rgba(40,30,80,0.6) 70%, rgba(8,8,20,0.95) 100%)`;
    case "quantum":
      return `radial-gradient(circle, #ffffff 0%, ${tint} 25%, rgba(120,80,200,0.5) 70%, rgba(20,10,40,0.9) 100%)`;
    case "molecular":
      return `radial-gradient(circle at 40% 35%, rgba(255,255,255,0.45) 0%, ${tint} 30%, rgba(40,90,140,0.6) 80%, rgba(10,20,40,0.95) 100%)`;
    case "life":
      return `radial-gradient(circle at 40% 40%, rgba(255,255,255,0.35) 0%, ${tint} 35%, rgba(40,120,90,0.55) 80%, rgba(10,30,30,0.9) 100%)`;
    case "human":
      return `radial-gradient(circle at 40% 35%, rgba(255,255,255,0.4) 0%, ${tint} 35%, rgba(140,90,40,0.55) 80%, rgba(40,30,20,0.95) 100%)`;
    default:
      return `radial-gradient(circle, ${tint} 0%, rgba(20,20,40,0.9) 100%)`;
  }
}

function makeGlow(glow: string, selected: boolean) {
  const base = `0 0 60px ${glow}, 0 0 140px ${glow}, inset 0 0 40px rgba(255,255,255,0.06)`;
  return selected ? `${base}, 0 0 200px ${glow}` : base;
}
