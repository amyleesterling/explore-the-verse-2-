"use client";

import { motion, type MotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { minLog, maxLog } from "@/lib/scale-data";

type Props = {
  zoom: MotionValue<number>;
  onChange: (zoom: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

export function ZoomSlider({ zoom, onChange, onZoomIn, onZoomOut }: Props) {
  const [value, setValue] = useState(zoom.get());

  useEffect(() => {
    setValue(zoom.get());
  }, [zoom]);

  useMotionValueEvent(zoom, "change", (v) => setValue(v));

  return (
    <div className="pointer-events-auto flex w-full items-center gap-3 px-2">
      <CircleButton onClick={onZoomOut} ariaLabel="Zoom out">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M5 12h14" strokeLinecap="round" />
        </svg>
      </CircleButton>
      <div className="relative flex-1">
        <input
          type="range"
          className="scale-range"
          min={minLog}
          max={maxLog}
          step={0.01}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          aria-label="Zoom level"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-1 h-1 rounded-full bg-gradient-to-r from-glow-cyan/0 via-glow-cyan/40 to-glow-cyan/0"
          style={{
            left: `${(((value - minLog) / (maxLog - minLog)) * 100).toFixed(2)}%`,
            width: 80,
            transform: "translateX(-50%)",
            opacity: 0.6,
          }}
        />
      </div>
      <CircleButton onClick={onZoomIn} ariaLabel="Zoom in">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </CircleButton>
    </div>
  );
}

function CircleButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 backdrop-blur transition hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
    >
      {children}
    </button>
  );
}
