
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import MenuDots from '@/assets/menu-dots.svg?react';

import { usePaymentContext } from '../../providers/usePaymentContext';

import styles from './paymentsTable.module.css'


export const PaymentsTable = () => {
  const {payments, loading} = usePaymentContext();
  if (loading) {
   return <div>loading...</div>
  }

  return (
    <div>
      <div className={styles.table}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.title}</TableCell>
                <TableCell className="font-medium">{`${payment.amount.value} ${payment.amount.currency}`}</TableCell>
                <TableCell className="font-medium">{payment.amount.frequency}</TableCell>
                <TableCell className="font-medium">
                  {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString("en-GB") : ""}
                </TableCell>
                <TableCell className="font-medium">{payment.notes}</TableCell>
                <TableCell>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant='ghost'><MenuDots/></Button></DropdownMenuTrigger>
                      <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell>2500 USD</TableCell>
            </TableRow>
        </TableFooter>
        </Table>
      </div>
      <div className={styles['bttn-container']}><Button className={styles['load-more-bttn']} variant="outline">Load more</Button></div>
    </div>
  );
}