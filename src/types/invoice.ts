export type InvoiceStatus = "PAID" | "OVERDUE" | "DRAFT" | "UNPAID";

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
  description?: string;
}

export interface PaymentInfo {
  accountName: string;
  accountNumber: string;
  achRoutingNo: string;
  bankName: string;
  bankAddress: string;
}

export interface Activity {
  id: string;
  type: string;
  user: string;
  timestamp: string;
  description: string;
  amount?: number;
}

// Reminder object for the modal/component
export interface Reminder {
  label: string;
  active?: boolean;
}

export interface InvoiceReminders {
  "14days": boolean;
  "7days": boolean;
  "3days": boolean;
  "24hrs": boolean;
  dueDate: boolean;
}

export interface Invoice {
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  senderEmail: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerLogo?: string;
  senderLogo?: string;
  customerEmail: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  billingCurrency: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  totalDue: number;
  status: InvoiceStatus;
  paymentInfo: PaymentInfo;
  activities: Activity[];
  notes?: string;
  group?: string; // for RecentInvoice grouping
  reminders?: InvoiceReminders;
}

export interface BackendInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  dueDate: string;
  issueDate: string;
  totalDue: number;
  activities: Activity[];
  status: InvoiceStatus;
}
