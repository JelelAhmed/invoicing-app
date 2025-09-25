// Map backend activity types to human-readable names
export function mapActivityType(type: string) {
  switch (type) {
    case "CREATED":
      return "Invoice Creation";
    case "UPDATED":
      return "Invoice Update";
    case "PAID":
      return "Invoice Payment";
    default:
      return type;
  }
}
