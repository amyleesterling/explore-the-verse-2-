"use client";

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

export function Starfield({ count = 220, seed = 1 }: { count?: number; seed?: number }) {
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

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
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
    </div>
  );
}
