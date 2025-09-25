export type InvoiceItem = {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  description?: string;
};

export type PaymentInfo = {
  accountName: string;
  accountNumber: string;
  achRoutingNo: string;
  bankName: string;
  bankAddress: string;
};

export type Activity = {
  id?: string;
  type: string;
  user: string;
  timestamp: string;
  description: string;
  amount?: number;
};

type Reminders = {
  "14days": boolean;
  "7days": boolean;
  "3days": boolean;
  "24hrs": boolean;
  dueDate: boolean;
};

export type Invoice = {
  id?: string;
  status?: "PAID" | "DRAFT" | "OVERDUE" | "PENDING" | "PARTIAL";
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
  reminders: Reminders;
  discount: number;
  totalDue: number;
  paymentInfo: PaymentInfo;
  activities: Activity[];
};

export type Customer = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  logo?: string;
};

export type DB = {
  invoices: Invoice[];
  customers: Customer[];
};
