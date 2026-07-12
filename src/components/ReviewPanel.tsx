import { useBundle } from "../context/BundleContext";
import { buildReviewGroups, computeTotals, formatMoney } from "../lib/bundle";
import { ReviewLineItem } from "./ReviewLineItem";
import { TruckIcon } from "./icons/Icons";

export function ReviewPanel() {
  const { products, selections, saveForLater, justSaved } = useBundle();
  const groups = buildReviewGroups(products, selections);
  const totals = computeTotals(products, selections);

  return (
    <aside className="review-panel rounded-2xl bg-info-bg p-4 sm:p-6" aria-label="Your security system review">
      <p className="text-xs font-semibold uppercase tracking-wide text-secondary-text">Review</p>
      <h2 className="mt-1 text-2xl font-bold text-heading-text sm:text-[28px]">Your security system</h2>
      <p className="mt-1.5 text-sm text-secondary-text">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      <div className="mt-3 md:hidden">
        <div className="divide-y-2 divide-border-default border-t-2 border-border-default">
          {groups.map((group) => (
            <div key={group.category} className="py-1">
              <p className="pt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-text">{group.category}</p>
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
            <div className="flex w-14 shrink-0 flex-col items-end leading-tight">
              <span className="price-strike text-xs">$5.99</span>
              <span className="text-sm font-semibold text-primary">FREE</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-3">
          <img
            src="/src/assets/products/satisfaction-seal.png"
            alt="Wyze satisfaction guarantee"
            className="block h-14 w-14 shrink-0"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-col items-end gap-1">
              {totals.financingPerMonth > 0 && (
                <span className="w-max rounded bg-primary px-2 py-1 text-[10px] font-semibold leading-none text-white">
                  as low as {formatMoney(totals.financingPerMonth)}/mo
                </span>
              )}
              <div className="flex items-baseline gap-1">
                {totals.savings > 0 && <span className="price-strike text-[11px]">{formatMoney(totals.compareAtSubtotal)}</span>}
                <span className="text-[28px] font-extrabold leading-none text-primary">{formatMoney(totals.subtotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {totals.savings > 0 && (
          <p className="mt-2 w-full text-center text-[11px] font-semibold leading-snug text-success">
            Congrats! You're saving {formatMoney(totals.savings)} on your security bundle!
          </p>
        )}

        <button
          type="button"
          onClick={() => window.alert("This is a prototype - checkout isn't wired up to anything yet.")}
          className="mt-4 w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-link-default"
        >
          Checkout
        </button>

        <button
          type="button"
          onClick={saveForLater}
          className="mt-3 w-full text-center text-xs font-medium italic text-muted-text underline underline-offset-2"
        >
          {justSaved ? "Saved!" : "Save my system for later"}
        </button>
      </div>

      <div className="hidden md:block xl:hidden">
        <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(290px,0.92fr)] gap-5">
          <div className="divide-y-2 divide-border-default border-t-2 border-border-default">
            {groups.map((group) => (
              <div key={group.category} className="py-1">
                <p className="pt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-text">{group.category}</p>
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
              <div className="flex w-14 shrink-0 flex-col items-end leading-tight">
                <span className="price-strike text-xs">$5.99</span>
                <span className="text-sm font-semibold text-primary">FREE</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <img
                src="/src/assets/products/satisfaction-seal.png"
                alt="Wyze satisfaction guarantee"
                className="block h-20 w-20 shrink-0"
              />

              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-bold tracking-tight text-heading-text">30-day hassle-free returns</h3>
                <p className="mt-1 text-xs leading-snug text-heading-text">
                  If you're not totally in love with the product, we will refund you 100%.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 pr-1">
              {totals.financingPerMonth > 0 && (
                <span className="w-max rounded bg-primary px-3 py-1 text-xs font-semibold text-white">
                  as low as {formatMoney(totals.financingPerMonth)}/mo
                </span>
              )}
              <div className="flex items-baseline gap-1.5">
                {totals.savings > 0 && <span className="price-strike text-sm">{formatMoney(totals.compareAtSubtotal)}</span>}
                <span className="text-2xl font-extrabold leading-none text-primary">{formatMoney(totals.subtotal)}</span>
              </div>
            </div>

            {totals.savings > 0 && (
              <p className="text-center text-xs font-semibold leading-snug text-success">
                Congrats! You're saving {formatMoney(totals.savings)} on your security bundle!
              </p>
            )}

            <button
              type="button"
              onClick={() => window.alert("This is a prototype - checkout isn't wired up to anything yet.")}
              className="w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-link-default"
            >
              Checkout
            </button>

            <button
              type="button"
              onClick={saveForLater}
              className="text-center text-xs font-medium italic text-muted-text underline underline-offset-2"
            >
              {justSaved ? "Saved!" : "Save my system for later"}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden xl:block xl:max-w-[520px] xl:ml-auto">
        <div className="divide-y-2 divide-border-default border-t-2 border-border-default">
          {groups.map((group) => (
            <div key={group.category} className="py-1">
              <p className="pt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-text">{group.category}</p>
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
            <div className="flex w-14 shrink-0 flex-col items-end leading-tight">
              <span className="price-strike text-xs">$5.99</span>
              <span className="text-sm font-semibold text-primary">FREE</span>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex items-start justify-between gap-5">
            <img
              src="/src/assets/products/satisfaction-seal.png"
              alt="Wyze satisfaction guarantee"
              className="block h-20 w-20 shrink-0"
            />

            <div className="flex min-w-0 flex-col items-end gap-1 pr-1 text-right">
              {totals.financingPerMonth > 0 && (
                <span className="w-max rounded bg-primary px-3 py-1 text-xs font-semibold text-white">
                  as low as {formatMoney(totals.financingPerMonth)}/mo
                </span>
              )}
              <div className="flex items-baseline gap-1.5">
                {totals.savings > 0 && <span className="price-strike text-sm">{formatMoney(totals.compareAtSubtotal)}</span>}
                <span className="text-2xl font-extrabold leading-none text-primary">{formatMoney(totals.subtotal)}</span>
              </div>
            </div>
          </div>

          {totals.savings > 0 && (
            <p className="text-center text-xs font-semibold leading-snug text-success">
              Congrats! You're saving {formatMoney(totals.savings)} on your security bundle!
            </p>
          )}

          <button
            type="button"
            onClick={() => window.alert("This is a prototype - checkout isn't wired up to anything yet.")}
            className="w-full rounded-xl bg-primary py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-link-default"
          >
            Checkout
          </button>

          <button
            type="button"
            onClick={saveForLater}
            className="mx-auto block w-fit text-center text-sm font-medium italic text-muted-text underline underline-offset-2"
          >
            {justSaved ? "Saved!" : "Save my system for later"}
          </button>
        </div>
      </div>
    </aside>
  );
}
