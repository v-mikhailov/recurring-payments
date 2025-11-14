import { usePaymentContext } from '../../providers/usePaymentContext';
import { Ellipsis } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditPaymentModal } from './EditPaymentModal';

export const PaymentsTable = () => {
  const {payments, deletePayment, loading} = usePaymentContext();
  if (loading) {
   return <div>loading...</div>
  }

  const onDeleteClick = async (paymentId: string) => {
    try {
      await deletePayment(paymentId);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  }

  return (
    <div>
      <div className='shadow-sm bg-white p-6 rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead></TableHead>
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
                      <DropdownMenuTrigger asChild><Button variant='ghost'><Ellipsis/></Button></DropdownMenuTrigger>
                      <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <EditPaymentModal
                                payment={payment}
                                trigger={<span className="inline-block w-full">Edit</span>}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDeleteClick(payment.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell>2500 USD</TableCell>
            </TableRow>
        </TableFooter>
        </Table>
      </div>
      <div className="mt-7 shadow-lg rounded-lg"><Button className='w-full p-4.5 bg-white' variant="outline">Load more</Button></div>
    </div>
  );
}