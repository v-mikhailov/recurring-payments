import {api} from './api';

import type { PaymentResponse } from '../types/api';
import type { Payment, NewPayment } from '../types/payment';


export const paymentService = {
  // добавить пагинацию
  getPayments: (): Promise<PaymentResponse> => {
    return api.get('/payments');
  },
 createPayment: (paymentData: NewPayment): Promise<Payment> => {
    return api.post('/payments', paymentData);
  }
}