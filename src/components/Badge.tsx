export function Badge({ label }: { label: string }) {
  return (
    <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
      {label}
    </span>
  );
}
