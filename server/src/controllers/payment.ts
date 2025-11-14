import { Router } from 'express';
import { paymentShema } from '../shemas/payment.shema';
import { validateShema} from '../middlewares/validateShema';
import {authenticate} from '../middlewares/authenticate';
import { PaymentModel } from '../models/payment';

export const paymentRouter = Router();
paymentRouter.use(authenticate)

// get all payments
paymentRouter.get('/', async (req, res) => {
  try {
    const userId = req.user!.userId;
    const payments = await PaymentModel.find({userId});
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
    const userId = req.user!.userId;
    const payment = await PaymentModel.findOne({ _id: id, userId });

    if (!payment) {
      res.status(404).json({ error: 'Payment not found' });
      return;
    }

    res.status(200).json({ payment });
  } catch (error) { 
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// delete payment
paymentRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user!.userId;
    const payment = await PaymentModel.findOneAndDelete({ _id: id, userId });
       
    if (!payment) {
      res.status(404).json({ error: 'Payment not found' });
      return;
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

paymentRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user!.userId;
    const { title, amount, paymentDate, notes } = req.body;
    
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (amount !== undefined) updateData.amount = amount;
    if (paymentDate !== undefined) updateData.paymentDate = paymentDate;
    if (notes !== undefined) {
      updateData.notes = notes && notes.trim() !== '' ? notes.trim() : undefined;
    }

    const payment = await PaymentModel.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!payment) {
      res.status(404).json({ error: 'Payment not found' });
      return;
    }

    res.status(200).json({
      id: payment._id,
      title: payment.title,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      notes: payment.notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// post payment
paymentRouter.post('/', validateShema(paymentShema), async (req, res) => {
  try {
    const userId = req.user!.userId;
    const {title, amount, paymentDate, notes } = req.body;
    const processedNotes = notes && notes.trim() !== '' ? notes.trim() : undefined;
    // добавить usedID потом
    const newPayment = await PaymentModel.create({
      title,
      amount,
      paymentDate,
      notes: processedNotes,
      userId
    })

    res.status(201).json({
      id: newPayment._id,
      title: newPayment.title,
      amount: newPayment.amount,
      paymentDate: newPayment.paymentDate,
      notes: newPayment.notes,
    })
  } catch (error) { 
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})
