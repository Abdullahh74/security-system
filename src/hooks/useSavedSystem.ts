import type { SelectionMap } from "../types";

const STORAGE_KEY = "bundle-builder:saved-system:v1";

export interface SavedSystem {
  selections: SelectionMap;
  activeVariant: Record<string, string>;
  savedAt: string;
}

export function loadSavedSystem(): SavedSystem | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedSystem;
  } catch {
    return null;
  }
}

export function saveSystem(data: Omit<SavedSystem, "savedAt">): SavedSystem {
  const payload: SavedSystem = { ...data, savedAt: new Date().toISOString() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

export function clearSavedSystem() {
  window.localStorage.removeItem(STORAGE_KEY);
}
