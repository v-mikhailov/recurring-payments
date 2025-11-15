import { Router } from 'express';
import { paymentShema, updatePaymentSchema } from '../shemas/payment.shema';
import { validateShema} from '../middlewares/validateShema';
import {authenticate} from '../middlewares/authenticate';
import { PaymentModel } from '../models/payment';
import { sendError, ErrorTypes } from '../utils/appErrors';

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
    sendError(res, error);
  }
})

// get payment by id
paymentRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user!.userId;
    const payment = await PaymentModel.findOne({ _id: id, userId });

    if (!payment) {
      sendError(res, ErrorTypes.NOT_FOUND());
      return;
    }

    res.status(200).json({ payment });
  } catch (error) { 
    sendError(res, error);
  }
});

// delete payment
paymentRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user!.userId;
    const payment = await PaymentModel.findOneAndDelete({ _id: id, userId });
       
    if (!payment) {
      sendError(res, ErrorTypes.NOT_FOUND());
      return;
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    sendError(res, error);
  };
});

// update payment
paymentRouter.patch('/:id', validateShema(updatePaymentSchema), async (req, res) => {
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
      sendError(res, ErrorTypes.NOT_FOUND());
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
    sendError(res, error);
  }
});

// create payment
paymentRouter.post('/', validateShema(paymentShema), async (req, res) => {
  try {
    const userId = req.user!.userId;
    const {title, amount, paymentDate, notes } = req.body;
    const processedNotes = notes && notes.trim() !== '' ? notes.trim() : undefined;
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
    sendError(res, error);
  }
})
