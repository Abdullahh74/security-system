import type { BundleData } from "../types";
import productsJson from "../data/products.json";

/**
 * In a real app this would hit a backend endpoint (the take-home brief
 * calls this out as a bonus). Here we simulate a network round trip around
 * the local JSON file so the rest of the app can be written against
 * React Query the same way it would be against a real API.
 */
export async function fetchProducts(): Promise<BundleData> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return productsJson as BundleData;
}
