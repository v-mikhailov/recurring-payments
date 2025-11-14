import { createContext } from 'react';
import type { Payment, PaymentData } from '../types/payment';

interface PaymentsContextType {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  createPayment: (data: PaymentData) => Promise<void>;
  loadPayments: () => Promise<void>;
  deletePayment: (paymentId: string) => Promise<void>;
}

export const PaymentsContext = createContext<PaymentsContextType | undefined>(undefined);