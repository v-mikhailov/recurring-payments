import { createContext } from 'react';
import type { Payment, NewPayment } from '../types/payment';

interface PaymentsContextType {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  createPayment: (data: NewPayment) => Promise<void>;
  loadPayments: () => Promise<void>;
}

export const PaymentsContext = createContext<PaymentsContextType | undefined>(undefined);