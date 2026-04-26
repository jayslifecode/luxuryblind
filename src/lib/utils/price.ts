export function calcSqm(widthCm: number, heightCm: number): number {
  return Math.max(1, Math.ceil((widthCm / 100) * (heightCm / 100)));
}

export function calcPrice(widthCm: number, heightCm: number, pricePerSqm: number): number {
  return calcSqm(widthCm, heightCm) * pricePerSqm;
}

export function formatPrice(amount: number): string {
  return "₮" + amount.toLocaleString("mn-MN");
}

export function generateOrderRef(): string {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `LB-${yyyy}${mm}${dd}-${rand}`;
}
