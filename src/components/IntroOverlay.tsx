"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { siteCopy } from "@/lib/copy";

type Props = {
  show: boolean;
  onDismiss: () => void;
};

export function IntroOverlay({ show, onDismiss }: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (show) {
      // Autofocus the CTA so keyboard users can dismiss with Enter / Space.
      const t = window.setTimeout(() => buttonRef.current?.focus(), 600);
      return () => window.clearTimeout(t);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 grid place-items-center px-6"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(4,6,13,0.4) 0%, rgba(4,6,13,0.92) 70%)",
            backdropFilter: "blur(6px)",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="intro-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl text-center"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
              {siteCopy.microcopy.loading}
            </div>
            <h1 id="intro-title" className="mt-6 font-display text-5xl leading-[1.05] text-white text-balance sm:text-6xl">
              {siteCopy.title}
            </h1>
            <p className="mt-5 font-display text-lg italic text-white/70 text-balance sm:text-xl">
              {siteCopy.subtitle}
            </p>
            <div className="mx-auto mt-10 max-w-xl space-y-3 text-base leading-relaxed text-white/75 text-pretty sm:text-[17px]">
              {siteCopy.intro.map((line, i) => (
                <p key={i} className="font-display italic text-white/85">
                  {line}
                </p>
              ))}
              <p>{siteCopy.introBody}</p>
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <button
                ref={buttonRef}
                type="button"
                onClick={onDismiss}
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white/85 backdrop-blur transition hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:border-white/60 focus-visible:outline-none"
              >
                <span>{siteCopy.ui.begin}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                {siteCopy.cta} <span className="text-white/55">{siteCopy.ctaTail}</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
