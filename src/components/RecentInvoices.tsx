"use client";

import { useEffect, useState } from "react";
import Button from "./ui/Button";
import type { InvoiceStatus, BackendInvoice } from "../types/invoice";
import RecentInvoiceItem from "./RecentInvoiceItem";
import RecentInvoiceDateGroup from "./RecentInvoiceDateGroup";
import { formatDate } from "../utils/formatDate";
import { getDateGroup } from "../utils/getDateGroup";
import {
  onInvoiceCreated,
  offInvoiceCreated,
} from "../lib/socket-client/socket";

interface Invoice {
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
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Map backend invoice to UI-friendly format
  const mapInvoice = (inv: BackendInvoice): Invoice => ({
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
    fetch("http://localhost:4000/invoices")
      .then((res) => res.json())
      .then((data: BackendInvoice[]) => {
        const mapped = data.map(mapInvoice);
        setInvoices(mapped);
      })
      .catch((err) => console.error("Failed to fetch invoices:", err));

    // Real-time listener
    const handleNewInvoice = (inv: BackendInvoice) => {
      setInvoices((prev) => [mapInvoice(inv), ...prev]);
    };

    onInvoiceCreated(handleNewInvoice);

    return () => offInvoiceCreated(handleNewInvoice);
  }, []);

  // Limit invoices to DISPLAY_LIMIT
  const limitedInvoices = invoices.slice(0, DISPLAY_LIMIT);

  // Group invoices by "group" field
  const groupedInvoices = limitedInvoices.reduce((acc, invoice) => {
    if (!acc[invoice.group]) acc[invoice.group] = [];
    acc[invoice.group].push(invoice);
    return acc;
  }, {} as Record<string, Invoice[]>);

  // Sort group keys newest first
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
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
