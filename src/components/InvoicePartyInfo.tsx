import type { Invoice } from "../types/invoice";

interface InvoicePartyInfoProps {
  invoice: Invoice;
}

export default function InvoicePartyInfo({ invoice }: InvoicePartyInfoProps) {
  const {
    senderName,
    senderPhone,
    senderAddress,
    senderEmail,
    senderLogo,
    customerName,
    customerPhone,
    customerAddress,
    customerEmail,
    customerLogo,
    invoiceNumber,
    issueDate,
    dueDate,
    billingCurrency,
  } = invoice;

  return (
    <div className="flex flex-col gap-10 p-8 w-[686px] h-[291px] bg-[#FCDDEC] rounded-[40px]">
      {/* Top row: Sender & Customer */}
      <div className="flex flex-row justify-between gap-10">
        {/* Sender */}
        <div className="flex flex-row gap-4 w-[298px]">
          {senderLogo && (
            <div className="flex justify-center items-center w-[60px] h-[60px] bg-white rounded-[16px]">
              <img
                src={senderLogo}
                alt="Sender Logo"
                className="w-[42px] h-[26.44px]"
              />
            </div>
          )}

          {/* Sender Info */}
          <div className="flex flex-col gap-1">
            <span className="text-[#697598] font-medium text-[12px] leading-[15px] uppercase tracking-[0.07em]">
              Sender
            </span>
            <span className="text-black font-medium text-[16px] leading-[20px]">
              {senderName}
            </span>
            <span className="text-[#697598] font-normal text-[12px] leading-[15px]">
              {senderPhone}
            </span>
            <span className="text-[#697598] font-normal text-[12px] leading-[160%]">
              {senderAddress}
            </span>
            <span className="text-[#697598] font-normal text-[12px] leading-[160%]">
              {senderEmail}
            </span>
          </div>
        </div>

        {/* Customer */}
        <div className="flex flex-row gap-4 w-[298px]">
          {customerLogo && (
            <div className="flex justify-center items-center w-[60px] h-[60px] bg-white rounded-[16px]">
              <img
                src={customerLogo}
                alt="Customer Logo"
                className="w-[54px] h-[34px]"
              />
            </div>
          )}

          {/* Customer Info */}
          <div className="flex flex-col gap-1">
            <span className="text-[#697598] font-medium text-[12px] leading-[15px] uppercase tracking-[0.07em]">
              Customer
            </span>
            <span className="text-black font-medium text-[16px] leading-[20px]">
              {customerName}
            </span>
            <span className="text-[#697598] font-normal text-[12px] leading-[15px]">
              {customerPhone}
            </span>
            <span className="text-[#697598] font-normal text-[12px] leading-[160%]">
              {customerAddress}
            </span>
            <span className="text-[#697598] font-normal text-[12px] leading-[160%]">
              {customerEmail}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom row: Invoice details */}
      <div className="flex flex-col gap-2">
        {/* Heading */}
        <span
          className="text-[#697598] font-bold text-[12px] mb-4 leading-[15px] uppercase tracking-[0.07em]"
          style={{ width: 116, height: 15 }}
        >
          Invoice Details
        </span>

        {/* Details row */}
        <div className="flex flex-row justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[#697598] font-medium text-[12px] leading-[15px] uppercase">
              Invoice No
            </span>
            <span className="text-black font-medium text-[14px] leading-[20px]">
              {invoiceNumber}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#697598] font-medium text-[12px] leading-[15px] uppercase">
              Issue Date
            </span>
            <span className="text-black font-medium text-[14px] leading-[20px]">
              {issueDate}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#697598] font-medium text-[12px] leading-[15px] uppercase">
              Due Date
            </span>
            <span className="text-black font-medium text-[14px] leading-[20px]">
              {dueDate}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#697598] font-medium text-[12px] leading-[15px] uppercase">
              Billing Currency
            </span>
            <span className="text-black font-medium text-[14px] leading-[20px]">
              {billingCurrency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
