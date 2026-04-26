import { formatPrice } from "@/lib/utils/price";

interface PriceDisplayProps {
  amount: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({ amount, className = "", size = "md" }: PriceDisplayProps) {
  const sizeClass = size === "lg" ? "text-3xl" : size === "sm" ? "text-sm" : "text-xl";
  return (
    <span className={`font-numbers text-lb-gold ${sizeClass} ${className}`}>
      {formatPrice(amount)}
    </span>
  );
}
