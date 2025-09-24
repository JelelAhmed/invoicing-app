import { Check } from "lucide-react";

interface ReminderPillProps {
  label: string;
  active?: boolean;
}

export function ReminderPill({ label, active = false }: ReminderPillProps) {
  return (
    <div
      className={`
        flex flex-row items-center gap-2
        ${
          active
            ? "px-4 py-3 bg-[#E6FFF0]"
            : "px-4 py-4 bg-white border border-[#E3E6EF]"
        }
        rounded-[24px]
        relative
      `}
      style={{ minWidth: active ? "216px" : "174px", height: "48px" }}
    >
      <span
        className="text-[#373B47] font-medium text-[14px] leading-[17px] flex items-center"
        style={{ letterSpacing: "-0.433918px" }}
      >
        {label}
      </span>

      {active && <Check className="w-6 h-6 text-[#2DB260]" />}
    </div>
  );
}
