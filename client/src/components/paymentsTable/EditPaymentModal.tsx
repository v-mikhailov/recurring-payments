import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PaymentForm } from '@/components/forms/PaymentForm';
import type { Payment, PaymentData } from '@/types/payment';

interface EditPaymentDialogProps {
  payment: Payment;
  trigger: React.ReactNode;
}

export const EditPaymentModal = ({ payment, trigger }: EditPaymentDialogProps) => {
  const [open, setOpen] = useState(false);
  // const { updatePayment } = usePaymentContext();

  const handleUpdatePayment = async (data: PaymentData) => {
    console.log('Update payment with data:', data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full" onClick={() => setOpen(true)}>
        {trigger}
      </div>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit Payment</DialogTitle>
        </DialogHeader>
        <PaymentForm onSubmit={handleUpdatePayment} payment={payment} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};