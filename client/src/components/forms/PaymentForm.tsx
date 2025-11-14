import {useState} from 'react';

import { Button } from "@/components/ui/button";
import {CURRENCIES, FREQUENCIES, type Payment, type PaymentFormData, type PaymentData} from '@/types/payment';

interface PaymentFormProps {
  payment?: Payment;
  onSuccess?: () => void;
  onSubmit: (data: PaymentData) => Promise<void>;
}

const INITIAL_STATE: PaymentFormData = {
  title: '',
  amount: 0,
  currency: CURRENCIES[0] || 'USD',
  frequency: FREQUENCIES[0] || 'month',
  paymentDate: new Date().toISOString().split('T')[0],
  notes: ''
}

const paymentToFormData = (payment: Payment): PaymentFormData => ({
  title: payment.title,
  amount: payment.amount.value,
  currency: payment.amount.currency,
  frequency: payment.amount.frequency,
  paymentDate: payment.paymentDate 
    ? new Date(payment.paymentDate).toISOString().split('T')[0] 
    : new Date().toISOString().split('T')[0],
  notes: payment.notes || ''
});

const formDataToPaymentData = (formData: PaymentFormData): PaymentData => ({
  title: formData.title,
  amount: {
    value: formData.amount,
    currency: formData.currency,
    frequency: formData.frequency,
  },
  paymentDate: formData.paymentDate ? new Date(formData.paymentDate) : undefined,
  notes: formData.notes || undefined,
});

export const PaymentForm = ({payment, onSuccess, onSubmit}: PaymentFormProps) => {
  const [formData, setFormData] = useState<PaymentFormData>(
    payment ? paymentToFormData(payment) : INITIAL_STATE
  );

  const handleInputChange = (e:  React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: id === 'amount' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const paymentData = formDataToPaymentData(formData);
      await onSubmit(paymentData);
      setFormData(INITIAL_STATE);
      onSuccess?.();
    } catch (err) {
      console.error('Failed to save payment:', err);
    }
  }

  return (
    <form className='grid grid-cols-2 gap-y-6 gap-x-4' onSubmit={handleSubmit}>
      <div className='col-span-full'>
        <label className='block mb-2 font-medium' htmlFor="title">Payment Title: </label>
        <input
          className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
          onChange={handleInputChange}
          id="title"
          type="text"
          value={formData.title}
        />
      </div>

      <div>
        <label className='block mb-2 font-medium' htmlFor="amount">Amount: </label>
        <input 
          className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
          onChange={handleInputChange}
          id="amount"
          type="number"
          min='1'
          value={formData.amount}
        />
      </div>

      <div>
        <label className='block mb-2 font-medium' htmlFor="currency">Currency: </label>
        <select  className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500" onChange={handleInputChange}  id="currency">
          {
            CURRENCIES.map((currency) => (
              <option key={currency} selected={currency === formData.currency } value={currency}>{currency}</option>
            ))
          }
        </select>
      </div>

      <div>
        <label className='block mb-2 font-medium' htmlFor="frequency">Frequency: </label>
        <select className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500" onChange={handleInputChange} id="frequency">
          {
            FREQUENCIES.map((frequency) => (
              <option key={frequency} value={frequency} selected={frequency === formData.frequency}>{frequency}</option>
            ))
          }
        </select>
      </div>

      <div>
        <label className='block mb-2 font-medium' htmlFor="next-payment-date">Next Payment Day: </label>
        <input 
          className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
          onChange={handleInputChange}
          id="paymentDate"
          type="date"
          defaultValue="2025-09-23"
          value={formData.paymentDate}
        />
      </div>

      <div className='col-span-full'>
        <label className='block mb-2 font-medium' htmlFor="notes">Notes: </label>
        <textarea
          className="w-full p-2.5 border border-gray-300 rounded-md text-sm min-h-[20px] focus:outline-none focus:border-blue-500"
          onChange={handleInputChange}
          id="notes"
          value={formData.notes}
        ></textarea>
      </div>
      <div className='col-span-full grid items-end'>
        <Button type="submit">Save Payment</Button>
      </div>
    </form>
  )
}