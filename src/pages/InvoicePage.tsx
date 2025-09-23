import DashboardLayout from "../layouts/DashboardLayout";
import InvoiceToolbar from "../components/InvoiceToolbar";
import InvoiceStats from "../components/InvoiceStats";
import InvoiceActions from "../components/InvoiceActions";
import InvoiceOverview from "../components/InvoiceOverview";

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

      {/* Invoice Actions */}
      <div className="mt-10">
        <InvoiceActions />
      </div>

      {/* Overview Section*/}
      <div className="mt-6">
        <InvoiceOverview />
      </div>
    </DashboardLayout>
  );
}
