import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/supabaseClient";
import type { Invoice, InvoiceItem, PaymentInfo } from "../types/invoice";
import Button from "./ui/Button";

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (invoice: Invoice) => Promise<void>;
}

export default function CreateInvoiceModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateInvoiceModalProps) {
  // ======== Form state ========
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [senderEmail, setSenderEmail] = useState("info@fabulousenterprise.co");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  // const [invoiceNumber, setInvoiceNumber] = useState(
  //   `INV-${Math.floor(Math.random() * 1000000)}`
  // );
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [dueDate, setDueDate] = useState("");
  const [billingCurrency, setBillingCurrency] = useState("USD");
  const [paymentStatus, setPaymentStatus] = useState<
    "DRAFT" | "PAID" | "PARTIAL" | "OVERDUE"
  >("DRAFT");
  const [reminders, setReminders] = useState({
    "14days": false,
    "7days": false,
    "3days": false,
    "24hrs": false,
    dueDate: false,
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { name: "", quantity: 1, price: 0, total: 0 },
  ]);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    accountName: "",
    accountNumber: "",
    achRoutingNo: "",
    bankName: "",
    bankAddress: "",
  });
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // ======== Prefill sender with Supabase user ========
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      if (data?.user) {
        setSenderEmail(data.user.email ?? "");
        setSenderName(data.user.user_metadata?.display_name ?? "");
        setSenderPhone(data.user.user_metadata?.phone ?? "");
      }
    };

    if (isOpen) fetchUser();
  }, [isOpen]);

  // ======== Handlers ========
  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: any
  ) => {
    const newItems = [...items];
    newItems[index][field] = field === "name" ? value : Number(value);
    newItems[index].total = newItems[index].quantity * newItems[index].price;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, i) => sum + i.total, 0);
  const totalDue = subtotal - discount;

  const handleSubmit = async () => {
    const invoice: Invoice = {
      senderName,
      senderPhone,
      senderAddress,
      senderEmail,
      customerName,
      customerPhone,
      customerAddress,
      customerEmail,
      // invoiceNumber,
      issueDate,
      dueDate,
      billingCurrency,
      items,
      subtotal,
      discount,
      totalDue,
      status: paymentStatus,
      paymentInfo,
      reminders,
      activities: [],
      notes,
    };

    setLoading(true);
    try {
      await onSubmit(invoice);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start bg-black/50 overflow-auto pt-20">
      <div className="bg-content-bg rounded-3xl w-[900px] max-h-[90vh] overflow-auto p-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-text-dark">
          Create New Invoice
        </h2>

        {/* Sender & Customer */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-text-dark">Sender</h3>
            <input
              type="text"
              placeholder="Sender Name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-text-dark placeholder:text-muted bg-white"
            />
            <input
              type="text"
              placeholder="Phone"
              value={senderPhone}
              onChange={(e) => setSenderPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-text-dark placeholder:text-muted bg-white"
            />
            <input
              type="text"
              placeholder="Address"
              value={senderAddress}
              onChange={(e) => setSenderAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-text-dark placeholder:text-muted bg-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-text-dark placeholder:text-muted bg-white"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-text-dark">Customer</h3>
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-text-dark placeholder:text-muted bg-white"
            />
            <input
              type="text"
              placeholder="Phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-text-dark placeholder:text-muted bg-white"
            />
            <input
              type="text"
              placeholder="Address"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-text-dark placeholder:text-muted bg-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-text-dark placeholder:text-muted bg-white"
            />
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {/* <input
            type="text"
            placeholder="Invoice Number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="input-field bg-white border-gray-300 text-text-dark placeholder:text-muted col-span-1"
          /> */}
          <input
            type="date"
            placeholder="Issue Date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="input-field bg-white border-gray-300 text-text-dark"
          />
          <input
            type="date"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="input-field bg-white border-gray-300 text-text-dark"
          />
          <select
            value={billingCurrency}
            onChange={(e) => setBillingCurrency(e.target.value)}
            className="input-field bg-white border-gray-300 text-text-dark"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        {/* Payment Status */}
        <div className="mb-6">
          <label className="font-medium text-text-dark mr-3">
            Payment Status:
          </label>
          <select
            value={paymentStatus}
            onChange={(e) =>
              setPaymentStatus(
                e.target.value as "DRAFT" | "PAID" | "PARTIAL" | "OVERDUE"
              )
            }
            className="input-field w-48 bg-white border-gray-300 text-text-dark"
          >
            <option value="DRAFT">Draft</option>
            <option value="PAID">Paid</option>
            <option value="PARTIAL">Partial</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>

        {/* Reminders */}
        <div className="mb-6">
          <label className="font-medium text-text-dark mb-2 block">
            Reminders:
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              ["14days", "14 days before due date"],
              ["7days", "7 days before due date"],
              ["3days", "3 days before due date"],
              ["24hrs", "24 hrs before due date"],
              ["dueDate", "On the due date"],
            ].map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-2 text-text-dark"
              >
                <input
                  type="checkbox"
                  checked={reminders[key as keyof typeof reminders]}
                  onChange={() =>
                    setReminders((prev) => ({
                      ...prev,
                      [key]: !prev[key as keyof typeof reminders],
                    }))
                  }
                  className="accent-primary"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-text-dark">Items</h3>
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row gap-2 mb-3 items-start md:items-end bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                className="input-field flex-1 bg-white border border-gray-300 rounded-lg p-2 text-text-dark placeholder:text-muted"
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(idx, "quantity", e.target.value)
                }
                className="input-field w-20 bg-white border border-gray-300 rounded-lg p-2 text-text-dark placeholder:text-muted"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                className="input-field w-28 bg-white border border-gray-300 rounded-lg p-2 text-text-dark placeholder:text-muted"
              />
              <span className="w-28 font-medium text-text-dark">
                ${item.total.toLocaleString()}
              </span>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="text-danger hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <Button variant="outlined" size="sm" onClick={addItem}>
            + Add Item
          </Button>
        </div>

        {/* Discounts & Notes */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <input
            type="number"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="input-field bg-white border-gray-300 text-text-dark placeholder:text-muted"
          />
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field h-24 bg-white border-gray-300 text-text-dark placeholder:text-muted"
          />
        </div>

        {/* Payment Info */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            placeholder="Account Name"
            value={paymentInfo.accountName}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, accountName: e.target.value })
            }
            className="input-field bg-white border-gray-300 text-text-dark placeholder:text-muted"
          />
          <input
            type="text"
            placeholder="Account Number"
            value={paymentInfo.accountNumber}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, accountNumber: e.target.value })
            }
            className="input-field bg-white border-gray-300 text-text-dark placeholder:text-muted"
          />
          <input
            type="text"
            placeholder="ACH Routing No"
            value={paymentInfo.achRoutingNo}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, achRoutingNo: e.target.value })
            }
            className="input-field bg-white border-gray-300 text-text-dark placeholder:text-muted"
          />
          <input
            type="text"
            placeholder="Bank Name"
            value={paymentInfo.bankName}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, bankName: e.target.value })
            }
            className="input-field bg-white border-gray-300 text-text-dark placeholder:text-muted"
          />
          <input
            type="text"
            placeholder="Bank Address"
            value={paymentInfo.bankAddress}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, bankAddress: e.target.value })
            }
            className="input-field col-span-2 bg-white border-gray-300 text-text-dark placeholder:text-muted"
          />
        </div>

        {/* Totals */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-medium text-text-dark">
            Subtotal: ${subtotal.toLocaleString()}
          </span>
          <span className="font-medium text-text-dark">
            Discount: ${discount.toLocaleString()}
          </span>
          <span className="font-bold text-lg text-primary">
            Total Due: ${totalDue.toLocaleString()}
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="outlined" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Saving..." : "Save & Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}
