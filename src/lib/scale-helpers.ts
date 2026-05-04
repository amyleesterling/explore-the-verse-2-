import { scaleObjects, type ScaleObject } from "./scale-data";

export const clamp = (v: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, v));

export const log10 = (v: number): number => Math.log(v) / Math.LN10;

export const formatPowerOfTen = (logValue: number): string => {
  const rounded = Math.round(logValue);
  const sign = rounded < 0 ? "⁻" : "";
  const digits = Math.abs(rounded).toString();
  const supers: Record<string, string> = {
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
    "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  };
  return `10${sign}${digits.split("").map((d) => supers[d] ?? d).join("")} m`;
};

export const formatMeters = (m: number): string => {
  if (m < 1e-12) return `${(m * 1e15).toFixed(2)} fm`;
  if (m < 1e-9) return `${(m * 1e12).toFixed(2)} pm`;
  if (m < 1e-6) return `${(m * 1e9).toFixed(2)} nm`;
  if (m < 1e-3) return `${(m * 1e6).toFixed(2)} µm`;
  if (m < 1) return `${(m * 1e3).toFixed(2)} mm`;
  if (m < 1e3) return `${m.toFixed(2)} m`;
  if (m < 1e9) return `${(m / 1e3).toLocaleString(undefined, { maximumFractionDigits: 1 })} km`;
  if (m < 9.46e15) return `${(m / 1.496e11).toLocaleString(undefined, { maximumFractionDigits: 1 })} AU`;
  return `${(m / 9.461e15).toLocaleString(undefined, { maximumFractionDigits: 1 })} ly`;
};

export const findClosestObject = (zoomLog: number): ScaleObject => {
  let best = scaleObjects[0];
  let bestDist = Infinity;
  for (const obj of scaleObjects) {
    const d = Math.abs(log10(obj.size) - zoomLog);
    if (d < bestDist) {
      bestDist = d;
      best = obj;
    }
  }
  return best;
};

export const findIndexOfId = (id: string): number =>
  scaleObjects.findIndex((o) => o.id === id);
