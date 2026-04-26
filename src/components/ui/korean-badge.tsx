export function KoreanBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-lb-gold/30 bg-lb-gold/10 text-lb-gold text-[10px] font-sans font-semibold tracking-wider uppercase ${className}`}
    >
      🇰🇷 Korean
    </span>
  );
}
