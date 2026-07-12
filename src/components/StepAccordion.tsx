import type { Product } from "../types";
import type { StepConfig } from "../lib/steps";
import { ChevronIcon } from "./icons/Icons";
import { ProductCard } from "./ProductCard";
import { useBundle } from "../context/BundleContext";
import { stepSelectedCount } from "../lib/bundle";
import { nextStepId } from "../lib/steps";

interface Props {
  step: StepConfig;
  products: Product[];
}

export function StepAccordion({ step, products }: Props) {
  const { openStep, toggleStep, selections, products: allProducts } = useBundle();
  const isOpen = openStep === step.id;
  const selectedCount = stepSelectedCount(allProducts, step.id, selections);
  const Icon = step.icon;
  const next = nextStepId(step.id);

  return (
    <section className={isOpen ? "rounded-xl bg-info-bg p-3 sm:p-6" : "border-b"}>
      <button
        type="button"
        onClick={() => toggleStep(step.id)}
        className="flex w-full flex-col gap-1.5 py-2.5 text-left sm:py-3"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between gap-1">
          <span className="text-[11px] font-semibold tracking-wide text-secondary-text">STEP {step.index} OF 4</span>
        </div>

        <div className="h-px w-full bg-black/90" />

        <div className="flex items-center justify-between gap-1.5">
          <span className="flex min-w-0 items-center gap-3">
            <Icon className="step-icon" />
            <span className="truncate text-[17px] font-semibold text-heading-text sm:text-xl">{step.title}</span>
          </span>

          <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-primary sm:text-sm">
            {selectedCount > 0 && <span>{selectedCount} selected</span>}
            <ChevronIcon open={isOpen} className="h-4 w-4" />
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="flex flex-col gap-5 pb-2 pt-2">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {next && (
            <button
              type="button"
              onClick={() => toggleStep(next)}
              className="mx-auto self-center rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
            >
              {step.nextLabel}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
