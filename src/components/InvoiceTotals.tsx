interface InvoiceTotalsProps {
  subtotal: number;
  discount: number;
  totalDue: number;
}

export default function InvoiceTotals({
  subtotal,
  discount,
  totalDue,
}: InvoiceTotalsProps) {
  return (
    <div className="flex flex-col items-end gap-2 w-full mt-6">
      {/* Subtotal */}
      <div className="flex justify-between w-full max-w-[300px]">
        <span className="text-gray-500 font-medium text-[14px] leading-[20px]">
          Subtotal
        </span>
        <span className="text-black font-medium text-[14px] leading-[20px]">
          ${subtotal.toLocaleString()}
        </span>
      </div>

      {/* Discount */}
      <div className="flex justify-between w-full max-w-[300px]">
        <span className="text-gray-500 font-medium text-[14px] leading-[20px]">
          Discount ({((discount / subtotal) * 100).toFixed(1)}%)
        </span>
        <span className="text-black font-medium text-[14px] leading-[20px]">
          ${discount.toLocaleString()}
        </span>
      </div>

      {/* Total Amount Due */}
      <div className="flex justify-between w-full max-w-[300px] font-semibold text-[16px] leading-[24px] mt-2">
        <span>Total Amount Due</span>
        <span>${totalDue.toLocaleString()}</span>
      </div>
    </div>
  );
}
