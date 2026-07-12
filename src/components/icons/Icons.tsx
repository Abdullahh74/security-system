import type { ImgHTMLAttributes } from "react";
import cameraUrl from "../../assets/icons/livestream.svg";
import shieldUrl from "../../assets/icons/shield.svg";
import sensorUrl from "../../assets/icons/wireless.svg";
import gridUrl from "../../assets/icons/phone.svg";
import truckUrl from "../../assets/icons/truck.svg";
import chevronUrl from "../../assets/icons/carrot-up.svg";
import minusUrl from "../../assets/icons/minus.svg";
import plusUrl from "../../assets/icons/plus.svg";
import placeholderUrl from "../../assets/icons/placeholder.svg";

export function CameraIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={cameraUrl} alt="Camera" {...props} />;
}

export function ShieldIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={shieldUrl} alt="Shield" {...props} />;
}

export function SensorIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={sensorUrl} alt="Sensor" {...props} />;
}

export function GridIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={gridUrl} alt="Grid" {...props} />;
}

export function TruckIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={truckUrl} alt="Truck" {...props} />;
}

export function ChevronIcon({ open, ...props }: ImgHTMLAttributes<HTMLImageElement> & { open?: boolean }) {
  return (
    <img
      src={chevronUrl}
      alt="Toggle"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 150ms ease" }}
      {...props}
    />
  );
}

export function MinusIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={minusUrl} alt="Minus" {...props} />;
}

export function PlusIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={plusUrl} alt="Plus" {...props} />;
}

export function ImagePlaceholderIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={placeholderUrl} alt="Placeholder" {...props} />;
}
