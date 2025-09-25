// Random Invoice Number Generator format: INV 1234567-3844
import { Invoice } from "./types";
export function generateInvoiceNumber(): string {
  const part1 = Math.floor(1_000_000 + Math.random() * 9_000_000);
  const part2 = Math.floor(1000 + Math.random() * 9000);
  return `INV ${part1}-${part2}`;
}

export function calculateRemindersCount(invoices: Invoice[]): number {
  return invoices.reduce((acc, inv) => {
    if (!inv.reminders) return acc;
    const activeCount = Object.values(inv.reminders).filter(Boolean).length;
    return acc + activeCount;
  }, 0);
}
