import { ChevronDown } from "lucide-react";

export default function ProfileBlock({ initials }: { initials: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-white rounded-[40px] w-[88px] h-[64px] gap-3">
      {/* Initials circle */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary">
        <span className="text-white font-bold text-[14px] leading-[18px] capitalize">
          {initials}
        </span>
      </div>

      {/* Dropdown chevron */}
      <ChevronDown className="w-4 h-4 text-[#697598]" />
    </div>
  );
}
