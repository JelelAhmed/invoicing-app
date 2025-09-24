export function formatCurrency(amount: number): {
  integer: string;
  decimal: string;
} {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formatted = formatter.format(amount); // e.g. "1,234,567.89"
  const [integerPart, decimalPart] = formatted.split(".");

  return {
    integer: `$${integerPart}`,
    decimal: decimalPart ?? "00",
  };
}
