"use client";

import { animate, AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { siteCopy } from "@/lib/copy";
import {
  scaleObjects,
  minLog,
  maxLog,
  thresholdLabels,
} from "@/lib/scale-data";
import { log10 } from "@/lib/scale-helpers";
import { useZoom } from "@/lib/useZoom";

import { ScaleObject } from "./ScaleObject";
import { Starfield } from "./Starfield";
import { ScaleRuler } from "./ScaleRuler";
import { InfoPanel } from "./InfoPanel";
import { TopBar } from "./TopBar";
import { ZoomSlider } from "./ZoomSlider";
import { ThresholdTag } from "./ThresholdTag";
import { PowersOverlay } from "./PowersOverlay";
import { IntroOverlay } from "./IntroOverlay";
import { AmbientPalette } from "./AmbientPalette";

const HUMAN_LOG = log10(1.7);

// Cross-threshold detector: returns the threshold the zoom most recently crossed,
// used to pulse the ambient palette as you traverse a boundary.
function nearestCrossedThreshold(zoom: number): number | null {
  for (const t of thresholdLabels) {
    if (Math.abs(t.atLog - zoom) < 0.6) return t.atLog;
  }
  return null;
}

const initialStageMin = (): number => {
  if (typeof window === "undefined") return 720;
  return Math.min(window.innerWidth, window.innerHeight);
};

export function ScaleExplorer() {
  const [intro, setIntro] = useState(true);
  const [showInsight, setShowInsight] = useState(true);
  const [showPowers, setShowPowers] = useState(true);
  const [guided, setGuided] = useState(false);
  const [guidedClosing, setGuidedClosing] = useState(false);
  const [stageMin, setStageMin] = useState(initialStageMin);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const breathDoneRef = useRef(false);

  const {
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
  } = useZoom(HUMAN_LOG);

  // Track stage size with a real ResizeObserver
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

  // Curtain-up breath: when the page mounts, the universe inhales gently
  // outward, then back to human scale. The intro overlay sits over a
  // softly blurred-but-living background while this happens.
  useEffect(() => {
    if (breathDoneRef.current || reducedMotion) return;
    breathDoneRef.current = true;
    const controls = animate(target, [HUMAN_LOG, HUMAN_LOG - 1.4, HUMAN_LOG + 0.9, HUMAN_LOG], {
      duration: 5.2,
      times: [0, 0.35, 0.7, 1],
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [reducedMotion, target]);

  // ---- Input: scroll wheel ----
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (intro) setIntro(false);
      const sign = e.deltaY > 0 ? 1 : -1;
      const magnitude = Math.min(Math.abs(e.deltaY), 80);
      const delta = sign * magnitude * 0.012;
      e.preventDefault();
      nudge(delta);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [intro, nudge]);

  // ---- Input: drag (vertical) ----
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let dragging = false;
    let lastY = 0;
    let activePointerId: number | null = null;

    const onDown = (e: PointerEvent) => {
      const node = e.target as HTMLElement;
      if (node.closest("button")) return;
      dragging = true;
      lastY = e.clientY;
      activePointerId = e.pointerId;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
      noteInput();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== activePointerId) return;
      if (intro) setIntro(false);
      const dy = e.clientY - lastY;
      lastY = e.clientY;
      nudge(-dy * 0.012);
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
  }, [intro, nudge, noteInput]);

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
        jumpTo(HUMAN_LOG);
        return;
      }
      if (delta !== 0) {
        e.preventDefault();
        if (intro) setIntro(false);
        nudge(delta);
      }
      if (e.key === "Escape" && intro) setIntro(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [intro, nudge, jumpTo]);

  // ---- Guided mode autoplay ----
  useEffect(() => {
    if (!guided) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const next = target.get() + dt * 0.00085;
      if (next > maxLog) {
        target.set(maxLog);
        setGuided(false);
        setGuidedClosing(true);
        // After dwelling at the edge, breathe back to human scale.
        const t = setTimeout(() => {
          jumpTo(HUMAN_LOG);
          setTimeout(() => setGuidedClosing(false), 2000);
        }, 5500);
        return () => clearTimeout(t);
      }
      target.set(next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [guided, target, jumpTo]);

  const onJumpTo = useCallback(
    (val: number) => {
      jumpTo(val);
      if (intro) setIntro(false);
    },
    [intro, jumpTo]
  );

  const visibleObjects = useMemo(() => {
    return scaleObjects.filter((o) => Math.abs(log10(o.size) - latestZoom) < 1.5);
  }, [latestZoom]);

  // Edge-of-universe reveal: when zoom is within 0.35 log units of the maximum,
  // a quiet horizon line and the closing line fade in.
  const nearEdge = latestZoom > maxLog - 0.35;
  const crossingThreshold = nearestCrossedThreshold(latestZoom);

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden">
      <Starfield count={260} zoom={zoom} />
      <AmbientPalette category={currentObj.category} proximity={proximity} />

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
            reducedMotion={reducedMotion}
            onSelect={() => onJumpTo(log10(obj.size))}
          />
        ))}
      </div>

      {/* Top bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-5 pt-5 sm:px-8 sm:pt-6">
        <TopBar
          showInsight={showInsight}
          onToggleInsight={() => setShowInsight((v) => !v)}
          showPowers={showPowers}
          onTogglePowers={() => setShowPowers((v) => !v)}
          guided={guided}
          onToggleGuided={() => setGuided((v) => !v)}
        />
      </header>

      {/* Powers of ten + threshold tag, top-center */}
      <div className="pointer-events-none absolute left-1/2 top-20 z-30 -translate-x-1/2 sm:top-24">
        <PowersOverlay zoom={zoom} visible={showPowers} />
      </div>

      {/* Threshold tag — rises from below at the bottom-center horizon */}
      <div className="pointer-events-none absolute inset-x-0 bottom-44 z-30 flex justify-center sm:bottom-48">
        <ThresholdTag zoom={latestZoom} />
      </div>

      {/* Right-side ruler */}
      <div className="pointer-events-none absolute right-5 top-1/2 z-30 -translate-y-1/2 sm:right-8">
        <div className="h-[60vh] max-h-[560px] min-h-[360px]">
          <ScaleRuler zoom={zoom} onJumpTo={onJumpTo} />
        </div>
      </div>

      {/* Left bottom info panel */}
      <div className="pointer-events-none absolute bottom-24 left-5 z-30 sm:bottom-28 sm:left-8">
        <InfoPanel obj={currentObj} showInsight={showInsight} proximity={proximity} />
      </div>

      {/* Bottom controls */}
      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-5 sm:px-8 sm:pb-6">
        <div className="mx-auto max-w-3xl">
          <ZoomSlider
            zoom={zoom}
            onChange={(v) => setTo(v)}
            onZoomIn={() => nudge(-0.6)}
            onZoomOut={() => nudge(0.6)}
          />
          <div className="mt-2 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em] text-white/35">
            <span className="font-mono">smaller</span>
            <button
              type="button"
              onClick={() => onJumpTo(HUMAN_LOG)}
              className="rounded-full px-2 py-0.5 text-white/45 transition hover:text-white/80"
            >
              ⟵ {siteCopy.ui.backToCenter}
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

      {/* Edge-of-universe reveal */}
      <AnimatePresence>
        {nearEdge && (
          <motion.div
            key="edge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-0 z-25 grid place-items-center"
          >
            <div
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, transparent 55%, rgba(140,200,255,0.18) 70%, transparent 85%)",
                mixBlendMode: "screen",
              }}
            />
            <div className="max-w-md px-6 text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
                {currentObj.name === "Observable universe" ? "the visible edge" : ""}
              </div>
              <p className="mt-3 font-display text-xl italic leading-relaxed text-white/85 text-balance">
                {siteCopy.edgeOfUniverse}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guided mode closing line */}
      <AnimatePresence>
        {guidedClosing && (
          <motion.div
            key="guided-closing"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="pointer-events-none absolute inset-0 z-40 grid place-items-center px-6"
          >
            <p className="max-w-xl text-center font-display text-2xl italic leading-relaxed text-white/90 text-balance">
              {siteCopy.guidedClosing}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Threshold-crossing pulse: a brief, soft tint flash */}
      <AnimatePresence>
        {crossingThreshold !== null && (
          <motion.div
            key={`thr-${crossingThreshold}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-15"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,255,255,0.06), transparent 70%)",
              mixBlendMode: "screen",
            }}
          />
        )}
      </AnimatePresence>

      {/* Tiny credit at very bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-1.5 z-30 text-center font-mono text-[9px] uppercase tracking-[0.32em] text-white/25">
        {siteCopy.credit}
      </div>

      <IntroOverlay show={intro} onDismiss={() => setIntro(false)} />
    </div>
  );
}
