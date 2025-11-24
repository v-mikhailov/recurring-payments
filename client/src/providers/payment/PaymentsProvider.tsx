
import type { ReactNode } from 'react';
import { usePayments } from '../../hooks/usePayments';
import { PaymentsContext } from './PaymentContext';

interface PaymentsProviderProps {
  children: ReactNode;
}

export const PaymentProvider = ({ children }: PaymentsProviderProps) => {
  const paymentsData = usePayments({options: {autoLoad: true}});
  
  return (
    <PaymentsContext.Provider value={paymentsData}>
      {children}
    </PaymentsContext.Provider>
  );
}
