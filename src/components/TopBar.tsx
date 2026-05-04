"use client";

import { siteCopy } from "@/lib/copy";

type Props = {
  showInsight: boolean;
  onToggleInsight: () => void;
  showPowers: boolean;
  onTogglePowers: () => void;
  guided: boolean;
  onToggleGuided: () => void;
};

export function TopBar({
  showInsight,
  onToggleInsight,
  showPowers,
  onTogglePowers,
  guided,
  onToggleGuided,
}: Props) {
  return (
    <div className="pointer-events-auto flex items-center justify-between">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-lg leading-none text-white/95">
          {siteCopy.title}
        </span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-white/40 sm:inline">
          a logarithmic stroll
        </span>
      </div>
      <div className="flex items-center gap-2">
        <PillButton active={showPowers} onClick={onTogglePowers}>
          {showPowers ? siteCopy.ui.powersOn : siteCopy.ui.powersOff}
        </PillButton>
        <PillButton active={showInsight} onClick={onToggleInsight}>
          {showInsight ? siteCopy.ui.whyOn : siteCopy.ui.whyOff}
        </PillButton>
        <PillButton active={guided} onClick={onToggleGuided}>
          {guided ? siteCopy.ui.exitGuidedMode : siteCopy.ui.guidedMode}
        </PillButton>
      </div>
    </div>
  );
}

function PillButton({
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
      className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] transition ${
        active
          ? "border-white/40 bg-white/10 text-white"
          : "border-white/10 bg-white/[0.02] text-white/55 hover:border-white/25 hover:text-white/85"
      }`}
    >
      {children}
    </button>
  );
}
