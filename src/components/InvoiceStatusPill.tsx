import clsx from "clsx";
import type { InvoiceStatus } from "../types/invoice";

interface InvoiceStatusPillProps {
  status: InvoiceStatus;
}

export default function InvoiceStatusPill({ status }: InvoiceStatusPillProps) {
  const statusClasses = clsx(
    "flex items-center justify-center px-4 py-2 w-[135px] h-[36px] rounded-[24px] mt-4 border",
    {
      "bg-[#E6FFF0] text-[#2DB260] border-green-300/30": status === "PAID",
      "bg-[#FFF4F5] text-[#FF5663] border-[rgba(255,86,99,0.2)]":
        status === "OVERDUE",
      "bg-[#F4F5F6] text-[#697598] border-gray-300/30": status === "DRAFT",
      "bg-[#FFFAF0] text-[#B7791F] border-yellow-300/30": status === "UNPAID",
    }
  );

  return (
    <div className={statusClasses}>
      <span className="text-[10px] font-medium leading-[16px] tracking-[0.06em] uppercase">
        {status}
      </span>
    </div>
  );
}
