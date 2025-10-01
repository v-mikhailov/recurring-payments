import type { Payment } from "./payment"

export interface PaymentResponse {
  payments: Payment[];
  count: number;
}