"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  scaleObjects,
  minLog,
  maxLog,
  type ScaleObject as TScaleObject,
} from "@/lib/scale-data";
import { clamp, findClosestObject, log10 } from "@/lib/scale-helpers";

import { ScaleObject } from "./ScaleObject";
import { Starfield } from "./Starfield";
import { ScaleRuler } from "./ScaleRuler";
import { InfoPanel } from "./InfoPanel";
import { TopBar } from "./TopBar";
import { ZoomSlider } from "./ZoomSlider";
import { ThresholdTag } from "./ThresholdTag";
import { PowersOverlay } from "./PowersOverlay";
import { IntroOverlay } from "./IntroOverlay";

const HUMAN_LOG = log10(1.7);
const SPRING = { stiffness: 80, damping: 22, mass: 0.9 };

export function ScaleExplorer() {
  const [intro, setIntro] = useState(true);
  const [showInsight, setShowInsight] = useState(true);
  const [guided, setGuided] = useState(false);
  const [stageMin, setStageMin] = useState(720);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const target = useMotionValue(HUMAN_LOG);
  const zoom = useSpring(target, SPRING);

  const [currentObj, setCurrentObj] = useState<TScaleObject>(() =>
    findClosestObject(HUMAN_LOG)
  );
  const [latestZoom, setLatestZoom] = useState(HUMAN_LOG);

  // Track stage size
  useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setStageMin(Math.min(r.width, r.height));
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    setStageMin(Math.min(r.width, r.height));
    return () => ro.disconnect();
  }, []);

  // Derive the "current focal object" from the spring zoom
  useMotionValueEvent(zoom, "change", (latest) => {
    setLatestZoom(latest);
    const obj = findClosestObject(latest);
    setCurrentObj((prev) => (prev.id === obj.id ? prev : obj));
  });

  // ---- Input: scroll wheel ----
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // dismiss intro on first interaction
      if (intro) setIntro(false);
      // Each "notch" of wheel ~ small log change. Trackpads send many small events.
      // Use a normalized factor and clamp.
      const sign = e.deltaY > 0 ? 1 : -1;
      const magnitude = Math.min(Math.abs(e.deltaY), 80);
      const delta = sign * magnitude * 0.012;
      e.preventDefault();
      const next = clamp(target.get() + delta, minLog, maxLog);
      target.set(next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [intro, target]);

  // ---- Input: drag (vertical) ----
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let dragging = false;
    let lastY = 0;
    let activePointerId: number | null = null;

    const onDown = (e: PointerEvent) => {
      // Don't start drag on real buttons inside (the object buttons)
      const target = e.target as HTMLElement;
      if (target.closest("button")) return;
      dragging = true;
      lastY = e.clientY;
      activePointerId = e.pointerId;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== activePointerId) return;
      if (intro) setIntro(false);
      const dy = e.clientY - lastY;
      lastY = e.clientY;
      const delta = -dy * 0.012;
      target.set(clamp(target.get() + delta, minLog, maxLog));
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== activePointerId) return;
      dragging = false;
      activePointerId = null;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
      el.style.cursor = "";
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [intro, target]);

  // ---- Input: keyboard ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      let delta = 0;
      if (e.key === "ArrowUp" || e.key === "+" || e.key === "=") delta = -0.4;
      if (e.key === "ArrowDown" || e.key === "-") delta = 0.4;
      if (e.key === "PageUp") delta = -1.5;
      if (e.key === "PageDown") delta = 1.5;
      if (e.key === "Home") {
        e.preventDefault();
        if (intro) setIntro(false);
        target.set(HUMAN_LOG);
        return;
      }
      if (delta !== 0) {
        e.preventDefault();
        if (intro) setIntro(false);
        target.set(clamp(target.get() + delta, minLog, maxLog));
      }
      if (e.key === "Escape" && intro) setIntro(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [intro, target]);

  // ---- Guided mode autoplay ----
  useEffect(() => {
    if (!guided) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const next = target.get() + dt * 0.0009; // ~ +0.9 log/sec
      if (next > maxLog) {
        setGuided(false);
        return;
      }
      target.set(next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [guided, target]);

  const onJumpTo = useCallback(
    (val: number) => {
      target.set(clamp(val, minLog, maxLog));
      if (intro) setIntro(false);
    },
    [intro, target]
  );

  const visibleObjects = useMemo(() => {
    return scaleObjects.filter((o) => Math.abs(log10(o.size) - latestZoom) < 1.5);
  }, [latestZoom]);

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden">
      <Starfield count={260} />

      {/* Stage: center, full bleed */}
      <div
        ref={stageRef}
        className="no-touch-action absolute inset-0 z-10 cursor-grab"
        style={{ touchAction: "none" }}
      >
        {visibleObjects.map((obj) => (
          <ScaleObject
            key={obj.id}
            obj={obj}
            zoom={zoom}
            stageMin={stageMin}
            isSelected={currentObj.id === obj.id}
            onSelect={() => onJumpTo(log10(obj.size))}
          />
        ))}
      </div>

      {/* Top bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-5 pt-5 sm:px-8 sm:pt-6">
        <TopBar
          showInsight={showInsight}
          onToggleInsight={() => setShowInsight((v) => !v)}
          guided={guided}
          onToggleGuided={() => setGuided((v) => !v)}
        />
      </header>

      {/* Powers of ten + threshold tag, top-center */}
      <div className="pointer-events-none absolute left-1/2 top-20 z-30 -translate-x-1/2 sm:top-24">
        <PowersOverlay zoom={zoom} />
        <div className="mt-3">
          <ThresholdTag zoom={latestZoom} />
        </div>
      </div>

      {/* Right-side ruler */}
      <div className="pointer-events-none absolute right-5 top-1/2 z-30 -translate-y-1/2 sm:right-8">
        <div className="h-[60vh] max-h-[560px] min-h-[360px]">
          <ScaleRuler zoom={zoom} onJumpTo={onJumpTo} />
        </div>
      </div>

      {/* Left bottom info panel */}
      <div className="pointer-events-none absolute bottom-24 left-5 z-30 sm:bottom-28 sm:left-8">
        <InfoPanel obj={currentObj} showInsight={showInsight} />
      </div>

      {/* Bottom controls */}
      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-5 sm:px-8 sm:pb-6">
        <div className="mx-auto max-w-3xl">
          <ZoomSlider
            zoom={zoom}
            onChange={(v) => target.set(v)}
            onZoomIn={() => target.set(clamp(target.get() - 0.6, minLog, maxLog))}
            onZoomOut={() => target.set(clamp(target.get() + 0.6, minLog, maxLog))}
          />
          <div className="mt-2 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em] text-white/35">
            <span className="font-mono">smaller</span>
            <button
              type="button"
              onClick={() => onJumpTo(HUMAN_LOG)}
              className="rounded-full px-2 py-0.5 text-white/45 transition hover:text-white/80"
            >
              ⟵ back to center
            </button>
            <span className="font-mono">larger</span>
          </div>
        </div>
      </footer>

      {/* Soft vignette for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(4,6,13,0.55) 100%)",
        }}
      />

      <IntroOverlay show={intro} onDismiss={() => setIntro(false)} />
    </div>
  );
}
