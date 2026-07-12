import type { ReviewLine } from "../lib/bundle";
import { formatMoney } from "../lib/bundle";
import { ProductImage } from "./ProductImage";
import { QuantityStepper } from "./QuantityStepper";
import { useBundle } from "../context/BundleContext";

export function ReviewLineItem({ line }: { line: ReviewLine }) {
  const { setQuantity } = useBundle();
  const lineTotal = line.unitPrice * line.quantity;
  const compareLineTotal = line.compareAtUnitPrice != null ? line.compareAtUnitPrice * line.quantity : null;
  const isCamUnlimited = line.productId === "cam-unlimited";

  return (
    <div className="flex items-center gap-3 py-1">
      <ProductImage
        src={line.image}
        alt={line.title}
        className={`h-10 w-10 shrink-0 rounded-md ${
          isCamUnlimited ? "border-transparent bg-info-bg" : "border border-border-light bg-white"
        }`}
      />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-heading-text">
          {line.title === "Cam Unlimited" ? (
            <>
              <span className="font-semibold">Cam</span>{" "}
              <span className="text-primary font-semibold">Unlimited</span>
            </>
          ) : (
            line.title
          )}
          {line.variantLabel ? ` — ${line.variantLabel}` : ""}
        </p>
      </div>

      {line.hasStepper !== false ? (
        <QuantityStepper
          quantity={line.quantity}
          onChange={(q) => setQuantity(line.productId, line.variantId, q)}
          disabled={line.required}
          min={line.required ? 1 : 0}
          size="sm"
          ariaLabel={`${line.title} quantity`}
        />
      ) : (
        <span className="w-[76px] shrink-0" />
      )}

      <div className="flex w-12 shrink-0 flex-col items-end leading-tight">
        {compareLineTotal != null && (
          <span className="price-strike text-xs">
            {formatMoney(compareLineTotal)}
            {line.unitSuffix ?? ""}
          </span>
        )}
        <span className={`review-line-price text-sm font-semibold ${lineTotal === 0 ? "text-primary" : compareLineTotal != null ? "text-primary" : "text-heading-text"}`}>
          {lineTotal === 0 ? "FREE" : `${formatMoney(lineTotal)}${line.unitSuffix ?? ""}`}
        </span>
      </div>
    </div>
  );
}
