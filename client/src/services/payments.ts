import {api} from './api';

import type { PaymentResponse, DeletePaymentResponse } from '../types/api';
import type { Payment, PaymentData } from '../types/payment';


export const paymentService = {
  // добавить пагинацию
  getPayments: (): Promise<PaymentResponse> => {
    return api.get('/payments');
  },
 createPayment: (paymentData: PaymentData): Promise<Payment> => {
    return api.post('/payments', paymentData);
  },
  deletePayment: (paymentId: string): Promise<DeletePaymentResponse> =>  {
    return api.delete(`/payments/${paymentId}`)
  },
  updatePayment: (paymentData: Payment): Promise<Payment> => {
    return api.patch(`/payments/${paymentData.id}`, paymentData);
  }
}