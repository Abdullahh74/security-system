import { useState } from "react";
import { ImagePlaceholderIcon } from "./icons/Icons";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className = "" }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={`flex items-center justify-center bg-info-bg text-muted-text ${className}`}>
        <ImagePlaceholderIcon className="h-1/3 w-1/3" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain ${className}`}
      onError={() => setErrored(true)}
      loading="lazy"
    />
  );
}
