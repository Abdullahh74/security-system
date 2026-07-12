import type { Product } from "../types";
import { useBundle } from "../context/BundleContext";
import { DEFAULT_VARIANT_KEY, formatMoney, getProductTotalQuantity, getVariantQuantity } from "../lib/bundle";
import { Badge } from "./Badge";
import { ProductImage } from "./ProductImage";
import { QuantityStepper } from "./QuantityStepper";
import { VariantSelector } from "./VariantSelector";

export function ProductCard({ product }: { product: Product }) {
  const { selections, activeVariant, setQuantity, setActiveVariant } = useBundle();

  const currentVariantId = product.variants?.length
    ? activeVariant[product.id] ?? product.defaultVariantId ?? product.variants[0].id
    : DEFAULT_VARIANT_KEY;

  const quantity = getVariantQuantity(selections, product.id, currentVariantId);
  const totalQuantity = getProductTotalQuantity(selections, product);
  const selected = totalQuantity > 0;
  const image = product.variants?.find((v) => v.id === currentVariantId)?.image ?? product.image;

  return (
    <div
      className={`product-card relative flex h-full flex-col gap-3 rounded-card border bg-white p-3 shadow-card transition-colors xl:flex-row xl:gap-4 xl:p-4 ${
        selected ? "border-primary" : "border-border-light"
      }`}
    >
      {product.badge && <Badge label={product.badge} />}

      <div className="flex h-full flex-col gap-3 xl:flex-row xl:items-stretch xl:gap-4">
        <div className="relative h-32 shrink-0 overflow-hidden rounded-2xl p-2 xl:h-auto xl:w-32 xl:rounded-[28px] xl:p-3">
          <ProductImage src={image} alt={product.title} className="h-full w-full" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div>
            <h3 className="text-base font-semibold leading-snug text-heading-text">{product.title}</h3>
            <p className="mt-2 text-sm leading-snug text-secondary-text">
              {product.description}{" "}
              {product.learnMoreUrl && (
                <a
                  href={product.learnMoreUrl}
                  className="font-medium text-primary underline underline-offset-2"
                  onClick={(e) => e.preventDefault()}
                >
                  Learn More
                </a>
              )}
            </p>
          </div>

          {product.variants && product.variants.length > 0 && (
            <VariantSelector
              variants={product.variants}
              activeVariantId={currentVariantId}
              onSelect={(variantId) => setActiveVariant(product.id, variantId)}
            />
          )}

          <div className="mt-auto flex items-center justify-between gap-3 pt-1">
            {product.hasStepper !== false ? (
              <QuantityStepper
                quantity={quantity}
                onChange={(q) => setQuantity(product.id, currentVariantId, q)}
                disabled={product.required}
                min={product.required ? 1 : 0}
                ariaLabel={`${product.title} quantity`}
                size="sm"
              />
            ) : (
              <span />
            )}

            <div className="flex flex-col items-end gap-1 text-right">
              {product.compareAtPrice != null && <span className="product-price-strike">{formatMoney(product.compareAtPrice)}</span>}
              <span className={`product-price ${product.compareAtPrice != null ? "product-price--discounted" : ""}`}>
                {formatMoney(product.price)}
                {product.unitSuffix ?? ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
