import { useEffect } from "react";
import CloseModalButton from "./CloseModalButton";
import InvoiceModalHeader from "./InvoiceModalHeader";
import InvoiceRemindersComp from "./InvoiceReminders";
import InvoiceContent from "./InvoiceContent";
import type { Invoice, InvoiceReminders, Reminder } from "../types/invoice";

interface InvoiceDetailModalProps {
  onClose: () => void;
  invoice: Invoice;
}

// Reminders object
const reminders = [
  { label: "14 days before due date", active: true },
  { label: "7 days before due date", active: true },
  { label: "3 days before due date" },
  { label: "24 hrs before due date" },
  { label: "On the due date" },
];

export default function InvoiceDetailModal({
  onClose,
  invoice,
}: InvoiceDetailModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const formatReminders = (reminders?: InvoiceReminders): Reminder[] => [
    { label: "14 days before due date", active: reminders?.["14days"] },
    { label: "7 days before due date", active: reminders?.["7days"] },
    { label: "3 days before due date", active: reminders?.["3days"] },
    { label: "24 hrs before due date", active: reminders?.["24hrs"] },
    { label: "On the due date", active: reminders?.["dueDate"] },
  ];

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-start z-50 overflow-auto">
      <div className="relative mt-16">
        <div className="absolute -top-7 right-0 z-50">
          <CloseModalButton onClick={onClose} />
        </div>

        <div className="w-[1334px] max-h-[90vh] bg-white rounded-xl p-10 flex flex-col gap-8 overflow-y-auto scrollable">
          {/* Modal Header */}
          <InvoiceModalHeader
            invoiceNumber={invoice.invoiceNumber}
            status={invoice.status}
            onDownload={() => console.log("Download PDF")}
            onSend={() => console.log("Send invoice")}
            onMore={() => console.log("More actions")}
          />

          {/* Reminders */}
          <div className="mt-[40px]">
            <InvoiceRemindersComp
              reminders={formatReminders(invoice.reminders)}
            />
          </div>

          {/* Modal Body */}
          <div className="mt-[40px]">
            <InvoiceContent invoice={invoice} />
          </div>
        </div>
      </div>
    </div>
  );
}
