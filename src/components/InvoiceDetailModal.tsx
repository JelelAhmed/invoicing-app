import { useEffect } from "react";
import CloseModalButton from "./CloseModalButton";
import InvoiceModalHeader from "./InvoiceModalHeader";
import InvoiceReminders from "./InvoiceReminders";
import InvoiceContent from "./InvoiceContent";
import type { Invoice } from "../types/invoice";
import SenderImage from "../assets/icons/Sender-image.png";

interface InvoiceDetailModalProps {
  onClose: () => void;
}

// Reminders object
const reminders = [
  { label: "14 days before due date", active: true },
  { label: "7 days before due date", active: true },
  { label: "3 days before due date" },
  { label: "24 hrs before due date" },
  { label: "On the due date" },
];

// Dummy invoice object
const invoiceData: Invoice = {
  senderName: "Fabulous Enterprise",
  senderPhone: "+386 989 271 3115",
  senderAddress: "1331 Hart Ridge Road 48436 Gaines, MI",
  senderEmail: "info@fabulousenterise.co",
  senderLogo: SenderImage,
  customerName: "Olaniyi Ojo Adewale",
  customerPhone: "+386 989 271 3115",
  customerAddress: "1331 Hart Ridge Road 48436 Gaines, MI",
  customerEmail: "olaniyi@example.com",
  invoiceNumber: "1023902390",
  issueDate: "March 30th, 2023",
  dueDate: "May 19th, 2023",
  billingCurrency: "USD ($)",
  items: [
    {
      name: "Email Marketing",
      quantity: 10,
      price: 1500,
      total: 15000,
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
    },
    {
      name: "Video looping effect",
      quantity: 6,
      price: 1110500,
      total: 6663000,
    },
    {
      name: "Graphic design for emails",
      quantity: 7,
      price: 2750,
      total: 19250,
    },
  ],
  subtotal: 6697200,
  discount: 167430,
  totalDue: 6529770,
  paymentInfo: {
    accountName: "Fabulous Enterprise",
    accountNumber: "1023902390",
    achRoutingNo: "123456789",
    bankName: "Fabulous Bank",
    bankAddress: "123 Finance Street, NY",
  },
  activities: [
    {
      type: "Created invoice",
      user: "You",
      timestamp: "Today, 12:20 PM",
      description: "Created invoice 00239434/Olaniyi Ojo Adewale",
    },
    {
      type: "Sent invoice",
      user: "You",
      timestamp: "Today, 12:20 PM",
      description:
        "Sent invoice 00239434/Olaniyi Ojo Adewale to Olaniyi Ojo Adewale",
    },
    {
      type: "Payment Confirmed",
      user: "You",
      timestamp: "Today, 12:20 PM",
      description: "Manually confirmed a partial payment of $503,000.00",
      amount: 503000,
    },
    {
      type: "Payment Confirmed",
      user: "You",
      timestamp: "Today, 12:20 PM",
      description: "Manually confirmed a full payment of $6,000,000.00",
      amount: 6000000,
    },
  ],
};

export default function InvoiceDetailModal({
  onClose,
}: InvoiceDetailModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-start z-50 overflow-auto">
      <div className="relative mt-16">
        <div className="absolute -top-7 right-0 z-50">
          <CloseModalButton onClick={onClose} />
        </div>

        <div className="w-[1334px] max-h-[90vh] bg-white rounded-xl p-10 flex flex-col gap-8 overflow-y-auto scrollable">
          {/* Modal Header */}
          <InvoiceModalHeader
            invoiceNumber={invoiceData.invoiceNumber}
            status="PARTIAL PAYMENT"
            onDownload={() => console.log("Download PDF")}
            onSend={() => console.log("Send invoice")}
            onMore={() => console.log("More actions")}
          />

          {/* Reminders */}
          <div className="mt-[40px]">
            <InvoiceReminders reminders={reminders} />
          </div>

          {/* Modal Body */}
          <div className="mt-[40px]">
            <InvoiceContent invoice={invoiceData} />
          </div>
        </div>
      </div>
    </div>
  );
}
