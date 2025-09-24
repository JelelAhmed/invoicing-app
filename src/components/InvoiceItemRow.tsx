export interface InvoiceItem {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  total: number;
  status?: string;
}

interface InvoiceItemRowProps {
  item: InvoiceItem;
}

export default function InvoiceItemRow({ item }: InvoiceItemRowProps) {
  return (
    <div className="flex flex-row items-center gap-6 w-full bg-white">
      {/* Name & Description */}
      <div className="flex flex-col justify-center w-[252px] h-[68px]">
        <span className="text-black font-normal text-[16px] leading-[20px]">
          {item.name}
        </span>
        {item.description && (
          <span className="text-gray-600 font-normal text-[13px] leading-[16px]">
            {item.description}
          </span>
        )}
      </div>

      {/* Quantity */}
      <div className="flex justify-center items-center w-[75px] h-[68px] bg-white rounded-[16px]">
        <span className="text-black text-[16px] leading-[20px]">
          {item.quantity}
        </span>
      </div>

      {/* Price */}
      <div className="flex justify-center items-center w-[113px] h-[68px] bg-white rounded-[16px]">
        <span className="text-black text-[16px] leading-[20px]">
          ${item.price.toLocaleString()}
        </span>
      </div>

      {/* Total */}
      <div className="flex justify-center items-center w-[190px] h-[68px] bg-white rounded-[16px]">
        <span className="text-black text-[16px] leading-[20px]">
          ${item.total.toLocaleString()}
        </span>
      </div>

      {/* Optional Status Badge */}
      {item.status && (
        <div className="flex items-center justify-center px-3 py-1 bg-[#E6FFF0] rounded-[6px] text-green-700 text-xs font-medium">
          {item.status}
        </div>
      )}
    </div>
  );
}
