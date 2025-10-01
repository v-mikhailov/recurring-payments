import {useState} from 'react';
import clsx from 'clsx';

import { Button } from "@/components/ui/button";
import {CURRENCIES} from '../../../types/payment';
import {FREQUENCIES} from '../../../types/payment';
import { usePaymentContext } from '../../../providers/usePaymentContext';

import styles from './paymentForm.module.css';

interface PaymentFormData {
  title: string;
  amount: number;
  currency:  typeof CURRENCIES[number];
  frequency:  typeof FREQUENCIES[number];
  paymentDate: string;
  notes: string;
}

const INITIAL_STATE: PaymentFormData = {
  title: '',
  amount: 0,
  currency: CURRENCIES[0] || 'USD',
  frequency: FREQUENCIES[0] || 'month',
  paymentDate: new Date().toLocaleDateString('en-GB'),
  notes: ''
}

export const PaymentForm = () => {
  const {createPayment, loading, error} = usePaymentContext();

  const [formData, setFormData] = useState<PaymentFormData>(INITIAL_STATE);

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
      await createPayment({
        title: formData.title,
        amount: {
          value: formData.amount,
          currency: formData.currency,
          frequency: formData.frequency,
        },
        paymentDate: formData.paymentDate ? new Date(formData.paymentDate) : undefined,
        notes: formData.notes,
      });
     setFormData(INITIAL_STATE);
    } catch (err) {
      console.error('Failed to create payment:', err);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles['form-full-width']}>
        <label className={styles.label} htmlFor="title">Payment Title: </label>
        <input onChange={handleInputChange} className={styles.input} id="title" type="text"/>
      </div>

      <div>
        <label className={styles.label} htmlFor="amount">Amount: </label>
        <input onChange={handleInputChange} className={styles.input} id="amount" type="number"/>
      </div>

      <div>
        <label className={styles.label} htmlFor="currency">Currency: </label>
        <select onChange={handleInputChange} className={styles.input} id="currency">
          {
            CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))
          }
        </select>
      </div>

      <div>
        <label className={styles.label} htmlFor="frequency">Frequency: </label>
        <select onChange={handleInputChange} className={styles.input} id="frequency">
          {
            FREQUENCIES.map((frequency) => (
              <option key={frequency} value={frequency}>{frequency}</option>
            ))
          }
        </select>
      </div>

      <div>
        <label className={styles.label} htmlFor="next-payment-date">Next Payment Day: </label>
        <input onChange={handleInputChange} className={styles.input} id="paymentDate" type="date" defaultValue="2025-09-23"/>
      </div>

      <div className={styles['form-full-width']}>
        <label className={styles.label} htmlFor="notes">Notes: </label>
        <textarea onChange={handleInputChange} className={styles.textarea} id="notes"></textarea>
      </div>
      <div className={clsx(styles['form-full-width'], styles['btn-container'])}>
        <Button className={styles['submit-btn']}  type="submit">Save Payment</Button>
      </div>
     </form>
  )
}