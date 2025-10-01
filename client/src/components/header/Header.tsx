import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PaymentForm } from "../forms/paymentForm/paymentForm";

import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <span>Header </span>
      </div>
      <div className={styles['action-bttns']}>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline">+ Add New Payment</Button></DialogTrigger>
          <DialogContent className={styles['dialog-content']}>
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
              <DialogDescription>
                Use this form to add a new recurring payment or update an existing one. Fill in all the required details to accurately track your expenses.
              </DialogDescription>
            </DialogHeader>
              <PaymentForm />
          </DialogContent>
        </Dialog>
        <span> Logout</span>
      </div>

    </header>
  );
}