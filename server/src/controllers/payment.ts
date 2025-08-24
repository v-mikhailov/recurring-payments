import { Router } from 'express';
import { paymentShema } from '../shemas/payment.shema';
import { validate } from '../middlewares/validate';
import { PaymentModel } from '../models/payment';

export const paymentRouter = Router();

// type UpdatePaymentPayload = {
//   title?: string;
//   amount?: {
//     value?: number;
//     currency?: 'USD' | 'EUR' | 'RUB' | 'GBP' | 'ILS';
//     frequency?: 'day' | 'week' | 'month' | 'year';
//   };
//   paymentDate?: string | Date;
//   notes?: string | null;
// };

// get all payments
paymentRouter.get('/', async (_req, res) => {
  try {
    const payments = await PaymentModel.find({});
    res.status(200).json({
      payments,
      count: payments.length,
    })
  } catch (error) { 
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// get payment by id
paymentRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await PaymentModel.findById(id);
    if (payment) {
      res.status(200).json({payment})
    }

  } catch (error) { 
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// delete payment
paymentRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await PaymentModel.findByIdAndDelete(id);
    if (payment) {
      res.status(200).json({message: 'Payment deleted successfully'})
    } else {
      res.status(404).json({error: 'Payment not found'})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

// TODO update payment
// paymentRouter.patch('/:id', async (req, res) => {
// });

// post payment
paymentRouter.post('/', validate(paymentShema), async (req, res) => {
  try {
    const {title, amount, paymentDate, notes } = req.body;
    const processedNotes = notes && notes.trim() !== '' ? notes.trim() : undefined;
    // добавить usedID потом
    const payment = new PaymentModel({
      title,
      amount,
      paymentDate, 
      notes: processedNotes
    })
    const newPayment = await payment.save();
    res.status(201).json({
      payment: {
        id: newPayment._id,
        title: newPayment.title,
        amount: newPayment.amount,
        paymentDate: newPayment.paymentDate,
        notes: newPayment.notes,
      }
    })
  } catch (error) { 
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})
