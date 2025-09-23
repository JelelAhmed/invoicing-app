interface RecentInvoiceDateGroupProps {
  label: string;
}

export default function RecentInvoiceDateGroup({
  label,
}: RecentInvoiceDateGroupProps) {
  return (
    <div className="flex items-center py-[10px] gap-[10px]">
      <span className="text-[12px] font-medium leading-[16px] tracking-[0.07em] uppercase text-[#1F1F23]">
        {label}
      </span>
    </div>
  );
}
