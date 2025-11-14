import type { Payment } from "./payment"

export type DeletePaymentResponse = {message: string} | {error: string}

export interface PaymentResponse {
  payments: Payment[];
  count: number;
}

