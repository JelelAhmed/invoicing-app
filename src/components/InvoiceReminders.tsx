import { ReminderPill } from "./ReminderPill";

export type Reminder = {
  label: string;
  active?: boolean;
};

interface InvoiceRemindersProps {
  reminders: Reminder[];
}

export default function InvoiceReminders({ reminders }: InvoiceRemindersProps) {
  return (
    <div
      className="inline-flex items-center p-6 border border-[#E3E6EF] rounded-[24px] box-border"
      style={{ height: "96px" }}
    >
      {/* Reminders Label */}
      <span className="text-[#666F77] font-normal text-[12px] leading-[16px] uppercase tracking-[0.07em]">
        Reminders
      </span>

      {/* Reminders Pills Row */}
      <div className="flex flex-row items-center gap-3 ml-6">
        {reminders.map((r, i) => (
          <ReminderPill key={i} label={r.label} active={r.active} />
        ))}
      </div>
    </div>
  );
}
