import { createContext } from 'react';
import { usePayments } from '../../hooks/usePayments';

type PaymentsContextType = ReturnType<typeof usePayments>;



export const PaymentsContext = createContext<PaymentsContextType | undefined>(undefined);