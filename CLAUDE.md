# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js 14 app router site that renders **Scale of the Universe** — one continuous, spring-smoothed logarithmic zoom across 42 orders of magnitude (proton → observable universe). Single page, fully client-side, configured for static export so it can be deployed to GitHub Pages with no server.

## Commands

```bash
npm install            # install deps (uses package-lock.json, prefer `npm ci` in CI)
npm run dev            # local dev at http://localhost:3000 (no basePath)
npm run build          # static export → out/ (basePath = "" without env)
npm run typecheck      # tsc --noEmit
npm run lint           # next lint

GITHUB_PAGES=true npm run build   # build with /explore-the-verse-2-/ basePath for Pages
```

There are no tests yet. Use `npm run typecheck` + `npm run build` as the verification path before pushing — the build step also re-runs the type checker.

## Big-picture architecture

The whole interaction collapses to **one Framer Motion `MotionValue<number>` representing log10(meters_in_view)**. Every input — wheel, pointer drag, slider, ± buttons, ruler chips, arrow / Page / Home keys, focal-object clicks, guided autoplay — converges by writing into the same `target` MotionValue, which is then smoothed by `useSpring` into the `zoom` value used everywhere else for rendering.

`ScaleExplorer.tsx` (`src/components/`) is the single composer that owns this state and wires every input handler. Children consume `zoom` reactively via `useTransform` / `useMotionValueEvent` so 60fps animation does **not** trigger React re-renders. The exception is `currentObj` (focal object derived via `findClosestObject`) and the latest zoom snapshot — those drive the info panel, threshold tag, and visibility filter and re-render at human speed.

Each `ScaleObject` computes its own on-screen diameter as `REFERENCE_FRACTION * stageMin * 10^(log10(obj.size) - zoom)` and its opacity from a quadratic falloff over `FADE_SPREAD = 1.4` log units. So when `zoom` matches an object's log size, that object occupies ~46% of the viewport's smaller dimension; objects ±1.5 log units away are filtered out entirely from the render tree by `ScaleExplorer`'s `visibleObjects` memo.

## Adding a scale stop

Edit `src/lib/scale-data.ts` only. Append to `scaleObjects` (keep the array sorted by `size` ascending — `minLog` / `maxLog` and the ruler depend on order) with:
- `size` in meters (the canonical value)
- `category` set to one of the 8 palette keys in `categoryStyles` (or add a new entry there)
- `description` and `whyItMatters` in the project's voice (see below)

If the stop adds a meaningful threshold (chemistry, life, planetary, etc.), add to `thresholdLabels` with the log10-meter value at which the tag should fade in (`PROXIMITY = 0.45` log units in `ThresholdTag.tsx`).

To surface a stop in the right-rail jump nav, add it to `jumpStops`.

## Voice / copy

Copy lives in `src/lib/copy.ts` (site chrome) and `src/lib/scale-data.ts` (per-stop). The intentional voice is **"sparkly yet soft"**: playful, vivid, scientifically grounded, never snarky and never textbook. Each stop carries a `description` (one sentence with personality) and a `whyItMatters` (one short insight about what's emergent at that scale). Match this voice when adding or editing copy.

## Deployment

`.github/workflows/deploy.yml` builds with `GITHUB_PAGES=true`, drops a `.nojekyll`, and deploys `out/` via `actions/deploy-pages` on every push to `main`. Site URL: `https://amyleesterling.github.io/explore-the-verse-2-/`.

Pages must be enabled once in repo Settings → Pages → Source: GitHub Actions.

## Constraints

- **Static export only.** Do not add API routes, route handlers, middleware, or dynamic route segments — they will break the Pages deploy. `next.config.mjs` sets `output: "export"`.
- **No `next/image` optimization.** `images: { unoptimized: true }` is required for static export.
- **basePath is env-gated.** Local dev serves at `/`; CI builds emit assets under `/explore-the-verse-2-/`. If you add internal links, use root-relative paths and let Next prepend the basePath, or import `next/link` rather than hardcoding URLs.
- **Branch policy.** Develop on `claude/scale-of-universe-pjW6H` and PR into `main`.
