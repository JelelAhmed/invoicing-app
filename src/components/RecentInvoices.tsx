import Button from "./ui/Button";
import RecentInvoiceItem from "./RecentInvoiceItem";
import type { InvoiceStatus } from "./RecentInvoiceItem";
import RecentInvoiceDateGroup from "./RecentInvoiceDateGroup";

interface Invoice {
  id: string;
  customer: string;
  dueDate: string;
  issueDate: string;
  amount: string;
  status: InvoiceStatus;
  group: string; // Added grouping field
}

const sampleInvoices: Invoice[] = [
  {
    id: "1023494-2304",
    customer: "Olaniyi Ojo Adewale",
    dueDate: "May 19th, 2023",
    issueDate: "March 30th, 2023",
    amount: "$1,311,750.12",
    status: "PAID",
    group: "8th December, 2022",
  },
  {
    id: "00239434",
    customer: "Olaniyi Ojo Adewale",
    dueDate: "8th December, 2022",
    issueDate: "March 30th, 2023",
    amount: "$5,200.00",
    status: "OVERDUE",
    group: "Today",
  },
  {
    id: "00239435",
    customer: "Olaniyi Ojo Adewale",
    dueDate: "May 19th, 2023",
    issueDate: "March 30th, 2023",
    amount: "$750.00",
    status: "DRAFT",
    group: "Yesterday",
  },
  {
    id: "00239436",
    customer: "Olaniyi Ojo Adewale",
    dueDate: "May 19th, 2023",
    issueDate: "March 30th, 2023",
    amount: "$2,000.00",
    status: "PENDING",
    group: "Yesterday",
  },
];
export default function RecentInvoices() {
  const groupedInvoices = sampleInvoices.reduce((acc, invoice) => {
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
