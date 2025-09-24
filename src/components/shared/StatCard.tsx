import { formatCurrency } from "../../utils/formatCurrency";
import { statusColors } from "../../utils/statusColors";

interface StatCardProps {
  label: string;
  status: "PAID" | "OVERDUE" | "DRAFT" | "PENDING" | "PARTIAL";
  count: number | string;
  amount: number;
  icon: React.ReactNode;
}

export default function StatCard({
  label,
  status,
  count,
  amount,
  icon,
}: StatCardProps) {
  const { integer, decimal } = formatCurrency(amount);
  const backgroundColor = statusColors[status] || "#E5E7EB";

  return (
    <div className="flex flex-col items-start bg-white rounded-3xl px-10 py-8 gap-4 isolate w-[246px] h-[204px]">
      <div className="w-10 h-10 text-[#292D32]">{icon}</div>

      <div className="flex items-center gap-2">
        <span className="uppercase text-xs tracking-[0.08em] text-[#697598]">
          {label}
        </span>
        <span
          className="rounded-full px-4 py-2 text-sm font-medium text-[#373B47]"
          style={{ backgroundColor }}
        >
          {count}
        </span>
      </div>

      <div className="flex items-baseline gap-[2px]">
        <span
          className="font-[600] text-[28px] leading-[35px] text-[#1F1F23] tabular-nums"
          style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
        >
          {integer}
          <span
            className="text-[18px] leading-[24px]"
            style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
          >
            .{decimal}
          </span>
        </span>
      </div>
    </div>
  );
}
