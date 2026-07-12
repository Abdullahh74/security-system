import type { Product, SelectionMap, StepId } from "../types";

export const DEFAULT_VARIANT_KEY = "default";

export function variantKeysFor(product: Product): string[] {
  return product.variants?.length ? product.variants.map((v) => v.id) : [DEFAULT_VARIANT_KEY];
}

export function getVariantQuantity(selections: SelectionMap, productId: string, variantId: string): number {
  return selections[productId]?.[variantId] ?? 0;
}

export function getProductTotalQuantity(selections: SelectionMap, product: Product): number {
  return variantKeysFor(product).reduce((sum, vId) => sum + getVariantQuantity(selections, product.id, vId), 0);
}

export function isProductSelected(selections: SelectionMap, product: Product): boolean {
  return getProductTotalQuantity(selections, product) > 0;
}

export function seedSelections(products: Product[]): SelectionMap {
  const map: SelectionMap = {};
  for (const product of products) {
    const defaultVariant = product.defaultVariantId ?? DEFAULT_VARIANT_KEY;
    map[product.id] = {};
    for (const key of variantKeysFor(product)) {
      map[product.id][key] = key === defaultVariant ? product.defaultQuantity ?? 0 : 0;
    }
  }
  return map;
}

export function seedActiveVariant(products: Product[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const product of products) {
    map[product.id] = product.defaultVariantId ?? DEFAULT_VARIANT_KEY;
  }
  return map;
}

export function stepSelectedCount(products: Product[], stepId: StepId, selections: SelectionMap): number {
  return products.filter((p) => p.stepId === stepId).filter((p) => isProductSelected(selections, p)).length;
}

export interface ReviewLine {
  productId: string;
  variantId: string;
  variantLabel?: string;
  title: string;
  image: string;
  quantity: number;
  unitPrice: number;
  compareAtUnitPrice?: number;
  unitSuffix?: string;
  required?: boolean;
  hasStepper?: boolean;
}

export interface ReviewGroup {
  category: string;
  lines: ReviewLine[];
}

export function buildReviewGroups(products: Product[], selections: SelectionMap): ReviewGroup[] {
  const order = ["Cameras", "Sensors", "Accessories", "Plan"];
  const groups: Record<string, ReviewLine[]> = { Cameras: [], Sensors: [], Accessories: [], Plan: [] };

  for (const product of products) {
    for (const variantId of variantKeysFor(product)) {
      const qty = getVariantQuantity(selections, product.id, variantId);
      if (qty <= 0) continue;
      const variant = product.variants?.find((v) => v.id === variantId);
      groups[product.category]?.push({
        productId: product.id,
        variantId,
        variantLabel: variant?.label,
        title: variant ? `${product.title}` : product.title,
        image: variant?.image ?? product.image,
        quantity: qty,
        unitPrice: product.price,
        compareAtUnitPrice: product.compareAtPrice,
        unitSuffix: product.unitSuffix,
        required: product.required,
        hasStepper: product.hasStepper,
      });
    }
  }

  return order
    .map((category) => ({ category, lines: groups[category] }))
    .filter((g) => g.lines.length > 0);
}

export interface BundleTotals {
  subtotal: number;
  compareAtSubtotal: number;
  savings: number;
  financingPerMonth: number;
}

export function computeTotals(products: Product[], selections: SelectionMap): BundleTotals {
  let subtotal = 0;
  let compareAtSubtotal = 0;

  for (const product of products) {
    const qty = getProductTotalQuantity(selections, product);
    if (qty <= 0) continue;
    subtotal += product.price * qty;
    compareAtSubtotal += (product.compareAtPrice ?? product.price) * qty;
  }

  const savings = Math.max(0, compareAtSubtotal - subtotal);
  // Simplified 10-month financing estimate, purely illustrative.
  const financingPerMonth = subtotal > 0 ? subtotal / 9.79 : 0;

  return { subtotal, compareAtSubtotal, savings, financingPerMonth };
}

export function formatMoney(value: number): string {
  return `$${value.toFixed(2)}`;
}
