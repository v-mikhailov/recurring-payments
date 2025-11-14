export const CURRENCIES = ['USD', 'EUR', 'RUB', 'GBP', 'ILS'] as const;
export const FREQUENCIES = ['month', 'week', 'day', 'year'] as const;

export type Currency = typeof CURRENCIES[number];
export type Frequency = typeof FREQUENCIES[number];

export interface PaymentData {
  title: string;
  amount: {
    value: number;
    currency: Currency;
    frequency: Frequency;
  };
  paymentDate?: Date;
  notes?: string;
}

export interface Payment extends PaymentData {
  id: string;
}
export interface PaymentFormData {
  title: string;
  amount: number;
  currency: Currency;
  frequency: Frequency;
  paymentDate: string;
  notes: string;
}

export type CreatePaymentRequest = PaymentData;
export type UpdatePaymentRequest = Partial<PaymentData>;