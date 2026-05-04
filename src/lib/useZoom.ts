"use client";

import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { maxLog, minLog, scaleObjects } from "./scale-data";
import {
  clamp,
  distanceToNearestFocal,
  findClosestObject,
  log10,
} from "./scale-helpers";

const ATTRACTOR_DELAY_MS = 700;
const ATTRACTOR_THRESHOLD = 0.35; // engage only when within this many log units of a focal scale
const COARSE_ZOOM_DELTA = 0.04; // quantum below which we don't re-render React
const PROXIMITY_REVEAL = 0.45; // log distance considered "near" a focal scale

export type Palette = {
  category: string;
  blendIn: string;
  blendOut: string;
  weight: number;
};

type ZoomBundle = {
  target: MotionValue<number>;
  zoom: MotionValue<number>;
  latestZoom: number;
  currentObj: ReturnType<typeof findClosestObject>;
  reducedMotion: boolean;
  proximity: number; // 0..1, 1 when sitting on a focal scale
  nudge: (delta: number) => void;
  setTo: (val: number, opts?: { animate?: boolean }) => void;
  jumpTo: (val: number) => void;
  noteInput: () => void;
};

const HUMAN_LOG = log10(1.7);

const SPRING_CONFIG = {
  stiffness: 90,
  damping: 24,
  mass: 0.9,
};

const REDUCED_MOTION_SPRING = {
  stiffness: 220,
  damping: 32,
  mass: 0.6,
};

export function useZoom(initial: number = HUMAN_LOG): ZoomBundle {
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect reduced motion once on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const target = useMotionValue(initial);
  const zoom = useSpring(target, reducedMotion ? REDUCED_MOTION_SPRING : SPRING_CONFIG);

  const [currentObj, setCurrentObj] = useState(() => findClosestObject(initial));
  const [latestZoom, setLatestZoom] = useState(initial);
  const [proximity, setProximity] = useState(0);
  const lastSentRef = useRef(initial);
  const lastInputAtRef = useRef<number>(0);
  const attractorAnimRef = useRef<ReturnType<typeof animate> | null>(null);

  // Coarse-grained latestZoom updates: only set React state when the change
  // is meaningful enough to matter for re-render.
  useMotionValueEvent(zoom, "change", (latest) => {
    const dist = distanceToNearestFocal(latest);
    const nextProx = Math.max(0, Math.min(1, 1 - dist / PROXIMITY_REVEAL));
    setProximity((prev) => (Math.abs(prev - nextProx) > 0.05 ? nextProx : prev));

    if (Math.abs(latest - lastSentRef.current) < COARSE_ZOOM_DELTA) return;
    lastSentRef.current = latest;
    setLatestZoom(latest);
    const obj = findClosestObject(latest);
    setCurrentObj((prev) => (prev.id === obj.id ? prev : obj));
  });

  // Idle attractor: when the user has been still for a moment and is near a
  // focal scale, gently snap target to that scale's log so the spring lands
  // cleanly. Skip when reduced motion is on (snap is sharper there anyway).
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const tick = () => {
      const since = performance.now() - lastInputAtRef.current;
      if (since > ATTRACTOR_DELAY_MS && !attractorAnimRef.current) {
        const t = target.get();
        const obj = findClosestObject(t);
        const objLog = log10(obj.size);
        const dist = Math.abs(objLog - t);
        if (dist > 0.005 && dist < ATTRACTOR_THRESHOLD) {
          attractorAnimRef.current = animate(target, objLog, {
            type: "spring",
            stiffness: 60,
            damping: 22,
            mass: 0.7,
            onComplete: () => {
              attractorAnimRef.current = null;
            },
          });
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, target]);

  const cancelAttractor = useCallback(() => {
    if (attractorAnimRef.current) {
      attractorAnimRef.current.stop();
      attractorAnimRef.current = null;
    }
  }, []);

  const noteInput = useCallback(() => {
    lastInputAtRef.current = performance.now();
    cancelAttractor();
  }, [cancelAttractor]);

  const nudge = useCallback(
    (delta: number) => {
      noteInput();
      const next = clamp(target.get() + delta, minLog, maxLog);
      target.set(next);
    },
    [noteInput, target]
  );

  const setTo = useCallback(
    (val: number, opts?: { animate?: boolean }) => {
      noteInput();
      const v = clamp(val, minLog, maxLog);
      if (opts?.animate) {
        attractorAnimRef.current = animate(target, v, {
          type: "spring",
          stiffness: 70,
          damping: 22,
          mass: 1,
          onComplete: () => {
            attractorAnimRef.current = null;
          },
        });
      } else {
        target.set(v);
      }
    },
    [noteInput, target]
  );

  const jumpTo = useCallback(
    (val: number) => {
      noteInput();
      const v = clamp(val, minLog, maxLog);
      // Distance-aware: long jumps get a looser, more anticipatory spring.
      const distance = Math.abs(target.get() - v);
      const isLongJump = distance > 4;
      attractorAnimRef.current = animate(target, v, {
        type: "spring",
        stiffness: isLongJump ? 50 : 90,
        damping: isLongJump ? 18 : 24,
        mass: isLongJump ? 1.1 : 0.9,
        onComplete: () => {
          attractorAnimRef.current = null;
        },
      });
    },
    [noteInput, target]
  );

  return {
    target,
    zoom,
    latestZoom,
    currentObj,
    reducedMotion,
    proximity,
    nudge,
    setTo,
    jumpTo,
    noteInput,
  };
}

// Re-export useful helpers
export { scaleObjects };
