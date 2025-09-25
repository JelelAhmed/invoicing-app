import Button from "./ui/Button";
import InvoiceStatusPill from "./InvoiceStatusPill";
import type { InvoiceStatus } from "../types/invoice";

interface InvoiceModalHeaderProps {
  invoiceNumber: string;
  status: InvoiceStatus;
  onDownload?: () => void;
  onSend?: () => void;
  onMore?: () => void;
}

export default function InvoiceModalHeader({
  invoiceNumber,
  status,
  onDownload,
  onSend,
  onMore,
}: InvoiceModalHeaderProps) {
  return (
    <div className="flex justify-between items-start w-full gap-8">
      {/* Left side: Invoice info */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[32px] font-bold leading-[40px] text-[#1F1F23] whitespace-nowrap">
          Invoice - {invoiceNumber}
        </h2>
        <p className="text-[16px] font-normal leading-[20px] text-[#697598] whitespace-nowrap">
          View the details and activity of this invoice
        </p>
        <InvoiceStatusPill status={status} />

        {/* <div className="flex items-center px-4 py-2 gap-2 w-[135px] h-[36px] bg-[#F2FBFF] border border-[rgba(0,62,255,0.2)] rounded-[24px] mt-4">
          <span className="text-[10px] font-medium leading-[16px] tracking-[0.06em] uppercase text-[#003EFF]"></span>
        </div> */}
      </div>

      {/* Right side: Buttons */}
      <div className="flex items-center gap-6">
        <Button
          variant="outlined"
          size="md"
          className="w-[260px] h-[68px] text-[16px] font-medium text-[#003EFF] border-[#E3E6EF] rounded-[40px]"
          onClick={onDownload}
        >
          Download as PDF
        </Button>

        <Button
          variant="filled"
          size="md"
          className="w-[230px] h-[68px] text-[16px] font-medium text-white bg-[#003EFF] rounded-[40px]"
          onClick={onSend}
        >
          Send invoice
        </Button>

        <Button
          variant="outlined"
          size="md"
          className="w-[101px] h-[68px] text-[16px] font-medium text-[#373B47] border-[#E3E6EF] rounded-[40px]"
          onClick={onMore}
        >
          More
        </Button>
      </div>
    </div>
  );
}
