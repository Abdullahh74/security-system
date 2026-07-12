export type StepId = "cameras" | "plan" | "sensors" | "protection";

export interface Variant {
  id: string;
  label: string;
  swatch: string; // hex color used to render the swatch dot as a fallback
  image: string; // path under /src/assets, provided later by the user
}

export interface Product {
  id: string;
  stepId: StepId;
  category: "Cameras" | "Sensors" | "Accessories" | "Plan";
  title: string;
  description: string;
  learnMoreUrl?: string;
  image: string; // path under /src/assets, provided later by the user
  badge?: string; // e.g. "Save 22%"
  price: number; // active unit price
  compareAtPrice?: number; // original unit price, struck through
  unitSuffix?: string; // e.g. "/mo" for the plan
  variants?: Variant[];
  defaultVariantId?: string;
  required?: boolean; // true => quantity is locked (disabled stepper), e.g. the sensor hub
  hasStepper?: boolean; // false => single fixed item, no quantity control at all
  defaultQuantity?: number; // seed quantity for the default/only variant
}

export interface BundleData {
  products: Product[];
}

/** quantity per product, keyed by variant id ("default" when the product has no variants) */
export type SelectionMap = Record<string, Record<string, number>>;

export interface BundleState {
  selections: SelectionMap;
  activeVariant: Record<string, string>; // productId -> currently active variantId shown on the card
  openStep: StepId | null;
}
