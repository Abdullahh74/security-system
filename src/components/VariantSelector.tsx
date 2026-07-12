import type { Variant } from "../types";
import { ProductImage } from "./ProductImage";

interface Props {
  variants: Variant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ variants, activeVariantId, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Color">
      {variants.map((variant) => {
        const active = variant.id === activeVariantId;
        return (
          <button
            key={variant.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(variant.id)}
            className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium text-heading-text transition-colors ${
              active
                ? "border-success bg-success/5"
                : "border-border-light bg-white text-heading-text hover:border-primary"
            }`}
          >
            <span className="h-4 w-4 shrink-0 overflow-hidden">
              <ProductImage src={variant.image} alt="" className="h-full w-full" />
            </span>
            {variant.label}
          </button>
        );
      })}
    </div>
  );
}
