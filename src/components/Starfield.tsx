"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { useMemo } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  o: number;
  hue: number;
};

const seeded = (i: number) => {
  // Deterministic pseudo-random so SSR / hydration don't disagree.
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

type Props = {
  count?: number;
  seed?: number;
  zoom: MotionValue<number>;
};

// As zoom approaches the cosmic end of the scale, the starfield brightens
// and the nebula veils intensify. As zoom plunges into the quantum, the
// stars fade out, since "stars" make no sense at that scale.
export function Starfield({ count = 220, seed = 1, zoom }: Props) {
  const stars: Star[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const k = i + seed * 1000;
      return {
        x: seeded(k * 2) * 100,
        y: seeded(k * 2 + 1) * 100,
        r: seeded(k * 3) * 1.4 + 0.2,
        o: seeded(k * 4) * 0.7 + 0.15,
        hue: seeded(k * 5) * 60 - 30,
      };
    });
  }, [count, seed]);

  // Map current zoom (log meters) → an opacity multiplier in [0.15, 1.4].
  // Below ~10⁻⁵ m, stars feel out of place; above ~10²⁰ m they should sing.
  const starOpacity = useTransform(zoom, (z: number) => {
    if (z < -5) return 0.18 + Math.max(0, (z + 12) / 14) * 0.6;
    if (z < 10) return 0.78;
    return Math.min(1.4, 0.78 + (z - 10) / 18);
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0, opacity: starOpacity }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r * 0.08}
            fill={`hsl(${210 + s.hue} 80% 90%)`}
            opacity={s.o}
          >
            {i % 17 === 0 && (
              <animate
                attributeName="opacity"
                values={`${s.o};${Math.max(0.05, s.o - 0.4)};${s.o}`}
                dur={`${4 + (i % 7)}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </svg>
      {/* Soft nebula veils */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 18% 22%, rgba(124,224,255,0.10), transparent 60%)," +
            "radial-gradient(ellipse 50% 35% at 85% 75%, rgba(182,155,255,0.10), transparent 65%)," +
            "radial-gradient(ellipse 45% 30% at 60% 15%, rgba(255,217,156,0.06), transparent 65%)",
        }}
      />
    </motion.div>
  );
}
