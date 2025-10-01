export const CURRENCIES = ['USD', 'EUR', 'RUB', 'GBP', 'ILS'] as const;
export const FREQUENCIES = ['month', 'week', 'day', 'year'] as const;

export type Currency = typeof CURRENCIES[number];
export type Frequency = typeof FREQUENCIES[number];

export interface Payment {
  id: string;
  title: string;
  amount: {
    value: number;
    currency: Currency;
    frequency: Frequency;
  },
  paymentDate?: Date;
  notes?: string;
}

export type NewPayment = Omit<Payment, 'id'>;