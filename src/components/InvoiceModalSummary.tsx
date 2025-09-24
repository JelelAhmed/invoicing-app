import InvoicePartyInfo from "./InvoicePartyInfo";
import InvoiceItemRow from "./InvoiceItemRow";
import InvoiceTotals from "./InvoiceTotals";
import PaymentInfo from "./PaymentInfo";
import type { Invoice } from "../types/invoice";

interface InvoiceModalSummaryProps {
  invoice: Invoice;
}

export default function InvoiceModalSummary({
  invoice,
}: InvoiceModalSummaryProps) {
  const { items, subtotal, discount, totalDue, paymentInfo } = invoice;

  return (
    <div className="box-border flex flex-col justify-start items-start p-8 gap-6 w-[750px] h-[1199px] mx-auto bg-white border border-[#E3E6EF] rounded-[40px]">
      <InvoicePartyInfo invoice={invoice} />

      {/* Items Block */}
      <div className="flex flex-row items-center gap-[40px] w-[686px] h-[25px]">
        <span className="text-black font-medium text-[20px] leading-[25px]">
          Items
        </span>
        <div className="flex-grow border-t border-[#E3E6EF]" />
      </div>

      <div className="flex flex-col gap-3 mt-6 w-full">
        {items.map((item, idx) => (
          <InvoiceItemRow key={idx} item={item} />
        ))}
      </div>

      {/* Totals */}
      <InvoiceTotals
        subtotal={subtotal}
        discount={discount}
        totalDue={totalDue}
      />

      {/* Payment Info */}
      <PaymentInfo paymentInfo={paymentInfo} />

      {/* Note Block */}
      <div className="box-border flex flex-col items-start p-[16px_24px] gap-[8px] w-[686px] h-[99px] bg-[#F6F8FA] rounded-[24px]">
        <span className="text-black font-bold text-[14px] leading-[20px]">
          NOTE:
        </span>
        <p className="text-black font-normal text-[14px] leading-[20px]">
          Thank you for your patronage.
        </p>
      </div>
    </div>
  );
}
