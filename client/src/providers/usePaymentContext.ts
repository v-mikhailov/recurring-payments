import { useContext } from 'react';
import { PaymentsContext } from './PaymentContext';

export const usePaymentContext = () => {
  const context = useContext(PaymentsContext);
  if (!context) throw new Error('usePaymentsContext must be used within PaymentsProvider');
  return context;
}