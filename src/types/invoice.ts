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
  group?: string; // for RecentInvoice grouping
}
