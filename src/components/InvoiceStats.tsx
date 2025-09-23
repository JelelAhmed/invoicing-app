import { OverviewIcon } from "../assets/icons/OveviewIcon";

interface StatCardProps {
  label: string;
  count: number | string;
  amount: string; // e.g. "$4,120,102."
  suffix?: string; // e.g. "76"
  color: string; // number pill background
  icon: React.ReactNode;
}

function StatCard({
  label,
  count,
  amount,
  suffix,
  color,
  icon,
}: StatCardProps) {
  // Split the amount into integer and decimal parts
  // Example: "$4,120,102." => ["$4,120,102", ""]
  const [integerPart, decimalPart] = amount.split(".");

  return (
    <div className="flex flex-col items-start bg-white rounded-3xl px-10 py-8 gap-4 isolate w-[246px] h-[204px]">
      <div className="w-10 h-10 text-[#292D32]">{icon}</div>

      <div className="flex items-center gap-2">
        <span className="uppercase text-xs tracking-[0.08em] text-[#697598]">
          {label}
        </span>
        <span
          className="rounded-full px-4 py-2 text-sm font-medium text-[#373B47]"
          style={{ backgroundColor: color }}
        >
          {count}
        </span>
      </div>

      <div className="flex items-baseline gap-[2px] w-[122px] h-[35px]">
        <span
          className="font-[600] text-[28px] leading-[35px] text-[#1F1F23] tabular-nums"
          style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
        >
          {integerPart}
          {decimalPart !== undefined && (
            <span
              className="text-[28px] leading-[35px]"
              style={{ fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif" }}
            >
              .{decimalPart}
            </span>
          )}
        </span>
        {suffix && (
          <span className="text-[14px] leading-[17px] font-medium text-[#697598] tabular-nums">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export default function InvoiceStats() {
  return (
    <div className="mt-10 flex flex-wrap gap-8 max-w-[1080px]">
      <StatCard
        label="total paid"
        count="1,289"
        amount="$4,120,102."
        suffix="76"
        color="#B6FDD3"
        icon={<OverviewIcon className="w-10 h-10 text-[#292D32]" />}
      />
      <StatCard
        label="total overdue"
        count="13"
        amount="$2,800,331."
        suffix="54"
        color="#FFB7BD"
        icon={<OverviewIcon className="w-10 h-10 text-[#292D32]" />}
      />
      <StatCard
        label="total draft"
        count="08"
        amount="$1,120,229."
        suffix="12"
        color="#D9D9E0"
        icon={<OverviewIcon className="w-10 h-10 text-[#292D32]" />}
      />
      <StatCard
        label="total unpaid"
        count="120"
        amount="$400,882."
        suffix="08"
        color="#F8E39B"
        icon={<OverviewIcon className="w-10 h-10 text-[#292D32]" />}
      />
    </div>
  );
}
