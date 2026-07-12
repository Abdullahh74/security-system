# Security Bundle Builder

A two-column, data-driven bundle builder (4-step accordion + live review
panel) built with **React + TypeScript + Vite**, **Tailwind CSS v4**, and
**TanStack React Query**.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

Requires Node 18+.

## Product images

Product photos are **not included** — the app already references the
correct paths (`src/data/products.json` → `src/assets/products/...`) and
falls back to a neutral placeholder tile for any image that isn't there yet,
so it runs fine as-is. Drop matching files into `src/assets/products/` (see
the README in that folder for the exact list of filenames) and they'll show
up automatically.

## How it's built

- **Data-driven**: everything renders from `src/data/products.json`
  (`fetchProducts` in `src/api/fetchProducts.ts` simulates a network call
  and is wired through `useQuery`). Swap that function for a real `fetch()`
  to point at an actual backend — nothing else needs to change.
- **State**: a single reducer (`src/context/BundleContext.tsx`) owns
  quantities per product *and per variant*, the active variant shown on each
  card, and which accordion step is open. Pure helpers in `src/lib/bundle.ts`
  derive everything else (per-step selected counts, review-panel groups,
  totals/savings) from that one source of truth, so the cards and the review
  panel can never drift out of sync.
- **Variants**: quantities are tracked as `{ productId: { variantId: qty } }`.
  Selecting a color only changes which variant is "active" on the card — it
  never touches quantities. The review panel lists every variant with
  qty > 0 as its own line, per the spec.
- **Persistence**: "Save my system for later" writes the current
  `selections`/`activeVariant` state to `localStorage`. On load, the app
  checks for a saved system first and restores it; otherwise it seeds the
  state that matches the Figma (2× Wyze Cam v4/Pan v3, pre-populated
  sensors/accessory/plan, etc.) from the `defaultQuantity` fields in the
  JSON.
- **Styling**: Tailwind v4, configured entirely from `src/index.css` via
  `@theme` (colors, radii, font) — there is intentionally **no
  `tailwind.config.js`** in this project.

## Decisions & tradeoffs

- **Per-unit pricing**: the Figma shows a couple of numbers that don't
  reconcile between the card and the review panel for the same quantity
  (e.g. Wyze Cam Pan v3's card price vs. its review-panel line for the same
  qty of 2). Since the app computes every price live from `unitPrice × qty`
  in one place, I picked one consistent set of per-unit prices that make the
  **review panel** total, compare-at total, and savings match the design
  exactly ($187.89 total / $238.81 struck-through / $50.92 saved) — the
  card for Wyze Cam Pan v3 therefore shows its true per-unit price rather
  than the specific digits in the screenshot.
- **Financing line** ("as low as $X/mo") is a simplified illustrative
  calculation (`subtotal / 9.79`), not a real financing/APR integration.
- **Responsive layout**: desktop matches the Figma (builder + sticky review
  sidebar). Below `lg` the review panel drops beneath the builder and
  reflows into two internal columns (line items / guarantee & total) on
  tablet, collapsing to one column on phone. Product cards go
  1 → 2 → 3 columns as the viewport widens rather than the exact 5-column
  arrangement shown in one of the wider reference screenshots.
- **Satisfaction seal**: simplified to a plain dashed circular badge instead
  of the scalloped seal shape in the design.
- The **Checkout** button shows a placeholder confirmation, as called out in
  the brief as acceptable.
- **Not implemented / possible next steps**: a real backend for the JSON
  (called out as a bonus in the brief), unit tests, and keyboard-arrow
  navigation within the variant chip radiogroup (chips are focusable and
  operable, just no arrow-key roving tabindex yet).
