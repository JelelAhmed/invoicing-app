import InvoiceModalActivity from "./InvoiceModalActivity";
import InvoiceModalSummary from "./InvoiceModalSummary";
import type { Invoice } from "../types/invoice";

interface InvoiceContentProps {
  invoice: Invoice;
}

export default function InvoiceContent({ invoice }: InvoiceContentProps) {
  return (
    <div
      className="flex flex-row gap-10 p-0"
      style={{ width: 1254, height: 1199 }}
    >
      <div className="flex-shrink-0">
        <InvoiceModalSummary invoice={invoice} />
      </div>
      <div className="flex-shrink-0">
        <InvoiceModalActivity activities={invoice.activities} />
      </div>
    </div>
  );
}
