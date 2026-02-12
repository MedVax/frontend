import { ServerResponse } from "./global";
import { Product } from "./product";
import { User } from "./user";

export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  PROCESSING = "PROCESSING",
  READY_FOR_DISPATCH = "READY_FOR_DISPATCH",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
  FAILED_PAYMENT = "FAILED_PAYMENT",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
}

export enum PrescriptionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum OrderRecurringFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

export interface Address {
  id: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode?: string | null;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number; // price at time of order in minor currency units
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  id: string;
  orderId?: string | null;
  userId: string;
  fileUrl: string;
  status: PrescriptionStatus;
  notes?: string | null;
  patientName?: string | null;
  patientLocation?: string | null;
  patientEmail?: string | null;
  patientPhone?: string | null;
  additionalNote?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId?: string | null;
  user?: User | null;
  deliveryAddressId?: string | null;
  deliveryAddress?: Address | null;
  // Guest information for anonymous orders
  guestFirstName?: string | null;
  guestLastName?: string | null;
  guestEmail?: string | null;
  guestPhone?: string | null;
  // Guest address for anonymous orders
  guestAddressLine1?: string | null;
  guestAddressLine2?: string | null;
  guestCity?: string | null;
  guestState?: string | null;
  guestPostalCode?: string | null;
  guestCountry?: string | null;
  totalAmount: number; // in minor currency units
  deliveryFee: number; // in minor currency units
  currency: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  prescriptionStatus?: PrescriptionStatus | null;
  paymentReference?: string | null;
  paymentUrl?: string | null;
  paymentProvider?: string | null;
  notes?: string | null;
  isRecurring: boolean;
  recurringFrequency?: OrderRecurringFrequency | null;
  recurringDate?: string | null;
  nextRunDate?: string | null;
  paymentRetryCount: number;
  isRecurringActive: boolean;
  items: OrderItem[];
  prescriptions?: Prescription[];
  createdAt: string;
  updatedAt: string;
}

export type OrderResponse = ServerResponse<Order>;
export type OrdersResponse = ServerResponse<Order[]>;

export type CreateOrderResponse = ServerResponse<Order>;

