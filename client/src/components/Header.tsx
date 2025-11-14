import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PaymentForm } from "@/components/forms/PaymentForm";

import { usePaymentContext } from '@/providers/usePaymentContext';
import type { PaymentData } from '@/types/payment';


export const Header = () => {
   const {createPayment, loading, error} = usePaymentContext();

  const handleSubmit = async (formData: PaymentData) => {
    try {
      await createPayment(formData);
 
    } catch (err) {
      console.error('Failed to create payment:', err);
    }

  }

  return (
    <header className="flex justify-between items-center p-4 shadow-sm bg-white rounded-lg">
      <div>
        <span>Header </span>
      </div>
      <div className="flex items-center gap-x-[20px]">
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">+ Add New Payment</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
              <DialogDescription>
                Use this form to add a new recurring payment or update an existing one. Fill in all the required details to accurately track your expenses.
              </DialogDescription>
            </DialogHeader>
              <PaymentForm onSubmit={handleSubmit}/>
          </DialogContent>
        </Dialog>
        <span> Logout</span>
      </div>

    </header>
  );
}