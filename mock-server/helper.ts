// Random Invoice Number Generator format: INV 1234567-3844
export function generateInvoiceNumber(): string {
  const part1 = Math.floor(1_000_000 + Math.random() * 9_000_000);
  const part2 = Math.floor(1000 + Math.random() * 9000);
  return `INV ${part1}-${part2}`;
}
