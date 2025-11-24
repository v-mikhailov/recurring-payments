import {api} from './api';

import type { PaymentResponse, DeletePaymentResponse } from '../types/api';
import type { Payment, PaymentData } from '../types/payment';


export const paymentService = {
  getPayments: (): Promise<PaymentResponse> => {
    return api.get<PaymentResponse>('/payments');
  },
 createPayment: (paymentData: PaymentData): Promise<Payment> => {
    return api.post<Payment, PaymentData>('/payments', paymentData);
  },
  deletePayment: (paymentId: string): Promise<DeletePaymentResponse> =>  {
    return api.delete<DeletePaymentResponse>(`/payments/${paymentId}`)
  },
  updatePayment: (paymentData: Payment): Promise<Payment> => {
    return api.patch<Payment, Payment>(`/payments/${paymentData.id}`, paymentData);
  }
}