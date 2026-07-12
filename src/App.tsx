import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api/fetchProducts";
import { BundleProvider, useBundle } from "./context/BundleContext";
import { STEPS } from "./lib/steps";
import { StepAccordion } from "./components/StepAccordion";
import { ReviewPanel } from "./components/ReviewPanel";
import type { Product } from "./types";

function Builder() {
  const { products } = useBundle();

  return (
    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_440px]">
      <div className="flex flex-col gap-0.5">
        {STEPS.map((step) => (
          <StepAccordion key={step.id} step={step} products={products.filter((p) => p.stepId === step.id)} />
        ))}
      </div>

      <div className="xl:sticky xl:top-6">
        <ReviewPanel />
      </div>
    </div>
  );
}

export default function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1320px] px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="mb-5 text-center text-3xl font-extrabold text-heading-text sm:mb-8 sm:text-left sm:text-4xl">
          Let's get started!
        </h1>

        {isLoading && <p className="text-secondary-text">Loading your options...</p>}
        {isError && <p className="text-error">Couldn't load the product catalog.</p>}

        {data && (
          <BundleProvider products={data.products as Product[]}>
            <Builder />
          </BundleProvider>
        )}
      </div>
    </div>
  );
}
