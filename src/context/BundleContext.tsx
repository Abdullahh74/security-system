import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { Product, SelectionMap, StepId } from "../types";
import { DEFAULT_VARIANT_KEY, seedActiveVariant, seedSelections } from "../lib/bundle";
import { clearSavedSystem, loadSavedSystem, saveSystem } from "../hooks/useSavedSystem";

interface State {
  selections: SelectionMap;
  activeVariant: Record<string, string>;
  openStep: StepId | null;
  justSaved: boolean;
}

function getInitialOpenStep(): StepId | null {
  if (typeof window === "undefined") {
    return "cameras";
  }

  return window.innerWidth >= 768 ? "cameras" : null;
}

type Action =
  | { type: "SET_QUANTITY"; productId: string; variantId: string; quantity: number }
  | { type: "SET_ACTIVE_VARIANT"; productId: string; variantId: string }
  | { type: "SET_OPEN_STEP"; stepId: StepId | null }
  | { type: "MARK_SAVED"; value: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_QUANTITY": {
      const { productId, variantId, quantity } = action;
      const clamped = Math.max(0, quantity);
      return {
        ...state,
        justSaved: false,
        selections: {
          ...state.selections,
          [productId]: {
            ...state.selections[productId],
            [variantId]: clamped,
          },
        },
      };
    }
    case "SET_ACTIVE_VARIANT":
      return {
        ...state,
        activeVariant: { ...state.activeVariant, [action.productId]: action.variantId },
      };
    case "SET_OPEN_STEP":
      return { ...state, openStep: action.stepId };
    case "MARK_SAVED":
      return { ...state, justSaved: action.value };
    default:
      return state;
  }
}

interface BundleContextValue {
  products: Product[];
  selections: SelectionMap;
  activeVariant: Record<string, string>;
  openStep: StepId | null;
  justSaved: boolean;
  setQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  toggleStep: (stepId: StepId) => void;
  saveForLater: () => void;
}

const BundleContext = createContext<BundleContextValue | null>(null);

export function BundleProvider({ products, children }: { products: Product[]; children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, (): State => {
    const saved = loadSavedSystem();
    if (saved) {
      return {
        selections: saved.selections,
        activeVariant: saved.activeVariant,
        openStep: getInitialOpenStep(),
        justSaved: false,
      };
    }

    return {
      selections: seedSelections(products),
      activeVariant: seedActiveVariant(products),
      openStep: getInitialOpenStep(),
      justSaved: false,
    };
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncOpenStep = () => {
      dispatch({
        type: "SET_OPEN_STEP",
        stepId: mediaQuery.matches ? "cameras" : null,
      });
    };

    syncOpenStep();
    mediaQuery.addEventListener("change", syncOpenStep);

    return () => mediaQuery.removeEventListener("change", syncOpenStep);
  }, []);

  const setQuantity = useCallback((productId: string, variantId: string | undefined, quantity: number) => {
    dispatch({ type: "SET_QUANTITY", productId, variantId: variantId ?? DEFAULT_VARIANT_KEY, quantity });
  }, []);

  const setActiveVariant = useCallback((productId: string, variantId: string) => {
    dispatch({ type: "SET_ACTIVE_VARIANT", productId, variantId });
  }, []);

  const toggleStep = useCallback(
    (stepId: StepId) => {
      dispatch({ type: "SET_OPEN_STEP", stepId: state.openStep === stepId ? null : stepId });
    },
    [state.openStep]
  );

  const saveForLater = useCallback(() => {
    saveSystem({ selections: state.selections, activeVariant: state.activeVariant });
    dispatch({ type: "MARK_SAVED", value: true });
    window.setTimeout(() => dispatch({ type: "MARK_SAVED", value: false }), 2500);
  }, [state.selections, state.activeVariant]);

  const value = useMemo<BundleContextValue>(
    () => ({
      products,
      selections: state.selections,
      activeVariant: state.activeVariant,
      openStep: state.openStep,
      justSaved: state.justSaved,
      setQuantity,
      setActiveVariant,
      toggleStep,
      saveForLater,
    }),
    [products, state, setQuantity, setActiveVariant, toggleStep, saveForLater]
  );

  return <BundleContext.Provider value={value}>{children}</BundleContext.Provider>;
}

export function useBundle() {
  const ctx = useContext(BundleContext);
  if (!ctx) throw new Error("useBundle must be used within a BundleProvider");
  return ctx;
}

export { clearSavedSystem };
