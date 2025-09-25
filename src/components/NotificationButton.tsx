import { useEffect, useState } from "react";
import {
  onInvoiceCreated,
  offInvoiceCreated,
} from "../lib/socket-client/socket"; // adjust path
import type { BackendInvoice } from "../types/invoice";

export default function NotificationButton() {
  const [count, setCount] = useState(0);

  // Helper: count upcoming reminders
  const calculateReminders = (invoices: BackendInvoice[]) => {
    const now = new Date();
    return invoices.filter((inv) => {
      if (!inv.dueDate) return false;
      const due = new Date(inv.dueDate);
      return due > now; // upcoming
    }).length;
  };

  useEffect(() => {
    // Initial fetch
    fetch("http://localhost:4000/invoices")
      .then((res) => res.json())
      .then((data: BackendInvoice[]) => {
        const reminders = calculateReminders(data);
        setCount(reminders);
      })
      .catch((err) =>
        console.error("Failed to fetch invoices for reminders:", err)
      );

    // Listen for new invoices
    const handleNewInvoice = (inv: BackendInvoice) => {
      setCount((prev) => {
        const now = new Date();
        if (inv.dueDate && new Date(inv.dueDate) > now) {
          return prev + 1;
        }
        return prev;
      });
    };

    onInvoiceCreated(handleNewInvoice);
    return () => offInvoiceCreated(handleNewInvoice);
  }, []);

  return (
    <button
      type="button"
      className="relative flex items-center justify-center w-16 h-16 bg-white rounded-full hover:bg-gray-50 transition-colors"
    >
      {/* Bell icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-text-dark"
      >
        <path
          d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-40"
        />
        <path
          d="M18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.93 6 11V16L4 18V19H20V18L18 16Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Badge */}
      {count > 0 && (
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}
