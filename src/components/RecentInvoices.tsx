import { useEffect, useState } from "react";
import Button from "./ui/Button";
import RecentInvoiceItem from "./RecentInvoiceItem";
import RecentInvoiceDateGroup from "./RecentInvoiceDateGroup";
import InvoiceDetailModal from "./InvoiceDetailModal";
import type { Invoice, BackendInvoice, InvoiceStatus } from "../types/invoice";
import { formatDate } from "../utils/formatDate";
import { getDateGroup } from "../utils/getDateGroup";
import {
  onInvoiceCreated,
  offInvoiceCreated,
} from "../lib/socket-client/socket";

// UI-friendly type for listing
interface UIInvoice {
  id: string;
  customer: string;
  dueDate: string;
  issueDate: string;
  status: InvoiceStatus;
  amount: string;
  group: string;
}

const DISPLAY_LIMIT = 5;

export default function RecentInvoices() {
  const [fullInvoices, setFullInvoices] = useState<Invoice[]>([]);
  const [uiInvoices, setUIInvoices] = useState<UIInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map BackendInvoice -> UIInvoice
  const mapToUIInvoice = (inv: BackendInvoice): UIInvoice => ({
    id: inv.invoiceNumber,
    customer: inv.customerName,
    dueDate: formatDate(inv.dueDate),
    issueDate: formatDate(inv.issueDate),
    status: inv.status,
    amount: `$${inv.totalDue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    group: getDateGroup(inv.issueDate),
  });

  useEffect(() => {
    // Initial fetch
    fetch("http://localhost:4000/invoices")
      .then((res) => res.json())
      .then((data: Invoice[]) => {
        setFullInvoices(data); // keep full invoices
        const mapped = data.map((inv) => mapToUIInvoice(inv));
        setUIInvoices(mapped);
      })
      .catch((err) => console.error("Failed to fetch invoices:", err));

    // Real-time socket listener
    const handleNewInvoice = (inv: BackendInvoice) => {
      // Create full Invoice placeholder (replace with proper backend fetch if needed)
      const fullInvoice: Invoice = {
        senderName: "Fabulous Enterprise",
        senderPhone: "+3869892713115",
        senderAddress: "1331 Hart Ridge Road 48436 Gaines, MI",
        senderEmail: "info@fabulousenterprise.co",
        customerName: inv.customerName,
        customerPhone: "",
        customerAddress: "",
        customerEmail: "",
        customerLogo: "",
        senderLogo: "",
        invoiceNumber: inv.invoiceNumber,
        issueDate: inv.issueDate,
        dueDate: inv.dueDate,
        billingCurrency: "USD",
        items: [],
        subtotal: inv.totalDue,
        discount: 0,
        totalDue: inv.totalDue,
        status: inv.status,
        paymentInfo: {
          accountName: "",
          accountNumber: "",
          achRoutingNo: "",
          bankName: "",
          bankAddress: "",
        },
        activities: inv.activities || [],
      };

      setFullInvoices((prev) => [fullInvoice, ...prev]);
      setUIInvoices((prev) => [mapToUIInvoice(inv), ...prev]);
    };

    onInvoiceCreated(handleNewInvoice);
    return () => offInvoiceCreated(handleNewInvoice);
  }, []);

  // Limit UI invoices
  const limitedInvoices = uiInvoices.slice(0, DISPLAY_LIMIT);

  // Group by UIInvoice.group
  const groupedInvoices = limitedInvoices.reduce((acc, invoice) => {
    if (!acc[invoice.group]) acc[invoice.group] = [];
    acc[invoice.group].push(invoice);
    return acc;
  }, {} as Record<string, UIInvoice[]>);

  // Sort groups newest first
  const sortedGroups = Object.keys(groupedInvoices).sort((a, b) => {
    const parseGroup = (label: string) => {
      if (label === "Today") return new Date();
      if (label === "Yesterday") {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d;
      }
      return new Date(label);
    };
    return parseGroup(b).getTime() - parseGroup(a).getTime();
  });

  // Open modal
  const handleInvoiceClick = (invoiceId: string) => {
    const fullInvoice = fullInvoices.find(
      (inv) => inv.invoiceNumber === invoiceId
    );
    if (fullInvoice) {
      setSelectedInvoice(fullInvoice);
      setIsModalOpen(true);
    }
  };

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
        {sortedGroups.map((group) => (
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
                  className="cursor-pointer hover:bg-gray-100 transition-colors rounded-lg"
                  onClick={() => handleInvoiceClick(invoice.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedInvoice && (
        <InvoiceDetailModal
          onClose={() => setIsModalOpen(false)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
}
