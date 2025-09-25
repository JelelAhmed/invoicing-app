import clsx from "clsx";
import type { InvoiceStatus } from "../types/invoice";

interface RecentInvoiceItemProps {
  id: string;
  customer: string;
  dueDate: string;
  issueDate: string;
  amount: string;
  status: InvoiceStatus;
}

export default function RecentInvoiceItem({
  id,
  dueDate,
  amount,
  status,
}: RecentInvoiceItemProps) {
  // Split invoice number if it's a long ID, e.g., "928883-3838"
  const invoiceParts = id.split("-");

  return (
    <div className="flex justify-between items-center p-4 rounded-2xl bg-white hover:shadow-sm transition">
      {/* === Left Section: Invoice ID === */}
      <div className="flex flex-col justify-center min-w-[111px] h-[50px]">
        <span className="text-[#373B47] text-[14px] font-medium leading-[20px]">
          Invoice -
        </span>
        <span className="text-[#373B47] text-[14px] font-medium leading-[25px]">
          {invoiceParts.join(" - ")}
        </span>
      </div>

      {/* === Middle Section: Due Date === */}
      <div className="flex flex-col px-4 gap-1">
        <span className="uppercase text-[10px] tracking-[0.08em] text-[#666F77]">
          Due date
        </span>
        <span className="text-[14px] font-semibold leading-[20px] text-[#697598]">
          {dueDate}
        </span>
      </div>

      {/* === Right Section: Amount + Status === */}
      <div className="flex flex-col items-end">
        <span className="text-lg font-semibold text-gray-900">{amount}</span>
        <span
          className={clsx(
            "mt-1 px-3 py-1 rounded-full text-xs font-medium border",
            {
              "bg-green-100 text-green-600 border-green-300/30":
                status === "PAID",

              "bg-[#FFF4F5] text-red-600 border-[rgba(255,86,99,0.2)]":
                status === "OVERDUE",

              "bg-gray-100 text-gray-500 border-gray-300/30":
                status === "DRAFT",

              "bg-yellow-100 text-yellow-600 border-yellow-300/30":
                status === "UNPAID",
            }
          )}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
