import { useEffect, useState } from "react";
import Button from "./ui/Button";
import type { InvoiceStatus } from "../types/invoice";
import RecentInvoiceItem from "./RecentInvoiceItem";
import RecentInvoiceDateGroup from "./RecentInvoiceDateGroup";
import { formatDate } from "../utils/formatDate";
import { getDateGroup } from "../utils/getDateGroup";

interface BackendInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  dueDate: string;
  issueDate: string;
  totalDue: number;
  status: InvoiceStatus;
}

interface Invoice {
  id: string;
  customer: string;
  dueDate: string;
  issueDate: string;
  status: InvoiceStatus;
  amount: string; // formatted for UI
  group: string; // grouped by date label
}

export default function RecentInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/invoices")
      .then((res) => res.json())
      .then((data: BackendInvoice[]) => {
        const mapped: Invoice[] = data.map((inv) => ({
          id: inv.invoiceNumber,
          customer: inv.customerName,
          dueDate: formatDate(inv.dueDate),
          issueDate: formatDate(inv.issueDate),
          status: inv.status,
          amount: `$${inv.totalDue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          group: getDateGroup(inv.dueDate),
        }));
        setInvoices(mapped);
      })
      .catch((err) => console.error("Failed to fetch invoices:", err));
  }, []);

  // Group invoices by their "group" field
  const groupedInvoices = invoices.reduce((acc, invoice) => {
    if (!acc[invoice.group]) acc[invoice.group] = [];
    acc[invoice.group].push(invoice);
    return acc;
  }, {} as Record<string, Invoice[]>);

  return (
    <div className="flex flex-col bg-white rounded-[40px] p-8 w-[617px] h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 w-full">
        <h2 className="text-[#1F1F23] text-[20px] font-semibold leading-[25px]">
          Recent Invoices
        </h2>
        <Button
          variant="outlined"
          size="md"
          textColor="#003EFF"
          className="w-[242px]"
        >
          View All Invoices
        </Button>
      </div>

      {/* Invoice List */}
      <div className="flex flex-col gap-4 flex-1 overflow-auto">
        {Object.keys(groupedInvoices).map((group) => (
          <div key={group}>
            <RecentInvoiceDateGroup label={group} />
            <div className="flex flex-col gap-4">
              {groupedInvoices[group].map((invoice) => (
                <RecentInvoiceItem
                  key={invoice.id}
                  id={invoice.id}
                  customer={invoice.customer}
                  dueDate={invoice.dueDate}
                  issueDate={invoice.issueDate}
                  amount={invoice.amount}
                  status={invoice.status}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
