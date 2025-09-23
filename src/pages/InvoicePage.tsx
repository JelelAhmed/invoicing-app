import DashboardLayout from "../layouts/DashboardLayout";
import InvoiceToolbar from "../components/InvoiceToolbar";
import InvoiceStats from "../components/InvoiceStats";
import InvoiceActions from "../components/InvoiceActions";

export default function InvoicePage() {
  return (
    <DashboardLayout title="Invoice">
      {/* Toolbar */}
      <div className="mt-10">
        <InvoiceToolbar />
      </div>

      {/* Stats block */}
      <div className="mt-10">
        <InvoiceStats />
      </div>

      {/* New Invoice Actions block */}
      <div className="mt-10">
        <InvoiceActions />
        {/* <RecentInvoices />
        <RecentActivities /> */}
      </div>
    </DashboardLayout>
  );
}
