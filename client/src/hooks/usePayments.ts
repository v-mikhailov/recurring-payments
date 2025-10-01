import { useState, useEffect, useCallback } from "react"
import { paymentService } from "../services/payments"
import { ApiError } from "../services/api"

import type { Payment, NewPayment } from "../types/payment"

interface UsePaymentsOptions {
  autoLoad?: boolean;
}

interface UsePaymentsProps {
  options?: UsePaymentsOptions
}


interface UsePaymentsReturn {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  createPayment: (data: NewPayment) => Promise<void>;
  loadPayments: () => Promise<void>;
}


export const usePayments = ({options}: UsePaymentsProps): UsePaymentsReturn => {
  const { autoLoad = false } = options ?? {}

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await paymentService.getPayments();
      if (response && response.payments) {
        setPayments(response.payments);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
      throw (err instanceof Error ? err : new Error('Failed to load payments'));
    } finally {
      setLoading(false);
    }
  }, []);

  const createPayment = useCallback(async (payment: NewPayment) => {
    setLoading(true);
    setError(null);

    try {
      const nextPayment = await paymentService.createPayment(payment);
      setPayments(prev => [...prev, nextPayment]);
    }
    catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to create payment');
      }
      throw (err instanceof Error ? err : new Error('Failed to load payments'));
    }
    finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    if (autoLoad) {
      loadPayments();
    }
  }, [autoLoad, loadPayments]);



  return {
    payments,
    loading,
    error,
    createPayment,
    loadPayments,
  }
}