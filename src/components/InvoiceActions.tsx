"use client";

import { useState } from "react";
import { SettingsIcon } from "../assets/icons/SettingsIcon";
import ActionCard from "./ActionCard";
import { UsersIcon } from "../assets/icons/UsersIcon";
import MoneyIcon from "../assets/icons/money-stac.png";
import CreateInvoiceModal from "./CreateInvoiceModal";
import type { Invoice } from "../types/invoice";

export default function InvoiceActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setInvoices] = useState<Invoice[]>([]);

  const handleCreateInvoice = async (invoice: Invoice) => {
    try {
      const res = await fetch("http://localhost:4000/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
      });

      if (!res.ok) throw new Error("Failed to create invoice");

      const createdInvoice = await res.json();

      // Add the created invoice to state
      setInvoices((prev) => [createdInvoice, ...prev]);
      console.log("Invoice created:", createdInvoice);
    } catch (err) {
      console.error(err);
    }
  };

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
          onClick={() => setIsModalOpen(true)} // Open modal
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

      {/* Invoice Creation Modal */}
      <CreateInvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateInvoice}
      />
    </div>
  );
}
