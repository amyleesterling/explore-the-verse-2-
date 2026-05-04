"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { categoryStyles, type ScaleObject } from "@/lib/scale-data";
import { siteCopy } from "@/lib/copy";

type Props = {
  obj: ScaleObject;
  showInsight: boolean;
  proximity: number;
};

type Tab = "object" | "scale";

// Intimacy = how close we are to a focal scale (0..1). Drives the panel's
// reveal — at low intimacy, you see the name and size only; closer in, the
// description fades in; closest, the "why this matters" line.
export function InfoPanel({ obj, showInsight, proximity }: Props) {
  const style = categoryStyles[obj.category];
  const [tab, setTab] = useState<Tab>("object");

  const intimacy = proximity; // already 0..1
  const showDescription = intimacy > 0.15;
  const showWhy = showInsight && intimacy > 0.45;

  return (
    <div className="pointer-events-auto w-full max-w-md">
      <div className="glass relative rounded-2xl p-6">
        <div
          aria-hidden
          className="absolute -inset-px rounded-2xl opacity-60"
          style={{
            background: `linear-gradient(135deg, ${style.tint}25, transparent 60%)`,
            filter: "blur(0.5px)",
          }}
        />
        <div className="relative">
          <div className="flex items-center justify-between gap-2">
            <span
              className="inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.22em]"
              style={{
                color: style.tint,
                background: `${style.tint}10`,
                border: `1px solid ${style.tint}30`,
              }}
            >
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: style.tint, boxShadow: `0 0 10px ${style.tint}` }}
              />
              {style.label}
            </span>
            <div className="flex gap-1">
              <TabPill active={tab === "object"} onClick={() => setTab("object")}>
                {siteCopy.ui.tabObject}
              </TabPill>
              <TabPill active={tab === "scale"} onClick={() => setTab("scale")}>
                {siteCopy.ui.tabScale}
              </TabPill>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {tab === "object" ? (
              <motion.div
                key={`object-${obj.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <h2 className="mt-3 font-display text-3xl leading-tight text-white text-balance">
                  {obj.name}
                </h2>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-white/45">
                  {siteCopy.ui.approxSize} · {obj.sizeLabel}
                </div>
                <AnimatePresence>
                  {showDescription && (
                    <motion.p
                      key="desc"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-4 text-sm leading-relaxed text-white/75 text-pretty"
                    >
                      {obj.description}
                    </motion.p>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {showWhy && (
                    <motion.div
                      key="why"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="rounded-lg border-l-2 pl-3 py-1"
                        style={{ borderColor: `${style.tint}80` }}
                      >
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                          {siteCopy.ui.whyItMatters}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-white/85 text-pretty">
                          {obj.whyItMatters}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key={`scale-${obj.category}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <h2 className="mt-3 font-display text-2xl leading-tight text-white text-balance">
                  {style.label}
                </h2>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                  {siteCopy.ui.tabScale}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/80 text-pretty">
                  {style.blurb}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TabPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] transition ${
        active
          ? "bg-white/15 text-white"
          : "text-white/40 hover:bg-white/[0.06] hover:text-white/70"
      }`}
    >
      {children}
    </button>
  );
}
