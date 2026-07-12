import { MinusIcon, PlusIcon } from "./icons/Icons";

interface Props {
  quantity: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  ariaLabel: string;
}

export function QuantityStepper({
  quantity,
  onChange,
  disabled = false,
  min = 0,
  max = 99,
  size = "md",
  ariaLabel,
}: Props) {
  const btnSize = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const textSize = size === "sm" ? "text-sm" : "text-[15px]";

  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        className={`stepper-btn ${btnSize}`}
        disabled={disabled || quantity <= min}
        onClick={() => onChange(Math.max(min, quantity - 1))}
        aria-label={`Decrease ${ariaLabel}`}
      >
        <MinusIcon className="h-3.5 w-3.5" />
      </button>
      <span className={`min-w-[1ch] text-center font-medium tabular-nums ${textSize}`}>{quantity}</span>
      <button
        type="button"
        className={`stepper-btn ${btnSize}`}
        disabled={disabled || quantity >= max}
        onClick={() => onChange(Math.min(max, quantity + 1))}
        aria-label={`Increase ${ariaLabel}`}
      >
        <PlusIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
