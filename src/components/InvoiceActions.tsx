import { SettingsIcon } from "../assets/icons/SettingsIcon";
import ActionCard from "./ActionCard";
import { UsersIcon } from "../assets/icons/UsersIcon";
import MoneyIcon from "../assets/icons/money-stack.png";

export default function InvoiceActions() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1080px]">
      {/* Header with Border line */}
      <div className="flex items-center gap-10">
        <h2 className="text-[20px] font-semibold text-[#1F1F23]">
          Invoice Actions
        </h2>

        <div className="border-t border-white flex-grow max-w-[895px]"></div>
      </div>

      {/* Cards Row */}
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6">
        <ActionCard
          variant="blue"
          icon={MoneyIcon}
          title="Create New Invoice"
          description="Create new invoices easily"
          onClick={() => console.log("Create New Invoice clicked")}
        />

        <ActionCard
          variant="white"
          icon={SettingsIcon}
          title="Change Invoice Settings"
          description="Customize your invoices"
          onClick={() => console.log("Invoice Settings clicked")}
        />

        <ActionCard
          variant="white"
          icon={UsersIcon}
          title="Manage Customer List"
          description="Add and remove customers"
          onClick={() => console.log("Manage Customers clicked")}
        />
      </div>
    </div>
  );
}
