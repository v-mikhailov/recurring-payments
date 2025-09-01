
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

import styles from './paymentsTable.module.css'

const TABLE_MOCK = [
  {
    id: 1,
    title: 'Netflix Subscription',
    amount: 15.99,
    currency: 'USD',
    frequency: 'Monthly',
    nextDate: '2025-06-01',
    notes: 'Premium plan'
  },
  {
    id: 2,
    title: 'Rent Payment',
    amount: 1200.0,
    currency: 'EUR',
    frequency: 'Monthly',
    nextDate: '2025-06-05',
    notes: 'Apartment rent'
  },
  {
    id: 3,
    title: 'Gym Membership',
    amount: 40.0,
    currency: 'GBP',
    frequency: 'Monthly',
    nextDate: '2025-06-15',
    notes: null
  },
  {
    id: 4,
    title: 'Spotify Family',
    amount: 14.99,
    currency: 'USD',
    frequency: 'Monthly',
    nextDate: '2025-06-20',
    notes: null
  },
  {
    id: 5,
    title: 'Car Insurance',
    amount: 600.0,
    currency: 'AUD',
    frequency: 'Annually',
    nextDate: '2025-07-01',
    notes: 'Full coverage'
  }
]

export const PaymentsTable = () => {
  return (
    <div>
      <div className={styles.table}>
        <Table>
          <TableHeader>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Next Date</TableHead>
            <TableHead>Notes</TableHead>
          </TableHeader>
          <TableBody>
            {TABLE_MOCK.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.title}</TableCell>
                <TableCell className="font-medium">{`${payment.amount}/${payment.currency}`}</TableCell>
                <TableCell className="font-medium">{payment.frequency}</TableCell>
                <TableCell className="font-medium">{payment.nextDate}</TableCell>
                <TableCell className="font-medium">{payment.notes}</TableCell>
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