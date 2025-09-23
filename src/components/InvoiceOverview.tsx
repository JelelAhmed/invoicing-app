import RecentInvoices from "./RecentInvoices";
import RecentActivities from "./RecentActivities";

export default function InvoiceOverview() {
  return (
    <div className="flex flex-row justify-between items-stretch gap-6 w-[1080px] h-[732px] mt-6">
      {/* Left Column - Recent Invoices */}
      <div className="flex-1 flex flex-col h-full">
        <RecentInvoices />
      </div>

      {/* Right Column - Recent Activities */}
      <div className="flex-1 flex flex-col h-full">
        <RecentActivities />
      </div>
    </div>
  );
}
