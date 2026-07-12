import { useBundle } from "../context/BundleContext";
import { buildReviewGroups, computeTotals, formatMoney } from "../lib/bundle";
import { ReviewLineItem } from "./ReviewLineItem";
import { TruckIcon } from "./icons/Icons";

export function ReviewPanel() {
  const { products, selections, saveForLater, justSaved } = useBundle();
  const groups = buildReviewGroups(products, selections);
  const totals = computeTotals(products, selections);

  return (
    <aside className="review-panel rounded-2xl bg-info-bg p-5 sm:p-6" aria-label="Your security system review">
      <p className="text-xs font-semibold uppercase tracking-wide text-secondary-text">Review</p>
      <h2 className="mt-1 text-2xl font-bold text-heading-text">Your security system</h2>
      <p className="mt-1.5 text-sm text-secondary-text">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-1">
        {/* Line items */}
        <div className="divide-y-2 divide-border-default border-t-2 border-border-default">
          {groups.map((group) => (
            <div key={group.category} className="py-1">
              <p className="pt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-text">
                {group.category}
              </p>
              <div className="divide-y divide-border-light/60">
                {group.lines.map((line) => (
                  <ReviewLineItem key={`${line.productId}-${line.variantId}`} line={line} />
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-success">
              <TruckIcon className="h-6 w-6" />
            </span>
            <span className="flex-1 text-sm font-medium text-heading-text">Fast Shipping</span>
            <div className="flex w-24 shrink-0 flex-col items-end leading-tight">
              <span className="price-strike text-xs">$5.99</span>
              <span className="text-sm font-semibold text-primary">FREE</span>
            </div>
          </div>
        </div>

        {/* Guarantee + totals */}
        <div className="mt-2 flex flex-col gap-4 md:mt-3 lg:mt-4">
          <div className="flex items-center justify-between gap-4">
            <img
      src="/src/assets/products/satisfaction-seal.png"
      alt="Wyze satisfaction guarantee"
      className={`w-20 h-20 block`}
    />
            <div className="flex flex-col gap-1">
              {totals.financingPerMonth > 0 && (
                <span className="self-end rounded bg-primary px-3 py-1 text-xs font-semibold text-white w-max">
                  as low as {formatMoney(totals.financingPerMonth)}/mo
                </span>
              )}
              <div className="flex items-baseline gap-1.5">
                {totals.savings > 0 && <span className="price-strike">{formatMoney(totals.compareAtSubtotal)}</span>}
                <span className="text-2xl font-extrabold text-primary">{formatMoney(totals.subtotal)}</span>
              </div>
              
            </div>
          </div>
          {totals.savings > 0 && (
                <p className="text-xs font-semibold text-success text-center">
                  Congrats! You're saving {formatMoney(totals.savings)} on your security bundle!
                </p>
              )}

          <button
            type="button"
            onClick={() => window.alert("This is a prototype — checkout isn't wired up to anything yet.")}
            className="w-full rounded-xl bg-primary py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-link-default"
          >
            Checkout
          </button>

          <button
            type="button"
            onClick={saveForLater}
            className="text-center text-sm italic font-medium text-muted-text underline underline-offset-2"
          >
            {justSaved ? "Saved! ✓" : "Save my system for later"}
          </button>
        </div>
      </div>
    </aside>
  );
}
